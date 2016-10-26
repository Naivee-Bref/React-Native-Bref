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
} from 'react-native';
import dateFormat from 'dateformat';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ReviewScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2});
    this.state = {
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
              <Icon name="clock-o"/>&nbsp;
              {dateFormat(date, 'HH:MM:ss')}&nbsp;&nbsp;
              <Icon name="map-marker"/>&nbsp;
              {rowData.location}
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
      <View style={styles.container}>
        <StatusBar backgroundColor="#FFFFFF" barStyle="light-content"/>
        <TouchableHighlight onPress={() => this.props.navigator.pop()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableHighlight>
        <ListView
          dataSource={this.state.dataSource}
          enableEmptySections={true}
          renderRow={(rowData) => this._renderRow(rowData)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  },
  image: {
    marginRight: 10,
    height: 40,
    width: 40,
    borderRadius: 20,
  }
});