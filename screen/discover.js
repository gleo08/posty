import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import Carousel from '../component/carousel';
import {dummyData} from '../data/Data';
import { ScrollView } from 'react-native-gesture-handler';
import Suggestion from '../component/suggest';
import Trending from '../component/trending';
import MiniBar from '../component/minibar';
import { useSelector } from 'react-redux';

function Discover (props) {

  const showing = useSelector(state => state.showing.showing);

  renderMiniBar = () => {
      return showing == true ?(
          <MiniBar />
      ) : (
        null
      );
    }

  console.disableYellowBox=true;
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text style={styles.title}>Khám phá </Text>
      <ScrollView>
        <Carousel navigation={props.navigation} data={dummyData} />
        <Suggestion navigation={props.navigation} />
        <Trending navigation={props.navigation} />
        <Text></Text>
        <Text></Text>
        <Text></Text>
      </ScrollView>
      <View>
          {renderMiniBar()}
      </View>
    </View>
  );
  }

export default Discover;

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
})