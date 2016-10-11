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
                initialRoute={{title: 'Initial Scene', index: 0}}
                renderScene={(route, navigator)=> {
                    if (route.index == 0) {
                        return <OriginalScene
                            title={route.title}
                            onForwardReview={(scene)=> {
                                const nextIndex = route.index + 1;
                                navigator.push({
                                    title: 'Review',
                                    index: nextIndex,
                                });
                            }}
                            onForwardToday={(scene)=> {
                                const nextIndex = route.index + 1;
                                navigator.push({
                                    title: 'Today',
                                    index: nextIndex,
                                });
                            }}
                        />
                    }
                    else {
                        if (route.title == 'Review') {
                            return <ReviewScene
                                title={route.title}
                                onBack={() => {
                                    navigator.pop();
                                }}
                            />;
                        }
                        else {
                            return <TodayScene
                                title={route.title}
                                onBack={() => {
                                    navigator.pop();
                                }}
                            />;
                        }
                    }
                }}
            />
        );
    }
}

AppRegistry.registerComponent('RN_Bref', () => RN_Bref);
