/**
 * Created by qzane on 16/12/18.
 */

'use strict';

import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  AsyncStorage,
  Image,
  ImageStore,
  formatDate,
  StatusBar,
  AlertIOS,
} from 'react-native';
import dateFormat from 'dateformat';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from 'react-native-theme';
import {name} from 'react-native-theme';
import DiaryActions from './../actions';
let ds;

export default class LocationTimelineScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  };


  constructor(props, context) {
    super(props, context);
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      rows: [],
      date: new Date(),
      DIARY_KEY: '@Bref:diaries'
    };
    this.listView = null;
    this.listViewItem = [];
    this.listViewHeight = 0;
    this.t_scroll_y = 0;
  }

  componentWillMount() {
    this._disableFilterByDate().done();
    this._refreshData().done();
  }

  componentDidMount() {   //will be executed after the first render
    this._checkFilterByDate().done();
  }

  componentDidUpdate() {  //will be executed after returning back from the filter by date scene (or deletion of the listView, but it will not cause the modification of stoorage
    this._checkFilterByDate().done();
  }

  async _disableFilterByDate() {
    await AsyncStorage.setItem('@Bref:FilterByDate', "false")
      .then(success => {
        console.log('disable filter by date success');
      })
      .catch(error => {
        console.log('disable filter by date fail')
      });
  }

  async _checkFilterByDate() {
    let FilterByDate = await AsyncStorage.getItem('@Bref:FilterByDate');
    if (FilterByDate != null) {
      if (FilterByDate == 'true') {
        this._disableFilterByDate().done(); //after scrolling, set the operation to false
        let SelectDate = await AsyncStorage.getItem('@Bref:SelectDate');
        if (SelectDate != null) {
          let first_index = -1;
          for (let i = 0; i < this.state.rows.length; i++) { //the first is the lastest item with date equal to the selected date in the calendar picker
            let date = this.state.rows[i].timeStamp;
            let t_date = dateFormat(date, 'yyyy') + '-' + dateFormat(date, 'mm') + '-' + dateFormat(date, 'dd');
            if (SelectDate == t_date) {
              first_index = i;
              break;
            }
          }
          if (first_index != -1) {
            this._scrollToIndex(first_index);
          }
        }
      }
    }
  }

  _deleteItem(rowID) {
    DiaryActions.deleteDiary(this.state.rows[rowID]);
    delete this.state.rows[rowID];
    this.setState({dataSource: ds.cloneWithRows(this.state.rows)});
  }

  _scrollToTop() {
    if (this.listView != null && this.state.rows.length != 0) {
      this.listView.scrollTo({y: 0});
    }
  }

  _scrollToBottom() {
    if (this.listView != null && this.state.rows.length != 0) { //now rows
      let last_row_id = this.state.rows.length - 1;
      this.listViewItem[last_row_id].measure((t_x, t_y, t_width, t_height, t_pageX, t_pageY) => {
        this.t_scroll_y = t_y + t_height - this.listViewHeight;
      });
      this.listView.scrollTo({y: this.t_scroll_y});
    }
  }

  _scrollToIndex(index) {
    if (this.listView != null && this.state.rows.length != 0) { //now rows
      if (index < 0 || index >= this.state.rows.length) return;
      this.listViewItem[index].measure((t_x, t_y, t_width, t_height, t_pageX, t_pageY) => {
        this.t_scroll_y = t_y;
      });
      this.listView.scrollTo({y: this.t_scroll_y});

    }
  }

  _deleteStatus(rowID) {
    AlertIOS.alert(
      'Confirm deletion?',
      '',
      [
        {text: 'Delete', onPress: () => this._deleteItem(rowID)},
        {text: 'Cancel', onPress: () => console.log('Cancel deletion')},
      ]
    );
  }

  _refreshData = async() => {
    let data = await AsyncStorage.getItem(this.state.DIARY_KEY);
    let JSONdata = (JSON.parse(data)).reverse();
    this.setState({dataSource: this.state.dataSource.cloneWithRows(JSONdata)});
    this.setState({rows: JSONdata});
  };

  _renderRow(rowData, sectionID, rowID) {
    let oneImage;
    if (rowData.imageUrl !== null) {
      oneImage = (
        <TouchableHighlight style={ sceneStyle.imageContainer }>
          <Image style={ sceneStyle.image } source={{uri: rowData.imageUrl}}/>
        </TouchableHighlight>
      );
    }
    let date = new Date(rowData.timeStamp);
    //this.location = 'Jiading Qu';
    this.location = this.props.route.passProps.location;
    //console.log(this.location)
    if (rowData.city == this.location) {
      return (
        <View style={sceneStyle.item}
              ref={(t_ref) => this.listViewItem[rowID] = t_ref}>
          <View style={sceneStyle.date}>
            <Text style={[sceneStyle.monthText, styles.monthColor]}>
              {dateFormat(date, 'mmm')}.
            </Text>
            <Text style={[sceneStyle.dayText, styles.dayColor]}>
              {dateFormat(date, 'dd')}
            </Text>
          </View>

          <View style={[sceneStyle.card, styles.cardColor]}>
            <View style={{flex: 5}}>
              <Text style={[sceneStyle.timelineText, styles.timelineTextColor]}>
                {rowData.text}
              </Text>
              <Text style={[sceneStyle.timelineOthers, styles.timelineOthersColor]}>
                <Icon name="clock-o"/>&nbsp;
                {dateFormat(date, 'HH:MM:ss')}&nbsp;&nbsp;
                <Icon name="map-marker"/>&nbsp;
                {rowData.city}&nbsp;
                <TouchableHighlight style={{width: 55, height: 15}}
                                    onPress={()=> {
                                      this._deleteStatus(rowID);
                                    }}>
                  <Text style={[sceneStyle.buttonText, styles.timelineOthersColor]}>Delete </Text>
                </TouchableHighlight>
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              {oneImage}
            </View>
          </View>
        </View>
      )
    } else {
      return null;
    }
  }

  render() {
    let statusBar;
    if (name == 'light') {
      statusBar = (
        <StatusBar barStyle="default"/>
      );
    }
    else {
      statusBar = (
        <StatusBar barStyle="light-content"/>
      );
    }
    return (
      <View style={[sceneStyle.container, styles.pageBackground]}>
        {statusBar}
        <View style={sceneStyle.content}>
          <TouchableHighlight
            style={[sceneStyle.button, {width: 100, marginLeft: 150}]}
            underlayColor="transparent"
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigator.push({scene: 'Date Picker'});
            }}>
            <Text style={[sceneStyle.buttonText, styles.buttonText]}>Search By Date</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={[sceneStyle.button, {width: 30, marginLeft: 0}]}
            underlayColor="transparent"
            activeOpacity={0.5}
            onPress={() => this._scrollToTop()}>
            <Text style={[sceneStyle.buttonText, styles.buttonText]}>Top</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={[sceneStyle.button, {width: 60, marginLeft: 0}]}
            underlayColor="transparent"
            activeOpacity={0.5}
            onPress={() => this._scrollToBottom()}>
            <Text style={[sceneStyle.buttonText, styles.buttonText]}>Bottom</Text>
          </TouchableHighlight>
        </View>
        <ListView
          ref={ref => this.listView = ref}
          pageSize={1000000}   //the reason why no pageSize setting will fail when touching bottom is that the page cannot load too many items
          onLayout={(event) => {
            let layout = event.nativeEvent.layout;
            this.listViewHeight = layout.height;
          }}
          dataSource={this.state.dataSource}
          enableEmptySections={true}
          renderRow={(rowData, sectionID, rowID) => this._renderRow(rowData, sectionID, rowID)}
        />
      </View>
    );
  }
}

const sceneStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center'
  },
  item: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  date: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  monthText: {
    fontSize: 12
  },
  dayText: {
    fontSize: 20
  },
  card: {
    padding: 10,
    marginLeft: 10,
    borderRadius: 4,
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3,
    },
    flexDirection: 'row',
    flex: 9
  },
  timelineText: {
    fontSize: 14,
    lineHeight: 16
  },
  timelineOthers: {
    fontSize: 12,
    marginTop: 5
  },
  imageContainer: {
    marginLeft: 5,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'grey',
  },
  image: {
    marginRight: 10,
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  buttonText: {
    marginLeft: 0,
    marginTop: 3.5,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  button: {
    marginTop: 0,
    height: 25,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 63
  }
});