import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MiniBar from '../component/minibar';
import Profile from '../component/profile';
import { useSelector } from 'react-redux';
import Library from '../component/library';

function Home () {

  const showing = useSelector(state => state.showing.showing);

  renderMiniBar = () => {
      return showing == true ?(
          <MiniBar />
      ) : (
        null
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Thư viện</Text>
        <Profile />
          <Library />
        <View style={styles.mini}>
          {renderMiniBar()}
        </View>
      </View>
    )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  title: {
    fontWeight: 'bold',
    fontSize: 27,
    color: '#000',
    margin: 10,
    marginLeft: 15,
  },

});
