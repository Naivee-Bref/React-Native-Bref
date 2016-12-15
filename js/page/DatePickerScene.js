/**
 * Created by weiyixia on 16/12/15.
 */
import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Switch,
  ListView,
  AsyncStorage
} from 'react-native';
import Calendar from 'react-native-calendar';

const customDayHeadings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const customMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const style_0 = {
  controlButtonText: {
    color: 'blue'
  },
  weekendDayText: {
    color: 'black'
  },
  weekendHeading: {
    color: 'black'
  },

  eventIndicator: {
    backgroundColor: 'green',
    width: 10,
    height: 10
  }
}


export default class DatePickerScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {

    };
  };

  _getCurrentDate(){
    let currentDate = new Date();
    let DateString = currentDate.getFullYear().toString() + "-" + (currentDate.getMonth() + 1).toString() + "-" + currentDate.getDate();
    return DateString;
  }

  render() {
    return (
      <View style={[{marginTop: 60}, styles.container]}>
        <Calendar
          customStyle= {style_0}
          showEventIndicators
          eventDates={['2016-12-07','2016-11-03']}
          dayHeadings={customDayHeadings}               // Default: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
          monthNames={customMonthNames}                // Defaults to english names of months
          nextButtonText={'Next'}           // Text for next button. Default: 'Next'
          //onDateSelect={(date) => this.onDateSelect(date)} // Callback after date selection
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
      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#202020',
    justifyContent: 'flex-start'
  },
  commonText: {
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#FFFFFF'
  },
});