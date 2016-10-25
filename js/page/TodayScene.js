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
  View,
  AlertIOS
} from 'react-native';
import Reflux from 'reflux';

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

  submit() {
    if (this.state.text !== null) {
      let date = new Date();
      DiaryActions.createDiary(date, this.state.text, this.state.location, this.state.imageUrl);
      this.state.isSubmitted = true;
    }
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
          autoCapitalize={'none'}
          autoCorrect={false}
        />
        <Location getCityBack={(city) => this._getCity(city)}/>
        <Photo storeSource={null} getImageUrlBack={(url) => this._getImageData(url)}/>
        <View>
          <Text style={styles.commonText}>{this.state.city}</Text>
        </View>
        <TouchableHighlight
          onPress={()=> {
            this.submit();
            AlertIOS.alert(
              'Diary submitted',
              'Press OK and back to the Bref.',
              [
                {
                  text: 'OK', onPress: () => this.props.navigator.pop()
                }
              ]
            );
          }}>
          <Text style={styles.commonText}>Submit</Text>
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
