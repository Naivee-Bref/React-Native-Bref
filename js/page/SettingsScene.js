/**
 * Created by irmo on 16/10/12.
 */

'use strict';

import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Switch,
  ListView,
  AsyncStorage
} from 'react-native';

export default class SettingsScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['Set Motto', 'Enable Touch ID', 'Enable Night Mode', 'About']),
      touchIdEnabled: null,
      nightModeEnabled: null
    };
  };

  async _loadInitialState() {
    await AsyncStorage.getItem('@Bref:TouchIdEnabled')
      .then(result => {
        if (result !== null) {
          this.setState({touchIdEnabled: result === 'true'});
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  componentWillMount() {
    this._loadInitialState().done();
  }

  async _storeTouchIdOption(value) {
    await AsyncStorage.setItem('@Bref:TouchIdEnabled', value.toString())
      .then(success => {
        console.log('store touch id option success');
      })
      .catch(error => {
        console.log('store touch id option fail')
      });
  }

  _renderRow(rowData) {
    switch (rowData.toString()) {
      case 'Set Motto':
        return (
          <View>
            <View style={styles.separator_top}/>
            <TouchableHighlight
              underlayColor={"#21618C"}
              activeOpacity={0.5}
              onPress={() => this.props.navigator.push({scene: 'Set Motto'})}>
              <Text style={styles.commonText}> {rowData.toString()} </Text>
            </TouchableHighlight>
          </View>
        );
      case 'Enable Touch ID':
        return (
          <View style={{width: 400}}>
            <View style={styles.separator_bottom}/>
            <Text style={[styles.commonText, {marginLeft: 3}]}>
              Enable Touch ID
              <View style={{width: 100, height: 10, marginTop: -20, marginLeft: 160}}>
                <Switch disabled={false} style={styles.switch}
                        onValueChange={(value) => {
                          this.setState({touchIdEnabled: value});
                          this._storeTouchIdOption(value).done();
                        }}
                        value={this.state.touchIdEnabled == true}/>
              </View>
            </Text>
          </View>
        );
      case 'Enable Night Mode':
        return (
          <View style={{width: 400}}>
            <View style={styles.separator_bottom}/>
            <Text style={[styles.commonText, {marginLeft: 3}]}>
              Enable Night Mode
              <View style={{width: 100, height: 10, marginTop: -20, marginLeft: 142}}>
                <Switch disabled={false} style={styles.switch}/>
              </View>
            </Text>
          </View>
        );
      case 'About':
        return (
          <View style={{width: 400}}>
            <View style={styles.separator_bottom}/>
            <TouchableHighlight
              underlayColor={"#21618C"}
              activeOpacity={0.5}
              onPress={() => this.props.navigator.push({scene: 'About'})}>
              <Text style={[styles.commonText, {marginLeft: 3}]}>
                About
              </Text>
            </TouchableHighlight>
            <View style={styles.separator_top}/>
          </View>
        );
    }
  }

  render() {
    return (
      <View style={[{marginTop: 60}, styles.container]}>
        <ListView style={{marginTop: 10}}
                  dataSource={this.state.dataSource}
                  enableEmptySections={true}
                  renderRow={(rowData) => this._renderRow(rowData)}

        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#202020',
    justifyContent: 'flex-start'
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 50
  },
  commonText: {
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#FFFFFF'
  },
  separator_top: {
    height: 1,
    backgroundColor: '#D7DBDD',
  },
  separator_bottom: {
    height: 1,
    marginLeft: 10,
    marginRight: 30,
    backgroundColor: '#D7DBDD',
  },
  row: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: 'black',
  },
  switch: {
    marginLeft: 40,
    marginTop: 20
  }
});
