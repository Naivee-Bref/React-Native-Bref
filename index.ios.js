'use strict';

import React, {Component} from 'react';
import {
  AppRegistry,
  Navigator,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import OriginalScene from './js/page/OriginalScene';
import NewScene from './js/page/NewScene';
import TimelineScene from './js/page/TimelineScene';
import SitesScene from './js/page/SitesScene';
import SettingsScene from './js/page/SettingsScene';

class RN_Bref extends Component {
  render() {
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
                } else {
                  return (
                    <TouchableHighlight style={{alignItems: 'center'}} onPress={() => navigator.pop()}>
                      <Icon name="chevron-left" style={styles.navButtonLeft}/>
                    </TouchableHighlight>
                  );
                }
              },
              RightButton: (route, navigator, index, navState) => {
                if (route.scene === 'New') {
                  return (
                    <TouchableHighlight
                      style={{alignItems: 'center'}}
                      onPress={() => navigator.pop()}
                    >
                      <Icon name="check-square-o" style={styles.navButtonRight}/>
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
                  return (
                    <Text style={styles.navBarTitle}>
                      {title}
                    </Text>
                  );
                }
              }
            }}
            style={{backgroundColor: 'black'}}
          />
        }
      />
    );
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
      default:
        return (<OriginalScene navigator={navigator}/>);
    }
  }
}

AppRegistry.registerComponent('RN_Bref', () => RN_Bref);

const styles = StyleSheet.create({
  navButtonLeft: {
    marginLeft: 25,
    marginTop: 10,
    fontSize: 20,
    color: 'white'
  },
  navButtonRight: {
    marginRight: 25,
    marginTop: 10,
    fontSize: 25,
    color: 'white'
  },
  navBarTitle: {
    marginTop: 10,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  }
});