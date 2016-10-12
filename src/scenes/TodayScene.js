/**
 * Created by irmo on 16/10/11.
 */

'use strict'

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TextInput,
    View,
    TouchableHighlight,
} from 'react-native';

var GeolocationExample = React.createClass({
    // watchID: (null: ?number),

    getInitialState: function () {
        return {
            initialPosition: 'unknown',
            lastPosition: 'unknown',
        };
    },

    componentDidMount: function () {
        navigator.geolocation.getCurrentPosition(
            (initialPosition) => this.setState({initialPosition}),
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
        this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
            this.setState({lastPosition});
        });
    },

    componentWillUnmount: function () {
        navigator.geolocation.clearWatch(this.watchID);
    },

    render: function () {
        return (
            <View>
                <Text></Text>
                <Text style={styles.commonText}>
                    <Text>Initial position: </Text>
                    {JSON.stringify(this.state.initialPosition)}
                </Text>
                <Text>

                </Text>
                <Text style={styles.commonText}>
                    <Text>Current position: </Text>
                    {JSON.stringify(this.state.lastPosition)}
                </Text>
            </View>
        );
    }
});

export default class TodayScene extends Component {
    constructor() {
        super();
        this.state = {
            text: 'Default Text',
            location: 'unknown',
        }
    }

    static propTypes = {
        navigator: PropTypes.object.isRequired
    }


    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={() => this.props.navigator.pop()}>
                    <Text style={styles.backButtonText}>
                        Back
                    </Text>
                </TouchableHighlight>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />
                <GeolocationExample />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        backgroundColor: 'black',
    },
    backButtonText: {
        color: "#FFFFFF",
        fontSize: 50,
    },
    commonText: {
        padding: 5,
        paddingBottom: 3,
        color: "#AFAFAF",
    },
    input: {
        height: 100,
        borderColor: 'white',
        borderWidth: 1,
        color: '#AFAFAF',
        fontSize: 15,
        alignItems: 'flex-start',
    }
})
