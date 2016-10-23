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
import Reflux from 'reflux';

import Photo from '../component/Photo';
import GeolocationExample from '../component/Location';
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
    }
  }

  reverseGeocoding(longitude, latitude) {
    // TODO: Cannot get parameters.
    function callback(req) {
      let jsonObj = JSON.parse(req.responseText);
      console.log(jsonObj.features[1].text);
      try {
        let city = jsonObj.features[1].text;
      } catch (error) {
        console.error(error);
      }
      return city;
    }

    let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    let apiKey = 'access_token=pk.eyJ1Ijoic3RyYXdiZXJyeWZnIiwiYSI6ImNpdW03a2hhZzAwN2oyb20xYTJ2dmVzOGoifQ.R7XeStof2bdjmKMGHIVlmg';
    let req = new XMLHttpRequest();
    // let longitude = 121;
    // let latitude = 31;
    let reqUrl = url + longitude + ',' + latitude + '.json?' + apiKey;
    console.log(reqUrl);
    req.onreadystatechange = function () {
      if (req.readyState == 4 && req.status == 200) {
        callback(req);
      }
    };
    req.open('GET', reqUrl, true);
    req.send(null);
  }

  submit() {
    let date = new Date();
    let city = this.reverseGeocoding(121, 31);
    DiaryActions.createDiary(date, this.state.text);
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
        <GeolocationExample />
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
