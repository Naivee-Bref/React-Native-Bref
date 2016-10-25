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
  Image,
<<<<<<< Updated upstream
=======
  ImageStore,
  formatDate,
  StatusBar
>>>>>>> Stashed changes
} from 'react-native';
import dateFormat from 'dateformat';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ReviewScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired
  };

  constructor() {
    super();
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2});
    this.state = {
<<<<<<< Updated upstream
      // TODO: Add time and location to data source.
      dataSource: ds.cloneWithRows([
        '西柚今天翘课被举报了，假装什么都没有发生的样子',
        '校车上全都是小鲜肉',
        '食堂的早饭又有油条',
        '食堂的早饭有油条，激动人心~',
        '编不下去了摔',
        '编不下去了',
        '编不下去了',
        '编不下去了',
        '编不下去了',
        '编不下去了',
        '编不下去了',
        '编不下去了',
        '编不下去了',
        '编不下去了',
        '编不下去了',
        '编不下去了',
        '编不下去了',
        '编不下去了',
        '编不下去了',
        '编不下去了',
      ])
    }
=======
      dataSource: ds.cloneWithRows([]),
      DIARY_KEY: '@Bref:diaries'
    };
  }

  componentWillMount() {
    this._refreshData().done();
  }

  async _refreshData() {
    await AsyncStorage.getItem(this.state.DIARY_KEY)
      .then((data) => {
        return JSON.parse(data);
      })
      .then((data) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data)
        })
      })
  }

  getMonth(timeStamp) {

  }

  getDate(timeStamp) {

  }

  getTime(timeStamp) {

  }

  _renderRow(rowData) {
    let oneImage;
    if (rowData.imageUrl !== null) {
      oneImage = (
        <TouchableHighlight style={ styles.imageContainer }>
          <Image style={ styles.image } source={{uri: rowData.imageUrl}}/>
        </TouchableHighlight>
      );
    }
    var date = new Date(rowData.timeStamp);
    return (
      <View style={styles.item}>
        <View style={styles.date}>
          <Text style={styles.monthText}>
            {dateFormat(date, 'mmm')}.
          </Text>
          <Text style={styles.dayText}>
            {dateFormat(date, 'dd')}
          </Text>
        </View>

        <View style={styles.card}>
          <View style={{flex: 5}}>
            <Text style={styles.timelineText}>
              {rowData.text}
            </Text>
            <Text style={styles.timelineOthers}>
              <Icon name="clock-o" />&nbsp;
              {dateFormat(date, 'HH:MM:ss')}&nbsp;&nbsp;
              <Icon name="map-marker" />&nbsp;
              {rowData.location}
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            {oneImage}
          </View>
        </View>
      </View>
    )
>>>>>>> Stashed changes
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#FFFFFF"  barStyle="light-content" />
        <TouchableHighlight onPress={() => this.props.navigator.pop()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableHighlight>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <View style={styles.item}>
              <View style={{flex: 5}}>
                <Text style={styles.timelineText}>
                  {rowData}
                </Text>
                <Text style={styles.timelineOthers}>
                  08:45
                </Text>
              </View>
              <View style={{flex: 1, marginRight: 1}}>
                <TouchableHighlight style={ styles.imageContainer }>
                  <Image style={ styles.image } source={{ uri: 'http://www.free-avatars.com/data/media/37/cat_avatar_0597.jpg' }} />
                </TouchableHighlight>
              </View>
            </View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
    fontSize: 25
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
<<<<<<< Updated upstream
=======
  },
  image: {
    marginRight: 10,
    height: 40,
    width: 40,
    borderRadius: 20,
>>>>>>> Stashed changes
  }
});