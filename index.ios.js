'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    Navigator,
} from 'react-native';

import OriginalScene from './OriginalScene';

class RN_Bref extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{title: 'Initial Scene', index: 0}}
                renderScene={()=> {
                    return <OriginalScene/>
                }}
            />
        );
    }
}

AppRegistry.registerComponent('RN_Bref', () => RN_Bref);
