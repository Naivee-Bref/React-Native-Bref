/**
 * Created by irmo on 16/10/12.
 */

'use strict';

import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Switch,
  ListView,
  AsyncStorage,
  StatusBar
} from 'react-native';

import theme, {styles} from 'react-native-theme';
import {name} from 'react-native-theme';

export default class SettingsScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      touchIdEnabled: null,
      lightModeEnabled: null
    };
  };

  _darkTheme() {
    if (theme.name !== 'default') {
      theme.active();
      console.log('Active dark theme.');
    }
  }

  _lightTheme() {
    if (theme.name !== 'light') {
      theme.active('light');
      console.log('Active light theme.');
    }
  }

  async _loadInitialState() {
    await AsyncStorage.getItem('@Bref:TouchIdEnabled')
      .then(result => {
        console.log('Load initial state TouchIdEnabled: ' + result);
        if (result !== null) {
          this.setState({touchIdEnabled: result == 'true'});
        }
        else {
          this.setState({touchIdEnabled: false});
        }
      })
      .catch(error => {
        console.log(error);
      });
    await AsyncStorage.getItem('@Bref:LightModeEnabled')
      .then(result => {
        console.log('Load initial state LightModeEnabled: ' + result);
        if (result !== null) {
          this.setState({lightModeEnabled: result == 'true'});
        }
        else {
          this.setState({lightModeEnabled: false});
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  componentWillMount() {
    this._loadInitialState().done();
  }

  async _storeTouchIdOption(value) {
    await AsyncStorage.setItem('@Bref:TouchIdEnabled', value.toString())
      .then(success => {
        console.log('Store touch id option success. TouchIdEnabled: ' + value);
      })
      .catch(error => {
        console.log('Store touch id option fail.');
      });
  }

  async _storeDarkThemeOption(value) {
    await AsyncStorage.setItem('@Bref:LightModeEnabled', value.toString())
      .then(success => {
        console.log('Store night mode option success. LightModeEnabled: ' + value);
      })
      .catch(error => {
        console.log('Store night mode option fail.');
      });
    if (value) {
      this._lightTheme();

    }
    else {
      this._darkTheme();
    }
    this.setState({lightModeEnabled: value});
  }

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
          <View>
            <View style={[sceneStyle.separator_top, styles.separatorColor]}/>
            <TouchableHighlight
              underlayColor="transparent"
              activeOpacity={0.5}
              onPress={() => this.props.navigator.push({scene: 'Set Motto'})}>
              <Text style={[styles.settingText, sceneStyle.commonText]}>Set Motto</Text>
            </TouchableHighlight>
          </View>

          <View>
            <View style={[sceneStyle.separator_bottom, styles.separatorColor]}/>
            <Text style={[styles.settingText, sceneStyle.commonText]}>
              Enable Touch ID
              <View style={{width: 100, height: 10, marginLeft: 170}}>
                <Switch style={sceneStyle.switch}
                      value={this.state.touchIdEnabled === true}
                      onValueChange={(value) => {
                        this.setState({touchIdEnabled: value});
                        this._storeTouchIdOption(value).done();
                      }}
                />
              </View>
            </Text>
          </View>

        <View>
          <View style={[sceneStyle.separator_bottom, styles.separatorColor]}/>
          <Text style={[styles.settingText, sceneStyle.commonText]}>
            Enable Light Mode
            <View style={{width: 100, height: 10, marginLeft: 152}}>
              <Switch style={sceneStyle.switch}
                      value={this.state.lightModeEnabled === true}
                      onValueChange={(value) => {
                        this._storeDarkThemeOption(value).done();
                      }}
              />
            </View>
          </Text>
        </View>

        <View>
          <View style={[sceneStyle.separator_bottom, styles.separatorColor]}/>
          <TouchableHighlight
            underlayColor="transparent"
            activeOpacity={0.5}
            onPress={() => this.props.navigator.push({scene: 'About'})}>
            <Text style={[styles.settingText, sceneStyle.commonText]}>
              About
            </Text>
          </TouchableHighlight>
          <View style={[sceneStyle.separator_top, styles.separatorColor]}/>
        </View>
        </View>
      </View>
    );
  }
}

const sceneStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'flex-start'
  },
  content: {
    flexDirection: 'column',
    marginTop: 63
  },
  commonText: {
    padding: 10,
    paddingTop: 12,
    paddingBottom: 12,
  },
  separator_top: {
    height: 1
  },
  separator_bottom: {
    height: 1,
    marginLeft: 10,
    marginRight: 10
  },
  switch: {
    marginTop: 2
  }
});
