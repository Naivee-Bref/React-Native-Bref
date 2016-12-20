'use strict';

import React, {Component} from 'react';
import {
  AppRegistry,
  Navigator,
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PasscodeAuth from 'react-native-passcode-auth';

import OriginalScene from './js/page/OriginalScene';
import NewScene from './js/page/NewScene';
import TimelineScene from './js/page/TimelineScene';
import SitesScene from './js/page/SitesScene';
import SettingsScene from './js/page/SettingsScene';
import AboutScene from './js/page/AboutScene';
import SetMottoScene from './js/page/SetMottoScene';
import theme from 'react-native-theme';
import LocationTimelineScene from './js/page/LocationTimelineScene'

theme.add(require('./js/style/darkTheme'));
theme.add(require('./js/style/lightTheme'), 'light');
import DatePickerScene from './js/page/DatePickerScene';
import {styles} from 'react-native-theme';

class RN_Bref extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      touchIdEnabled: null,
      touchIdSet: null,
      authSuccess: null,
      lightModeEnabled: false
    }
  }

  async _loadInitialState() {
    await AsyncStorage.getItem('@Bref:TouchIdEnabled')
      .then(result => {
        if (result !== null) {
          this.setState({touchIdEnabled: result === 'true', touchIdSet: true});
        } else {
          this.setState({touchIdSet: false});
        }
      })
      .catch(error => {
        console.log(error);
      });

    await AsyncStorage.getItem('@Bref:LightModeEnabled')
      .then(result => {
        console.log('Load initial state LightModeEnabled: ' + result);
        if (result !== null && result == 'true') {
          theme.active('light');
          this.setState({lightModeEnabled: result == 'true'});
        }
        else {
          this.setState({lightModeEnabled: false});
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillMount() {
    this._loadInitialState().done();
  }

  _showTouchId(needShow) {
    if (needShow) {
      PasscodeAuth.authenticate('Unlock Bref')
        .then(success => {
          console.log('passcode auth success');
          this.setState({authSuccess: true});
        })
        .catch(error => {
          switch (error.message) {
            case 'LAErrorUserCancel':
              console.log('user cancel');
              break;
            case 'LAErrorAuthenticationFailed	':
              console.log('authenticate fail');
              break;
            case 'LAErrorUserFallback':
              console.log('user fallback');
              break;
            case 'LAErrorPasscodeNotSet':
              console.log('passcode not set');
              AlertIOS.alert('Passcode not set');
              break;
            case 'PasscodeAuthNotSupported':
              console.log('passcode auth not supported');
              AlertIOS.alert('Passcode auth not supported');
              break;
            default:
              break;
          }
        })
    }
  }

  async componentDidMount() {
    await setTimeout(() => {
      this._showTouchId(this.state.touchIdEnabled);
    }, 300);
  }

  render() {
    if (this.state.touchIdEnabled == null && this.state.touchIdSet === null) {
      return (<View></View>);
    } else if (this.state.touchIdSet === false
      || (this.state.touchIdSet === true && this.state.touchIdEnabled === false)
      || this.state.authSuccess === true) {
      return (
        <Navigator
          initialRoute={{scene: 'Initial'}}
          renderScene={RN_Bref.navigatorRenderScene}
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={{
                LeftButton: (route, navigator, index, navState) => {
                  if (route.scene === 'Initial') {
                    return null;
                  } else
                    if(route.scene ==='Sites'){
                      return (
                        <TouchableHighlight
                          underlayColor="transparent"
                          style={{alignItems: 'center'}}
                          onPress={() => navigator.pop()}
                        >
                          <Icon name="chevron-left" style={[navStyle.navButtonLeft, navStyle.defaultColor]}/>
                        </TouchableHighlight>);
                    }
                      else{return (
                      <TouchableHighlight
                        underlayColor="transparent"
                        style={{alignItems: 'center'}}
                        onPress={() => navigator.pop()}
                      >
                        <Icon name="chevron-left" style={[navStyle.navButtonLeft, styles.navContentColor]}/>
                      </TouchableHighlight>
                    );
                  }
                },
                RightButton: (route, navigator, index, navState) => {
                  if (route.scene === 'New' || route.scene === 'Set Motto') {
                    return (
                      <TouchableHighlight
                        underlayColor="transparent"
                        style={{alignItems: 'center'}}
                        onPress={() => navigator.pop()}
                      >
                        <Icon name="check-square-o" style={[navStyle.navButtonRight, styles.navContentColor]}/>
                      </TouchableHighlight>
                    );
                  }
                  else {
                    return null;
                  }
                },
                Title: (route, navigator, index, navState) => {
                  var title = null;
                  title = route.scene;
                  if (title != 'Initial') {
                    if (title === 'Sites') {
                      return (
                        <Text style={[navStyle.navBarTitle,navStyle.defaultColor]}>
                          {title}
                        </Text>
                      );
                    }
                    return (
                      <Text style={[navStyle.navBarTitle,styles.navContentColor]}>
                        {title}
                      </Text>
                    );
                  }
                }
              }}
              style={{backgroundColor: 'transparent'}}
            />
          }
        />
      );
    }
  }

  static navigatorRenderScene(route, navigator) {
    switch (route.scene) {
      case 'Initial':
        return (<OriginalScene navigator={navigator}/>);
      case 'New':
        return (<NewScene navigator={navigator}/>);
      case 'Timeline':
        return (<TimelineScene navigator={navigator}/>);
      case 'Sites':
        return (<SitesScene navigator={navigator}/>);
      case 'Settings':
        return (<SettingsScene navigator={navigator}/>);
      case 'About':
        return (<AboutScene navigator={navigator}/>);
      case 'Set Motto':
        return (<SetMottoScene navigator={navigator}/>);
      case 'Date Picker':
        return (<DatePickerScene navigator={navigator}/>);
      case 'Location Timeline':
        return (<LocationTimelineScene navigator={navigator} route={route}/>);
      default:
        return (<OriginalScene navigator={navigator}/>);
    }
  }
}

AppRegistry.registerComponent('RN_Bref', () => RN_Bref);

const navStyle = StyleSheet.create({
  defaultColor: {
    color: 'black'
  },
  navButtonLeft: {
    marginLeft: 25,
    marginTop: 10,
    fontSize: 20
  },
  navButtonRight: {
    marginRight: 25,
    marginTop: 10,
    fontSize: 25
  },
  navBarTitle: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold'
  }
});