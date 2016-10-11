/**
 * Created by irmo on 16/10/11.
 */

'use strict'

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';

export default class TodayScene extends Component {
    constructor() {
        super();
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
        onBack: PropTypes.func.isRequired,
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this.props.onBack}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableHighlight>
                <Text style={styles.commonText}> Today Scene </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        backgroundColor: '#000000',
    },
    backButtonText: {
        color: "#FFFFFF",
        fontSize: 50,
    },
    commonText: {
        color: "#AFAFAF",
    }
})
