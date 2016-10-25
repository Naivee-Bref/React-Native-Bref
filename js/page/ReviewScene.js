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
} from 'react-native';

export default class ReviewScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired
  };

  constructor() {
    super();
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2});
    this.state = {
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
  }

  render() {
    return (
      <View style={styles.container}>
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
    backgroundColor: '#1F1F1F',
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
    padding: 10,
    backgroundColor: "black",
    borderRadius: 2,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3,
    },
    flexDirection: 'row',
  },
  timelineText: {
    color: '#FFFFFF',
    fontSize: 14
  },
  timelineOthers: {
    color: '#AFAFAF',
    fontSize: 12
  },
  imageContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'grey',
  }
});