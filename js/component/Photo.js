/**
 * Created by irmo on 16/10/18.
 */

'use strict';

import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  ImageStore
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {styles} from 'react-native-theme';

export default class Photo extends Component {
  static propTypes = {
    storeSource: PropTypes.string,
    getImageUrlBack: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      avatarSource: this.props.storeSource
    };
  }

  selectPhotoTapped() {
    ImagePicker.showImagePicker(null, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        this.props.getImageUrlBack(response.uri);
        this.setState({
          avatarSource: source
        });
      }
    });
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View style={[photoStyle.avatar, photoStyle.avatarContainer, styles.photoContainer, {marginBottom: 20}]}>
            { this.state.avatarSource === null ? <Text style={[photoStyle.commonText, styles.photoText]}>Select a Photo</Text> :
              <Image style={photoStyle.avatar} source={this.state.avatarSource}/>
            }
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const photoStyle = StyleSheet.create({
  avatarContainer: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3,
    },
  },
  avatar: {
    borderRadius: 60,
    width: 120,
    height: 120
  },
  commonText: {
    padding: 5,
    paddingBottom: 3,
  }
});