/**
 * Created by irmo on 16/11/2.
 */

'use strict';

import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import {styles} from 'react-native-theme';

export default class SitesScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
  };

  render() {
    return (
      <View style={[styles.background, sceneStyle.container]}>
        <Text style={[styles.text, sceneStyle.commonText]}>
          Profile Scene
        </Text>
      </View>
    )
  }
}

const sceneStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // backgroundColor: '#000000',
    justifyContent: 'flex-start'
  },
  commonText: {
    padding: 5,
    paddingBottom: 3,
    // color: '#AFAFAF'
  }
});
