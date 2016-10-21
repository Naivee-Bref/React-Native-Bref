/**
 * Created by irmo on 16/10/19.
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';


export default class GeolocationExample extends Component {
  constructor() {
    super();
    this.state = {
      Position: 'unknown'
    }
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((Position) => {
      this.setState({Position});
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View>
        <Text style={styles.commonText}>
          <Text>Current position: </Text>
          {JSON.stringify(this.state.Position)}
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  commonText: {
    padding: 5,
    paddingBottom: 3,
    color: '#AFAFAF'
  }
});