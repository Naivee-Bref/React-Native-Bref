/**
 * Created by irmo on 16/10/11.
 */

'use strict';

import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';


export default class OriginalScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.welcome}>
          <Text style={styles.welcome_main}>
            bref.
          </Text>
          <TouchableHighlight onPress={() => this.props.navigator.push({scene: 'today'})}>
            <Text style={styles.welcome_text}>
              Today
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.props.navigator.push({scene: 'review'})}>
            <Text style={styles.welcome_text}>
              Review
            </Text>
          </TouchableHighlight>
          <TouchableHighlight>
            <Text style={styles.welcome_text}>
              Share
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.props.navigator.push({scene: 'profile'})}>
            <Text style={styles.welcome_text}>
              Me
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.motto}>
          <Text style={{color: '#CFCFCF', textAlign: 'left'}}>"</Text>
          <Text style={styles.motto_text}>
            这是一条非主流个性签名
          </Text>
          <Text style={{color: '#CFCFCF', textAlign: 'right'}}>"</Text>
        </View>
      </View>
    );
  }
}

// TODO: Global default color
// TODO: Not FullScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  welcome: {
    justifyContent: 'center'
  },
  welcome_main: {
    fontSize: 50,
    color: '#FFFFFF',
    textAlign: 'center',
    margin: 10,
    letterSpacing: 8,
    fontFamily: 'PingFang SC',
    justifyContent: 'center'
  },
  welcome_text: {
    textAlign: 'center',
    color: '#CFCFCF',
    marginBottom: 5
  },
  motto: {
    marginTop: 100,
    marginBottom: 10,
    justifyContent: 'flex-end'
  },
  motto_text: {
    fontSize: 16,
    fontFamily: 'PingFang SC',
    color: '#CFCFCF'
  }
});