/**
 * Created by irmo on 16/10/11.
 */

'use strict'

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight,
} from 'react-native';

export default class ReviewScene extends Component {
    constructor() {
        super();
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2})
        this.state = {
            // TODO: Add time and location to data source.
            dataSource: ds.cloneWithRows([
                '西柚今天翘课被举报了，假装什么都没有发生的样子',
                '校车上全都是小鲜肉',
                '食堂的早饭又有油条',
                '食堂的早饭有油条，激动人心~',
                '编不下去了摔',
                '编不下去了',
                '编不下去了',
                '编不下去了',
                '编不下去了',
                '编不下去了',
                '编不下去了',
                '编不下去了',
                '编不下去了',
                '编不下去了',
                '编不下去了',
                '编不下去了',
                '编不下去了',
                '编不下去了',
                '编不下去了',
                '编不下去了',
            ])
        }
    }

    static propTypes = {
        navigator: PropTypes.object.isRequired,
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={() => this.props.navigator.pop()}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableHighlight>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <View style={styles.item}>
                            <Text style={styles.timeline_text}>
                                {rowData}
                            </Text>
                            <Text style={styles.timeline_others}>
                                08:45
                            </Text>
                        </View>
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#000000',
        justifyContent: 'center',
    },
    backButtonText: {
        color: "#FFFFFF",
        fontSize: 50,
    },
    item: {
        padding: 5,
        marginLeft: 10,
    },
    timeline_text: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    timeline_others: {
        color: '#AFAFAF',
        fontSize: 12,
    }
});