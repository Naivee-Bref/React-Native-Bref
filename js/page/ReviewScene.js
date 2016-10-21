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
  AsyncStorage
} from 'react-native';

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

  componentDidMount() {
    this._refreshData();
  }

  _refreshData() {
    AsyncStorage.getItem(this.state.DIARY_KEY)
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
    return (
      <View style={styles.item}>
        <Text style={styles.timelineText}>
          {rowData.text}
        </Text>
        <Text style={styles.timelineOthers}>
          08:45
        </Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => this.props.navigator.pop()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableHighlight>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this._renderRow(rowData)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#000000',
    justifyContent: 'center'
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 50
  },
  item: {
    marginLeft: 10,
    padding: 5
  },
  timelineText: {
    color: '#FFFFFF',
    fontSize: 18
  },
  timelineOthers: {
    color: '#AFAFAF',
    fontSize: 12
  }
});