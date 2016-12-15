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

export default class TimelineScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    ds = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      rows: [],
      DIARY_KEY: '@Bref:diaries'
    };
  }

  componentWillMount() {
    this._refreshData().done();
  }

  _deleteItem(rowID) {
    DiaryActions.deleteDiary(this.state.rows[rowID]);
    delete this.state.rows[rowID];
    this.setState({dataSource: ds.cloneWithRows(this.state.rows)});
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
    let oneImage;
    if (rowData.imageUrl !== null) {
      oneImage = (
        <TouchableHighlight style={ sceneStyle.imageContainer }>
          <Image style={ sceneStyle.image } source={{uri: rowData.imageUrl}}/>
        </TouchableHighlight>
      );
    }
    let date = new Date(rowData.timeStamp);
    return (
      <View style={sceneStyle.item}>
        <View style={sceneStyle.date}>
          <Text style={sceneStyle.monthText}>
            {dateFormat(date, 'mmm')}.
          </Text>
          <Text style={sceneStyle.dayText}>
            {dateFormat(date, 'dd')}
          </Text>
        </View>

        <View style={sceneStyle.card}>
          <View style={{flex: 5}}>
            <Text style={sceneStyle.timelineText}>
              {rowData.text}
            </Text>
            <Text style={sceneStyle.timelineOthers}>
              <Icon name="clock-o"/>&nbsp;
              {dateFormat(date, 'HH:MM:ss')}&nbsp;&nbsp;
              <Icon name="map-marker"/>&nbsp;
              {rowData.city}&nbsp;
              <TouchableHighlight style={{width: 55, height: 15}}
                                  onPress={()=> {
                                    this._deleteStatus(rowID);
                                  }}>
                <Text style={sceneStyle.buttonText}>Delete </Text>
              </TouchableHighlight>
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            {oneImage}
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={sceneStyle.container}>
        <StatusBar backgroundColor="#FFFFFF" barStyle="light-content"/>
        <TouchableHighlight onPress={() => this.props.navigator.pop()}>
          <Text style={sceneStyle.backButtonText}>Back</Text>
        </TouchableHighlight>
        <ListView
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
    marginTop: 3.3,
    fontSize: 12,
    textAlign: 'center',
    color: '#AFAFAF',
  }
});