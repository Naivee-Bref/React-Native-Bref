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
  AsyncStorage
} from 'react-native';

import theme from 'react-native-theme';

export default class SettingsScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['Set Motto', 'Enable Touch ID', 'Enable Night Mode', 'About']),
      touchIdEnabled: null,
      nightModeEnabled: null
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
    await AsyncStorage.getItem('@Bref:NightModeEnabled')
      .then(result => {
        console.log('Load initial state NightModeEnabled: ' + result);
        if (result !== null) {
          this.setState({nightModeEnabled: result == 'true'});
        }
        else {
          this.setState({nightModeEnabled: true});
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
    await AsyncStorage.setItem('@Bref:NightModeEnabled', value.toString())
      .then(success => {
        console.log('Store night mode option success. NightModeEnabled: ' + value);
      })
      .catch(error => {
        console.log('Store night mode option fail.');
      });
  }

  render() {
    return (
      <View style={[{marginTop: 60}, styles.container]}>
        <View style={{width: 400}}>
          <View style={styles.separator_bottom}/>
          <Text style={[styles.commonText, {marginLeft: 3}]}>
            Enable Touch ID
            <View style={{width: 100, height: 10, marginTop: -20, marginLeft: 160}}>
              <Switch style={styles.switch}
                      value={this.state.touchIdEnabled === true}
                      onValueChange={(value) => {
                        this.setState({touchIdEnabled: value});
                        this._storeTouchIdOption(value).done();
                      }}
              />
            </View>
          </Text>
        </View>
        <View style={{width: 400}}>
          <View style={styles.separator_bottom}/>
          <Text style={[styles.commonText, {marginLeft: 3}]}>
            Enable Night Mode
            <View style={{width: 100, height: 10, marginTop: -20, marginLeft: 142}}>
              <Switch style={styles.switch}
                      value={this.state.nightModeEnabled === true}
                      onValueChange={(value) => {
                        this.setState({nightModeEnabled: value});
                        this._storeDarkThemeOption(value).done();
                      }}
              />
            </View>
          </Text>
        </View>
        <View style={{width: 400}}>
          <View style={styles.separator_bottom}/>
          <TouchableHighlight
            underlayColor={"#21618C"}
            activeOpacity={0.5}
            onPress={() => this.props.navigator.push({scene: 'About'})}>
            <Text style={[styles.commonText, {marginLeft: 3}]}>
              About
            </Text>
          </TouchableHighlight>
          <View style={styles.separator_top}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#202020',
    justifyContent: 'flex-start'
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 50
  },
  commonText: {
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#FFFFFF'
  },
  separator_top: {
    height: 1,
    backgroundColor: '#D7DBDD',
  },
  separator_bottom: {
    height: 1,
    marginLeft: 10,
    marginRight: 30,
    backgroundColor: '#D7DBDD',
  },
  row: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: 'black',
  },
  switch: {
    marginLeft: 40,
    marginTop: 20
  }
});
