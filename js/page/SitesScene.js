/**
 * Created by irmo on 16/11/2.
 */

'use strict';

import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  MapView
} from 'react-native';
//import MapView from 'react-native-maps';

import {styles} from 'react-native-theme';

export default class SitesScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
  };

  render() {
    return (
      <View style={[styles.background, sceneStyle.container]}>
        <MapView
          style={sceneStyle.map}
          annotations = {[{
            latitude: 31.1,
            longitude: 121.1,
            animateDrop: true,
            title: "Rick",
            subtitile: "Sanchez"
          }]}
        />
      </View>
    )
  }
}
//showsUserLocation={true}

const sceneStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // backgroundColor: '#000000',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  map: {
    //height: 700,
    //marginTop: 50,
    //margin: 0,
    //flex: 1
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  commonText: {
    padding: 5,
    paddingBottom: 3,
    // color: '#AFAFAF'
  }
});