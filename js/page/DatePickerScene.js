/**
 * Created by weiyixia on 16/12/15.
 */

'use strict';

import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Switch,
  ListView,
  AsyncStorage,
  AlertIOS,
  StatusBar
} from 'react-native';
import Calendar from 'react-native-calendar';
import dateFormat from 'dateformat';
import {styles} from 'react-native-theme';
import {name} from 'react-native-theme';
const customDayHeadings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const customMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const calendar_style_1 = {
  controlButtonText: {
    color: '#6F6F6F'
  },
  weekendDayText: {
    color: 'black'
  },
  weekendHeading: {
    color: 'black'
  },
  title: {
    color: 'black'
  },
  calendarContainer: {
    backgroundColor: '#F6F6F6'
  },
  day: {
    color: 'black'
  },
  dayHeading: {
    color: 'black'
  },
  weekRow:{
    borderColor: 'black'
  },
  selectedDayCircle: {
    backgroundColor: 'black'
  },
  dayButton:{
    borderTopColor: 'transparent'
  },
  eventIndicator: {
    backgroundColor: 'green',
    width: 10,
    height: 10
  }
};
const calendar_style_2 = {
  controlButtonText: {
    color: '#AFAFAF'
  },
  weekendDayText: {
    color: 'white'
  },
  weekendHeading: {
    color: 'white'
  },
  title: {
    color: 'white'
  },
  calendarContainer: {
    backgroundColor: '#202020'
  },
  day: {
    color: 'white'
  },
  dayHeading: {
    color: 'white'
  },
  weekRow:{
    borderColor: 'white'
  },
  selectedDayCircle: {
    backgroundColor: 'white'
  },
  dayButton:{
    borderTopColor: 'transparent'
  },
  eventIndicator: {
    backgroundColor: 'green',
    width: 10,
    height: 10
  }
};

export default class DatePickerScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      DIARY_KEY: '@Bref:diaries',
      availableDate: [],
      currentSelectedDate: ""
    };
    this.date_set = new Set();
  };

  _getCurrentDate() {
    let currentDate = new Date();
    let DateString = currentDate.getFullYear().toString() + "-" + (currentDate.getMonth() + 1).toString() + "-" + currentDate.getDate();
    return DateString;
  }

  async _getAllAvailableDate() {
    let data = await AsyncStorage.getItem(this.state.DIARY_KEY);
    let all_date = [];
    all_date = JSON.parse(data);
    for (let i = 0; i < all_date.length; i++) {
      let date = all_date[i].timeStamp;
      let t_date = dateFormat(date, 'yyyy') + '-' + dateFormat(date, 'mm') + '-' + dateFormat(date, 'dd');
      if (this.date_set.has(t_date)) continue;
      this.date_set.add(t_date);
      this.state.availableDate.push(t_date);
    }
  }

  componentWillMount() {
    this._getAllAvailableDate().done();
  }

  async _storeSelectDate(value) {
    await AsyncStorage.setItem('@Bref:FilterByDate', "true")
      .then(success => {
        console.log('set filter by date success');
      })
      .catch(error => {
        console.log('set filter by date fail')
      });

    let DateString = value.substring(0, 10);
    await AsyncStorage.setItem('@Bref:SelectDate', DateString)
      .then(success => {
        console.log('store select date success');
      })
      .catch(error => {
        console.log('store select date fail')
      });
  }

  _onDateSelect(date) {
    if (!this.date_set.has(date.substring(0, 10)))    //has no moment records
    {
      this.setState({currentSelectedDate: date.substring(0, 10)});
      return;
    }
    this._storeSelectDate(date);
  }

  render() {
    let statusBar;
    let calendar;
    if (name == 'light') {
      statusBar = (
        <StatusBar barStyle="default"/>
      );
      calendar = calendar_style_1;
    }
    else {
      statusBar = (
        <StatusBar barStyle="light-content"/>
      );
      calendar = calendar_style_2;
    }
    return (
      <View style={[styles.pageBackground, sceneStyle.container]}>
        {statusBar}
        <View style={sceneStyle.content}>
        <Calendar
          customStyle={calendar}
          showEventIndicators
          eventDates={this.state.availableDate}
          dayHeadings={customDayHeadings}               // Default: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
          monthNames={customMonthNames}                // Defaults to english names of months
          nextButtonText={'Next'}           // Text for next button. Default: 'Next'
          onDateSelect={(date) => {
            this._onDateSelect(date);
          }} // Callback after date selection
          onSwipeNext={this.onSwipeNext}    // Callback for forward swipe event
          onSwipePrev={this.onSwipePrev}    // Callback for back swipe event
          onTouchNext={this.onTouchNext}    // Callback for next touch event
          onTouchPrev={this.onTouchPrev}    // Callback for prev touch event
          prevButtonText={'Prev'}           // Text for previous button. Default: 'Prev'
          scrollEnabled={true}              // False disables swiping. Default: False
          selectedDate={this._getCurrentDate()}       // Day to be selected
          showControls={true}               // False hides prev/next buttons. Default: False
          startDate={this._getCurrentDate()}          // The first month that will display. Default: current month
          titleFormat={'MMMM YYYY'}         // Format for displaying current month. Default: 'MMMM YYYY'
          today={this._getCurrentDate()}              // Defaults to today
          weekStart={1} // Day on which week starts 0 - Sunday, 1 - Monday, 2 - Tuesday, etc, Default: 1
        />
        <Text style={[styles.timelineOthersColor, sceneStyle.commonText, {marginTop: 8}]}>
          Selected date: &nbsp; {this.state.currentSelectedDate} has no records!
        </Text>
        <Text style={[styles.timelineOthersColor, sceneStyle.commonText]}>
          Only dates with green squares in the bottom are valid.
        </Text>
        </View>
      </View>
    );
  }
}

const sceneStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
   // backgroundColor: '#202020',
    justifyContent: 'flex-start'
  },
  content: {
    flexDirection: 'column',
    paddingTop: 63,
    alignItems: 'center',
  },
  commonText: {
    padding: 5,
    paddingTop: 5,
    paddingBottom: 5,
    //color: '#FFFFFF'
  },
});