import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { useSelector } from 'react-redux';
import MiniBar from '../component/minibar';

function Home () {

  const status = useSelector(state => state.status.playing);
  console.log(status);
  const showing = useSelector(state => state.current.showing);
  console.log(showing);
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Tue cat moi</Text>
        <View>
          <MiniBar />
        </View>
      </View>
    )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text: {
    bottom: 10,
  },

  mini: {

  }
});
