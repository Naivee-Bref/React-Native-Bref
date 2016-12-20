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
import {styles} from 'react-native-theme';
import {name} from 'react-native-theme';
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
      <View style={[sceneStyle.container, styles.pageBackground]}>
        {statusBar}
        <View style={sceneStyle.content}>
          <Photo
            storeSource={null}
            getImageUrlBack={(url) => this._getImageData(url)}
          />
          <TextInput
            style={[sceneStyle.input, styles.input]}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            multiline={true}
            placeholder={'Say something...'}
            placeholderTextColor={'gray'}
            keyboardType={'default'}
            maxLength={1000}
            autoCapitalize={'none'}
            autoCorrect={false}
          />
          <View refreshing>
            <Location getCityBack={(city) => this._getCity(city)}/>
          </View>
          <TouchableHighlight
            style={[sceneStyle.button, styles.postButton]}
            underlayColor={'gray'}
            activeOpacity={0.5}
            onPress={() => {
              this._submitOnPress();
            }}>
            <Text style={[sceneStyle.buttonText, styles.postButtonText]}>Post</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const sceneStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-start'
  },
  content: {
    flexDirection: 'column',
    paddingTop: 63,
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
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
  commonText: {
    padding: 5,
    paddingBottom: 3,
    color: '#AFAFAF'
  },
  input: {
    paddingTop: 10,
    height: 100,
    width: Dimensions.get('window').width - 60,
    borderWidth: 0.5,
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    fontSize: 15
  }
});
