'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    Navigator,
} from 'react-native';

import OriginalScene from './OriginalScene';
import ReviewScene from './ReviewScene';

class RN_Bref extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{title: 'Initial Scene', index: 0}}
                renderScene={(route, navigator)=> {
                    if (route.index == 0) {
                        return <OriginalScene
                            title={route.title}
                            onForward={()=> {
                                const nextIndex = route.index + 1;
                                navigator.push({
                                    title: 'Review',
                                    index: nextIndex,
                                });
                            }}
                        />
                    }
                    else {
                        return <ReviewScene
                            title={route.title}
                            onBack={() => {
                                navigator.pop();
                            }}
                        />
                    }
                }}
            />
        );
    }
}

AppRegistry.registerComponent('RN_Bref', () => RN_Bref);
