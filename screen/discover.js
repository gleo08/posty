import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import Carousel from '../component/carousel';
import {dummyData} from '../data/Data';
import { ScrollView } from 'react-native-gesture-handler';
import Suggestion from '../component/suggest';
import Trending from '../component/trending';

class Discover extends Component {
  constructor(props) {
    super(props);
  }
  render() {
  console.disableYellowBox=true;
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text style={styles.title}>Khám phá </Text>
      <ScrollView>
        <Carousel navigation={this.props.navigation} data={dummyData} />
        <Suggestion navigation={this.props.navigation} />
        <Trending navigation={this.props.navigation} />
      </ScrollView>
    </View>
  );
}
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 27,
    color: '#000',
    margin: 10,
    marginLeft: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Discover;