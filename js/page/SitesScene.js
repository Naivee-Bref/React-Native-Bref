/**
 * Created by irmo on 16/11/2.
 */

'use strict';

import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import MapView from 'react-native-maps';
import {styles} from 'react-native-theme';

export default class SitesScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
  };

  press(location){
    ///LocationTimelineScene().location = 'Jiading Qu';
    return this.props.navigator.push({
      scene: 'Location Timeline',
      passProps:{location:'Jiading Qu'}
    })
  }
  ///onPress={() => this.props.navigator.push({scene: 'Location Timeline'})}>
  render() {
    return (
      <View style={[styles.background, sceneStyle.container, {marginTop: 60}]}>


        <Text style={[styles.text, sceneStyle.commonText]}>
          Profile SceneA
        </Text>
        <TouchableHighlight
          underlayColor={"#21618C"}
          activeOpacity={0.5}
          onPress={() => this.press(' ')}>
          <Text style={[styles.text, sceneStyle.commonText]}> Goto Location </Text>
        </TouchableHighlight>

        <Text style={[styles.text, sceneStyle.commonText]}>
          Profile Scene
        </Text>



      </View>
    )
  }
}

const sceneStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // backgroundColor: '#000000',
    justifyContent: 'flex-start'
  },
  commonText: {
    padding: 5,
    paddingBottom: 3,
    // color: '#AFAFAF'
  }
});
