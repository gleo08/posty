import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

class Player extends Component {
    state = { }
    render() {
        return (
            <View style={styles.container}></View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});