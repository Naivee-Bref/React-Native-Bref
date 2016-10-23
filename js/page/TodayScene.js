/**
 * Created by irmo on 16/10/11.
 */

'use strict';

import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';

import Photo from '../component/Photo';


import Reflux from 'reflux';
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
      imageData: null,
      city: ''
    }
  }

  getCity(city) {
    this.state.city = city;
  }

  submit() {
    let date = new Date();
    DiaryActions.createDiary(date, this.state.text, this.state.location, this.state.imageData);
  }

  _getImageData(data) {
    this.setState({imageData: data});
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => this.props.navigator.pop()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableHighlight>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          multiline={true}
          placeholder={'Say something...'}
          placeholderTextColor={'#CFCFCF'}
          keyboardType={'default'}
          maxLength={70}
        />
        <Location getCityBack={(city) => this.getCity(city)}/>
        <Photo storeSource={null} getImageDataBack={(data) => this._getImageData(data)}/>
        <View>
          <Text style={styles.commonText}>{this.state.city}</Text>
        </View>
        <Photo />
        <TouchableHighlight>
          <Text style={styles.commonText} onPress={()=>this.submit()}>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: 'black'
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
    height: 100,
    borderColor: 'white',
    borderWidth: 1,
    color: '#AFAFAF',
    fontSize: 15,
    alignItems: 'flex-start'
  },
});
