/**
 * Created by irmo on 16/10/11.
 */

'use strict';

import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  StatusBar
} from 'react-native';


export default class OriginalScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#FFFFFF"  barStyle="light-content" />
        <View style={{flex: 1.5, justifyContent: 'flex-end'}}>
          <Text style={styles.welcome_main}>
            bref.
          </Text>
        </View>

        <View style={{flex:1}}>
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
          <Text style={{color: '#CFCFCF', fontFamily: 'Helvetica-Bold', textAlign: 'left', fontSize: 20}}>“</Text>
          <Text style={styles.motto_text}>
            How we spend our days is, of course, how we spend our lives.
          </Text>
          <Text style={{color: '#CFCFCF', fontFamily: 'Helvetica-Bold',textAlign: 'right', fontSize: 20}}>”</Text>
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
  welcome_main: {
    fontSize: 70,
    color: '#FFFFFF',
    textAlign: 'center',
    margin: 10,
    letterSpacing: 8,
    fontFamily: 'Georgia-Bold',
    justifyContent: 'center'
  },
  welcome_text: {
    textAlign: 'center',
    color: '#CFCFCF',
    fontSize: 16,
    marginBottom: 5
  },
  motto: {
    marginBottom: 10,
    marginLeft: 40,
    marginRight: 40,
    justifyContent: 'flex-start',
    flex: 1
  },
  motto_text: {
    fontSize: 14,
    color: '#CFCFCF',
    marginLeft: 10,
    marginRight: 10
  }
});