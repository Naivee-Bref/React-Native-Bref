/**
 * Created by irmo on 16/10/11.
 */

'use strict'

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';


export default class OriginalScene extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome_main}>
                    bref.
                </Text>
                <Text style={styles.welcome_text}>
                    To get started, edit index.ios.js
                </Text>
                <Text style={styles.welcome_text}>
                    Press Cmd+R to reload,{'\n'}
                    Cmd+D or shake for dev menu
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    welcome_main: {
        fontSize: 50,
        color: '#FFFFFF',
        textAlign: 'center',
        margin: 10,
        letterSpacing: 8,
        fontFamily: 'Courier',
    },
    welcome_text: {
        textAlign: 'center',
        color: '#9F9F9F',
        marginBottom: 5,
    },
});