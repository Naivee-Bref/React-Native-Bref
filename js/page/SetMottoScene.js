/**
 * Created by weiyixia on 16/12/13.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  AsyncStorage,
  TouchableHighlight,
  AlertIOS,
  StatusBar,
  Dimensions
} from 'react-native';

import {styles} from 'react-native-theme';
import {name} from 'react-native-theme';

export default class SetMottoScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      touchIdEnabled: null,
      motto: ""
    };
  };

  async _loadInitialState() {
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

  componentWillMount() {
    this._loadInitialState().done();
  }

  async _storeMotto(value) {
    await AsyncStorage.setItem('@Bref:Motto', value.toString())
      .then(success => {
        console.log('store Motto success');
      })
      .catch(error => {
        console.log('store Motto fail')
      });
  }

  setMotto() {
    this._storeMotto(this.state.motto).done();
    AlertIOS.alert(
      'Motto saved',
      'Press OK and back to the Bref.',
      [{
        text: 'OK', onPress: () => this.props.navigator.pop()
      }]
    );
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
        <TextInput style={[sceneStyle.input, styles.input, {height: 220}]}
                   defaultValue={this.state.motto}
                   multiline={true}
                   placeholder={'"Motto..."'}
                   placeholderTextColor={'gray'}
                   onChangeText={(motto) => this.setState({motto})}
        />
        <View style={sceneStyle.separator}/>
        <TouchableHighlight
          style={[sceneStyle.button, styles.postButton]}
          underlayColor={'gray'}
          activeOpacity={0.5}
          onPress={() => {
            this.setMotto();
          }}>
          <Text style={[sceneStyle.buttonText, styles.postButtonText]}>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const sceneStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    alignItems: 'center'
  },
  commonText: {
    padding: 5,
    paddingBottom: 3,
    fontSize: 20
  },
  button: {
    marginTop: 40,
    height: 40,
    width: 80,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3,
    },
  },
  buttonText: {
    marginTop: 7,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  separator: {
    height: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    //backgroundColor: '#D7DBDD'
  },
  input: {
    paddingTop: 190,
    height: 60,
    width: Dimensions.get('window').width - 60,
    borderWidth: 0.5,
    marginTop: 80,
    marginLeft: 30,
    marginRight: 30,
    fontSize: 15
  }
});