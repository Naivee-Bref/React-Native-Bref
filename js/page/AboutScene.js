/**
 * Created by weiyixia on 16/12/13.
 */

'use strict';

import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';

import {styles} from 'react-native-theme';
import {name} from 'react-native-theme';

export default class AboutScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      touchIdEnabled: null
    };
  };

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
      <View style={[styles.pageBackground, sceneStyle.container]}>
        {statusBar}
        <View style={sceneStyle.content}>
          <Text style={[{fontSize: 40}, sceneStyle.commonText]}>
            bref. v2.0
          </Text>
          <Text style={[{fontSize: 20}, sceneStyle.commonText]}>
            Naivee Team
          </Text>
          <Text style={[{fontSize: 20}, sceneStyle.commonText]}>
            Copyright @ 2016. All rights reserved.
          </Text>
        </View>
      </View>
    );
  }
}

const sceneStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  content: {
    marginTop: 90,
    flexDirection: 'column',
    paddingTop: 63,
    alignItems: 'center',
  },
  commonText: {
    padding: 5,
    paddingBottom: 3,
    color: '#AFAFAF',
  }
});


