/**
 * Created by irmo on 16/10/11.
 */

'use strict';

import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
  AlertIOS,
  StatusBar,
} from 'react-native';
import Reflux from 'reflux';
import dateFormat from 'dateformat';

import Photo from '../component/Photo';
import Location from '../component/Location';
import diaryStore from './../component/Storage';
import DiaryActions from './../actions';


export default class TodayScene extends Component {
  mixins = [Reflux.connect(diaryStore, 'store')];

  static propTypes = {
    navigator: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      text: '',
      location: 'unknown',
      imageUrl: null,
      city: '',
      isSubmitted: false
    }
  }

  _getCity(city) {
    this.state.city = city;
  }

  _getImageData(url) {
    this.setState({imageUrl: url});
  }

  submitOnPress() {
    if (this.state.text !== '') {
      this.submit();
      AlertIOS.alert(
        'Diary submitted',
        'Press OK and back to the Bref.',
        [{
          text: 'OK', onPress: () => this.props.navigator.pop()
        }]
      );
    }
    else {
      AlertIOS.alert('Diary empty', 'Press OK and continue to edit diary.');
    }
  }

  submit() {
    let date = new Date();
    DiaryActions.createDiary(dateFormat(date, 'H:MM:ss, mmmm dS, yyyy'), this.state.text, this.state.location, this.state.imageUrl);
    this.state.isSubmitted = true;
  }

  _getCity(city) {
    this.state.city = city;
  }

  _getImageData(url) {
    this.setState({imageUrl: url});
  }

  submitOnPress() {
    if (this.state.text !== '') {
      this.submit();
      AlertIOS.alert(
        'Diary submitted',
        'Press OK and back to the Bref.',
        [{
          text: 'OK', onPress: () => this.props.navigator.pop()
        }]
      );
    }
    else {
      AlertIOS.alert('Diary empty', 'Press OK and continue to edit diary.');
    }
  }

  submit() {
    let date = new Date();
    DiaryActions.createDiary(date, this.state.text, this.state.location, this.state.imageUrl);
    this.state.isSubmitted = true;
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#FFFFFF" barStyle="light-content"/>
        <View style={styles.container}>
          <Photo
            storeSource={null}
            getImageUrlBack={(url) => this._getImageData(url)}
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            multiline={true}
            placeholder={'Say something...'}
            placeholderTextColor={'gray'}
            keyboardType={'default'}
            maxLength={70}
            autoCapitalize={'none'}
            autoCorrect={false}
          />
          <Location getCityBack={(city) => this._getCity(city)}/>
          <View style={styles.location}>
            <Text style={styles.commonText}>{this.state.city}</Text>
          </View>
          <TouchableHighlight
            style={styles.button}
            underlayColor={'gray'}
            activeOpacity={0.5}
            onPress={()=> {this.submitOnPress();}}>
            <Text style={styles.buttonText}>POST</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container_out: {
    padding: 10,
    flex: 1,
    backgroundColor: '#202020'
  },
  container: {
    backgroundColor: '#202020',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: 30,
    alignItems: 'center',
    flex: 1
  },
  location: {
    flex: 1,
    marginLeft: 20,
    paddingBottom: 40
  },
  button: {
    height: 25,
    width: 70,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#202020',
    marginRight: 30
  },
  buttonText: {
    height: 20,
    width: 50,
    marginLeft: 10,
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 50
  },
  commonText: {
    padding: 5,
    paddingBottom: 3,
    color: '#AFAFAF'
  },
  input: {
    flex: 1,
    paddingTop: 10,
    height: 100,
    width: Dimensions.get('window').width - 60,
    borderBottomColor: '#AFAFAF',
    borderLeftColor: '#202020',
    borderRightColor: '#202020',
    borderTopColor: '#202020',
    borderWidth: 0.5,
    color: '#AFAFAF',
    marginLeft: 30,
    marginRight: 30,
    fontSize: 15
  }
});
