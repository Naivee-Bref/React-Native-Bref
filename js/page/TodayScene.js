/**
 * Created by irmo on 16/10/11.
 */

'use strict';

import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';

import Photo from '../component/Photo';
import GeolocationExample from '../component/Location';

import Reflux from 'reflux';
import diaryStore from './../component/Storage';
import DiaryActions from './../actions';


export default class TodayScene extends Component {
  mixins =  [Reflux.connect(diaryStore, 'store')];

  static propTypes = {
    navigator: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = {
      text: 'Default Text',
      location: 'unknown'
    }
  }

  render() {
    return (
      <View style={styles.container} refreshing>
        <TouchableHighlight onPress={() => this.props.navigator.pop()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableHighlight>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <GeolocationExample />
        <Photo />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: 'black'
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 50
  },
  commonText: {
    padding: 5,
    paddingBottom: 3,
    color: '#AFAFAF'
  },
  input: {
    height: 100,
    borderColor: 'white',
    borderWidth: 1,
    color: '#AFAFAF',
    fontSize: 15,
    alignItems: 'flex-start'
  },
});
