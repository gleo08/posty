import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {MyContext} from '../config/context'

class Search extends Component {
  render() {
    return <View style={styles.container}>
    </View>;
  }
}

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
