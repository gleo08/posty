import React, {Component} from 'react'
import {View, StyleSheet, Text, Dimensions, ImageBackground} from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import {suggestData} from '../data/Data';
import {Surface} from 'react-native-paper';

const {width, height} = Dimensions.get('window');

class Suggestion extends Component {
  constructor(props) {
    super(props);
  }
  playSong = (item) => {
    this.props.navigation.navigate('Player', {item: item});
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Danh xuất đề xuất > </Text>
        <FlatList
          data={suggestData}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => this.playSong(item)}>
                <Surface style={styles.surface}>
                  <ImageBackground
                    source={item.img}
                    style={styles.img}></ImageBackground>
                </Surface>
                <Text style={styles.name}>
                  {item.title} - {item.description}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    width: width,
    height: 250,
    padding: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#000',
    margin: -20,
    marginLeft: 0,
    marginBottom: 10,
  },
  surface: {
    elevation: 5,
    height: 120,
    width: 120,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 50,
    overflow: 'hidden',
  },
  img: {
    height: 120,
    width: 120,
    borderRadius: 10,
  },
  name: {
    color: '#000',
    width: 120,
    bottom: 44,
    fontSize: 13,
  },
});

export default Suggestion;