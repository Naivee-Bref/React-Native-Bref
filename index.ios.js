'use strict';

import React, {Component} from 'react';
import {
  AppRegistry,
<<<<<<< Updated upstream
  Navigator
=======
  Navigator,
  Text,
  TouchableHighlight,
  StyleSheet
>>>>>>> Stashed changes
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import OriginalScene from './js/page/OriginalScene';
import ReviewScene from './js/page/ReviewScene';
import TodayScene from './js/page/TodayScene';
import ProfileScene from './js/page/ProfileScene';

class RN_Bref extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{scene: 'initial'}}
        renderScene={RN_Bref.navigatorRenderScene}
<<<<<<< Updated upstream
=======
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) => {
                if (route.scene === 'initial') {
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
                if (route.scene === 'today') {
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
                if (route.scene === 'today') {
                  title = 'Today';
                }
                else if (route.scene === 'review') {
                  title = 'Review';
                }
                if (title) {
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
>>>>>>> Stashed changes
      />
    );
  }

  static navigatorRenderScene(route, navigator) {
    switch (route.scene) {
      case 'initial':
        return (<OriginalScene navigator={navigator}/>);
      case 'review':
        return (<ReviewScene navigator={navigator}/>);
      case 'today':
        return (<TodayScene navigator={navigator}/>);
      case 'profile':
        return (<ProfileScene navigator={navigator}/>);
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