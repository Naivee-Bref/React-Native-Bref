'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    Navigator
} from 'react-native';

import OriginalScene from './js/page/OriginalScene';
import ReviewScene from './js/page/ReviewScene';
import TodayScene from './js/page/TodayScene';
import ProfileScene from './js/page/ProfileScene';

class RN_Bref extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{scene: 'initial'}}
                renderScene={RN_Bref.navigatorRenderScene}
            />
        );
    }

    static navigatorRenderScene(route, navigator) {
        switch (route.scene) {
            case 'initial':
                return (<OriginalScene navigator={navigator}/>);
            case 'review':
                return (<ReviewScene navigator={navigator}/>);
            case 'today':
                return (<TodayScene navigator={navigator}/>);
            case 'profile':
                return (<ProfileScene navigator={navigator}/>);
            default:
                return (<OriginalScene navigator={navigator}/>);
        }
    }
}

AppRegistry.registerComponent('RN_Bref', () => RN_Bref);
