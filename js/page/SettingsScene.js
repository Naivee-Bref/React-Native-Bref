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
  AsyncStorage
} from 'react-native';

export default class SettingsScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      touchIdEnabled: null
    };
  };

  async _loadInitialState() {
    await AsyncStorage.getItem('@Bref:TouchIdEnabled')
      .then(result => {
        if (result !== null) {
          this.setState({touchIdEnabled: result === 'true'});
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
        console.log('store touch id option success');
      })
      .catch(error => {
        console.log('store touch id option fail')
      });
  }

  render() {
    return (
      <View style={[{marginTop: 60}, styles.container]}>
        <Text style={styles.commonText}>
          Profile Scene
        </Text>
        <View style={{width: 400}}>
          <Text style={styles.commonText}>Enable Touch ID</Text>
          <Switch
            onValueChange={(value) => {
              this.setState({touchIdEnabled: value});
              this._storeTouchIdOption(value).done();
            }}
            value={this.state.touchIdEnabled === true}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#000000',
    justifyContent: 'flex-start'
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 50
  },
  commonText: {
    padding: 5,
    paddingBottom: 3,
    color: '#AFAFAF'
  }
});
