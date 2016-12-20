/**
 * Created by irmo on 16/11/2.
 */

'use strict';

import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  MapView,
  ListView,
  AsyncStorage,
  Image,
  ImageStore,
  formatDate,
  StatusBar,
  AlertIOS,
} from 'react-native';
//import MapView from 'react-native-maps';
import dateFormat from 'dateformat';
import {name} from 'react-native-theme';
import {styles} from 'react-native-theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import DiaryActions from './../actions';
let ds;

export default class SitesScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired
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
    global.SITES_GPS = [];
    global.SITES_COUNT = 0;
    global.SITES_FINISH = 0;
    this.longitude = -1;
    this.latitude = -1;

  };

  componentWillMount() {
    this._disableFilterByDate().done();
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
    if (global.SITES_FINISH > 3) return;
    let data = await AsyncStorage.getItem(this.state.DIARY_KEY);
    let JSONdata = (JSON.parse(data)).reverse();
    this.setState({dataSource: this.state.dataSource.cloneWithRows(JSONdata)});
    this.setState({rows: JSONdata});
    for (var i = 0; i < JSONdata.length; i+=1) {
      console.log(JSONdata[i].city);
      if (global.SITES_LOCATIONS.has(JSONdata[i].city)) continue;
      global.SITES_LOCATIONS.add(JSONdata[i].city);
      this.geocoding(JSONdata[i].city);
    }
    console.log("Refreshed GPS Data");
    global.SITES_FINISH += 1;
  };

  gotoLocation(location){
    return this.props.navigator.push({
      scene: 'Location Timeline',
      passProps:{location:location}
    });
  }

  geocoding(cityName) {
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    var apiKey = 'access_token=pk.eyJ1Ijoic3RyYXdiZXJyeWZnIiwiYSI6ImNpdW03a2hhZzAwN2oyb20xYTJ2dmVzOGoifQ.R7XeStof2bdjmKMGHIVlmg';
    var req = new XMLHttpRequest();
    var reqUrl = url + cityName + '.json?' + apiKey;
    console.log('request url:' + reqUrl);
    req.onreadystatechange = function () {
      if (req.readyState == 4 && req.status == 200) {
        try {
          let jsonObj = JSON.parse(req.responseText);
          var longitude = jsonObj.features[0].center[0];
          var latitude = jsonObj.features[0].center[1];
          console.log("Gnerated Mark at " + longitude + ", "+ latitude);
          global.SITES_GPS.push({
            longitude: longitude,
            latitude: latitude,
            title: cityName,
            animateDrop: true,
            onFocus: () => {
              //console.log("Just Clicked at " + cityName);
              this.gotoLocation(cityName);
            }
          });
        }
        catch (error) {
          console.log(error);
        }
      }
    }.bind(this);
    req.open('GET', reqUrl, true);
    req.send(null);
  }

  render() {
    this._refreshData().done();
    let siteStatusBar = (<StatusBar barStyle="default" />);
    return (
      <View style={[styles.background, sceneStyle.container]}>
        {siteStatusBar}
        <MapView
          style={sceneStyle.map}
          annotations = {/*[{
            latitude: 31.1,
            longitude: 121.1,
            animateDrop: true,
            title: "Shanghai",
            subtitile: "Where I met you",
            onFocus: () => {
              //gotoLocation('Shanghai');
              //this.geocoding("Shanghai");
              console.log(global.SITES_GPS);
            }
          }]*/
          global.SITES_GPS}
        />
      </View>
    )
  }
}
//showsUserLocation={true}

const sceneStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // backgroundColor: '#000000',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  map: {
    //height: 700,
    //marginTop: 50,
    //margin: 0,
    //flex: 1
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  commonText: {
    padding: 5,
    paddingBottom: 3,
    // color: '#AFAFAF'
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