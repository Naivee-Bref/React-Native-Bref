/**
 * Created by irmo on 16/10/19.
 */

'use strict';

import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';


export default class Location extends Component {
  static propTypes = {
    getCityBack: PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      position: '',
      city: ''
    };
  }

  async componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        var jsonPosition = JSON.stringify(position);
        this.setState({position: jsonPosition});
      }
    );
    console.log('state: ' + this.state.position);
    await setTimeout(()=>this.getCity(), 300);
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  reverseGeocoding(longitude, latitude) {
    // TODO: Deal with null parameters, example: not allowed GPS permission.

    let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    let apiKey = 'access_token=pk.eyJ1Ijoic3RyYXdiZXJyeWZnIiwiYSI6ImNpdW03a2hhZzAwN2oyb20xYTJ2dmVzOGoifQ.R7XeStof2bdjmKMGHIVlmg';
    let req = new XMLHttpRequest();
    let reqUrl = url + longitude + ',' + latitude + '.json?' + apiKey;
    console.log('request url:' + reqUrl);
    req.onreadystatechange = function () {
      if (req.readyState == 4 && req.status == 200) {
        try {
          let jsonObj = JSON.parse(req.responseText);
          var city = jsonObj.features[1].text;
          this.setState({city: city});
        }
        catch (error) {
          console.warn(error);
        }
      }
    }.bind(this);
    req.open('GET', reqUrl, true);
    req.send(null);
  };

  getCity() {
    try {
      let jsonObj = JSON.parse(this.state.position);
      let longitude = -jsonObj.coords.longitude.toFixed(3);
      let latitude = jsonObj.coords.latitude.toFixed(3);
      let city = this.reverseGeocoding(longitude, latitude);
      this.setState({city: city});
      this.props.getCityBack(city);
    }
    catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <View refreshing>
        {/*<Text style={styles.commonText}>*/}
          {/*<Text>Current position: </Text>*/}
          {/*{this.state.position}*/}
        {/*</Text>*/}
        <Text style={styles.commonText}>
          <Text>City: </Text>
          {this.state.city}
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  commonText: {
    justifyContent: 'flex-start',
    padding: 20,
    paddingBottom: 3,
    color: '#AFAFAF'
  }
});