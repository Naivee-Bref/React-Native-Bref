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

export default class NewScene extends Component {
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
      city: 'unknown',
      tag: [],
      isSubmitted: false
    }
  }

  _getCity(city) {
    console.log('getcity:' + city);
    this.setState({city: city});
  }

  _getImageData(url) {
    this.setState({imageUrl: url});
  }

  _submitOnPress() {
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
    // modify the parameters if necessary
    DiaryActions.createDiary(date, this.state.text, this.state.city,
      this.state.imageUrl, this.state.tag === [] ? '' : this.state.tag);
    this.setState({isSubmitted: true});
  }

  render() {
    return (
      <View style={styles.container_out}>
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
            maxLength={700}
            autoCapitalize={'none'}
            autoCorrect={false}
          />
          <View style={styles.location} refreshing>
            <Location getCityBack={(city) => this._getCity(city)}/>
          </View>
          <TouchableHighlight
            style={styles.button}
            underlayColor={'gray'}
            activeOpacity={0.5}
            onPress={() => {
              this._submitOnPress();
            }}>
            <Text style={styles.buttonText}>Post </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container_out: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#202020'
  },
  container: {
    backgroundColor: '#202020',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: 40,
    alignItems: 'center',
    flex: 0
  },
  location: {
    flex: 1,
    marginLeft: 20
  },
  button: {
    height: 40,
    width: 80,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: '#202020'
  },
  buttonText: {
    height: 30,
    width: 70,
    marginLeft: 5,
    marginTop: 5,
    fontSize: 24,
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
