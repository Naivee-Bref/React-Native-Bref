'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';


class OriginalScene extends Component {
  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.welcome_main}>
            bref.
          </Text>
          <Text style={styles.welcome_text}>
            To get started, edit index.ios.js
          </Text>
          <Text style={styles.welcome_text}>
            Press Cmd+R to reload,{'\n'}
            Cmd+D or shake for dev menu
          </Text>
        </View>
    );
  }
}
class RN_Bref extends Component {
  render() {
    return (
        <Navigator
            initialRoute={{title: 'Initial Scene', index:0}}
            renderScene={()=>{
              return <OriginalScene/>
            }}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  welcome_main: {
    fontSize: 50,
    color: '#FFFFFF',
    textAlign: 'center',
    margin: 10,
    letterSpacing: 8,
    fontFamily: 'Courier',
  },
  welcome_text: {
    textAlign: 'center',
    color: '#9F9F9F',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('RN_Bref', () => RN_Bref);
