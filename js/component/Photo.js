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
          <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
            { this.state.avatarSource === null ? <Text style={styles.commonText}>Select a Photo</Text> :
              <Image style={styles.avatar} source={this.state.avatarSource}/>
            }
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 60,
    width: 120,
    height: 120,
    marginBottom: 30
  },
  commonText: {
    padding: 5,
    paddingBottom: 3,
    color: '#AFAFAF'
  }
});