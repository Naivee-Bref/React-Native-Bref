'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    Navigator,
} from 'react-native';

import OriginalScene from './src/scenes/OriginalScene';
import ReviewScene from './src/scenes/ReviewScene';
import TodayScene from './src/scenes/TodayScene';

class RN_Bref extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{id: 'initial'}}
                renderScene={this.navigatorRenderScene}
            />
        );
    }

    navigatorRenderScene(route, navigator) {
         // _navigator = navigator;
        switch (route.id) {
            case 'initial':
                return (<OriginalScene navigator={navigator}/>);
            case 'review':
                return (<ReviewScene navigator={navigator}/>);
            case 'today':
                return (<TodayScene navigator={navigator}/>);
            default:
                return (<OriginalScene navigator={navigator}/>);
        }
    }
}

AppRegistry.registerComponent('RN_Bref', () => RN_Bref);
