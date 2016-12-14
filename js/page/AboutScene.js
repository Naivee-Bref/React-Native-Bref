/**
 * Created by weiyixia on 16/12/13.
 */

'use strict';

import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View,

} from 'react-native';

export default class AboutScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      touchIdEnabled: null
    };
  };


  render() {
    return (
      <View style={[{marginTop: 60}, styles.container]}>
        <Text style={[{fontSize: 40}, styles.commonText]}>
          bref. v1.0
        </Text>
        <Text style={[{fontSize: 20}, styles.commonText]}>
          Naivee Team
        </Text>
        <Text style={[{fontSize: 20}, styles.commonText]}>
          Copyright @ 2016. All rights reserved.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  commonText: {
    padding: 5,
    paddingBottom: 3,
    color: '#AFAFAF',

  }
});

