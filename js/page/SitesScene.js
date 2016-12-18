/**
 * Created by irmo on 16/10/11.
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
import DiaryActions from './../actions';
let ds;

export default class SitesScene extends Component {
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
    global.SITES_LOCATIONS = new Set();
    global.SITES_COUNT = 0;
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
      ],
    );
  }

  _refreshData = async() => {
    let data = await AsyncStorage.getItem(this.state.DIARY_KEY);
    let JSONdata = (JSON.parse(data)).reverse();
    this.setState({dataSource: this.state.dataSource.cloneWithRows(JSONdata)});
    this.setState({rows: JSONdata});
  };


  _renderRow(rowData, sectionID, rowID) {
    global.SITES_COUNT++;
    if(global.SITES_COUNT < 11)return null;///todo: totally magic
    if (global.SITES_LOCATIONS.has(rowData.city)) {
      return null;
    } else {
      global.SITES_LOCATIONS.add(rowData.city);
      return (
        <TouchableHighlight
          underlayColor={"#21618C"}
          activeOpacity={0.5}
          onPress={() => this.gotoLocation(rowData.city)}>
          <Text style={[styles.text, sceneStyle.commonText]}>{rowData.city}</Text>
        </TouchableHighlight>
      );
    }
  }

  gotoLocation(location){
    return this.props.navigator.push({
      scene: 'Location Timeline',
      passProps:{location:location}
    });
  }
  render() {
    return (
      <View style={sceneStyle.container}>
        <StatusBar backgroundColor="#FFFFFF" barStyle="light-content"/>
        <TouchableHighlight onPress={() => this.props.navigator.pop()}>
          <Text style={sceneStyle.backButtonText}>Back</Text>
        </TouchableHighlight>
        <Text style={sceneStyle.backButtonText}>Citise</Text>
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
    backgroundColor: '#202020',
    justifyContent: 'center'
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 50
  },
  item: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
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
    color: '#AFAFAF',
    fontSize: 14
  },
  dayText: {
    color: 'white',
    fontSize: 23
  },
  card: {
    padding: 10,
    marginLeft: 10,
    backgroundColor: 'black',
    borderRadius: 2,
    shadowColor: 'black',
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
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 16
  },
  timelineOthers: {
    color: '#AFAFAF',
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
    color: '#AFAFAF',
    fontWeight: 'bold'
  },
  button: {
    marginTop: 0,
    height: 25,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: '#202020'
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});