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
  StatusBar,
  AsyncStorage,
  AlertIOS
} from 'react-native';

import {styles} from 'react-native-theme';
import {name} from 'react-native-theme';

export default class OriginalScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      motto: 'How we spend our day is, of course how we spend our lives.'
    }
  };

  async _loadMotto() {
    await AsyncStorage.getItem('@Bref:Motto')
      .then(result => {
        if (result !== null) {
          this.setState({motto: result});
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    this._loadMotto().done();
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
      <View style={[styles.background, sceneStyle.container]}>
        {statusBar}
        <View style={{flex: 1.5, justifyContent: 'flex-end'}}>
          <Text style={[styles.Bref, sceneStyle.Bref]}>
            bref.
          </Text>
        </View>

        <View style={{flex: 1}}>
          <TouchableHighlight underlayColor="transparent" onPress={() => this.props.navigator.push({scene: 'New'})}>
            <Text style={[styles.welcomeText, sceneStyle.welcomeText]}>
              New
            </Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor="transparent" onPress={() => this.props.navigator.push({scene: 'Timeline'})}>
            <Text style={[styles.welcomeText, sceneStyle.welcomeText]}>
              Timeline
            </Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor="transparent" onPress={() => this.props.navigator.push({scene: 'Sites'})}>
            <Text style={[styles.welcomeText, sceneStyle.welcomeText]}>
              Sites
            </Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor="transparent" onPress={() => this.props.navigator.push({scene: 'Settings'})}>
            <Text style={[styles.welcomeText, sceneStyle.welcomeText]}>
              Settings
            </Text>
          </TouchableHighlight>
        </View>

        <View style={sceneStyle.motto}>
          <Text style={[styles.mottoText, sceneStyle.quote, {textAlign: 'left'}]}>“</Text>
          <Text style={[styles.mottoText, sceneStyle.mottoText]}>
            { this.state.motto }
          </Text>
          <Text style={[styles.mottoText, sceneStyle.quote, {textAlign: 'right'}]}>”</Text>
        </View>
      </View>
    );
  }
}

const sceneStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
 Bref: {
    fontSize: 70,
    textAlign: 'center',
    margin: 10,
    letterSpacing: 8,
    fontFamily: 'Georgia-Bold',
    justifyContent: 'center'
  },
  welcomeText: {
    textAlign: 'center',
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
  mottoText: {
    fontSize: 14,
    marginLeft: 10,
    marginRight: 10
  },
  quote: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 20
  }
});