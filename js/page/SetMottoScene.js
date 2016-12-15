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
  AlertIOS
} from 'react-native';

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
    return (
      <View style={[{marginTop: 60}, sceneStyle.container]}>
        <TextInput style={[sceneStyle.commonText, {height: 420}]}
                   defaultValue={this.state.motto}
                   multiline={true}
                   onChangeText={(motto) => this.setState({motto})}
        />
        <View style={sceneStyle.separator}/>
        <TouchableHighlight
          style={sceneStyle.button}
          underlayColor={'gray'}
          activeOpacity={0.5}
          onPress={() => {
            this.setMotto();
          }}>
          <Text style={sceneStyle.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const sceneStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#202020',
  },
  commonText: {
    padding: 5,
    paddingBottom: 3,
    color: '#AFAFAF',
    fontSize: 32
  },
  button: {
    marginTop: 10,
    height: 45,
    width: 90,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#202020'
  },
  buttonText: {
    height: 30,
    width: 70,
    marginLeft: 10,
    marginTop: 5,
    fontSize: 24,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  separator: {
    height: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    backgroundColor: '#D7DBDD'
  }
});