/**
 * Created by irmo on 16/10/12.
 */

'use strict';

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

export default class ProfileScene extends Component {
    static propTypes = {
        navigator: PropTypes.object.isRequired
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={() => this.props.navigator.pop()}>
                    <Text style={styles.backButtonText}>
                        Back
                    </Text>
                </TouchableHighlight>
                <Text style={styles.commonText}>
                    Profile Scene
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#000000',
        justifyContent: 'flex-start'
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 50
    },
    commonText: {
        padding: 5,
        paddingBottom: 3,
        color: '#AFAFAF'
    }
});
