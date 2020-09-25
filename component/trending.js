import React, {Component} from 'react';
import {View, StyleSheet, Text, Dimensions, Image} from 'react-native';
import { FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { suggestData } from '../data/Data'

const {width, height} = Dimensions.get('window')

class Trending extends Component {
    constructor(props) {
        super(props);
    }

    separator = () => {
        return <View style={{height: 10, backgroundColor: '#fff'}} />;
    }

    playSong= item => {
        this.props.navigation.navigate('Player', {item: item});
    }

    render() {
        return (
          <View style={styles.container}>
            <Text style={styles.title}>Top thịnh hành ></Text>
            <View style={{padding: 10, paddingTop: 0}} >
                <FlatList
                    data = {suggestData}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent = {() => this.separator()}
                    renderItem = {({item, index}) => {
                        return (
                            <TouchableOpacity 
                            style={styles.songContainer}
                            onPress = {() => this.playSong(item)} 
                            >
                                <View style={{flexDirection: 'row'}}>
                                    <Image  
                                        source = {item.img}
                                        style = {styles.img}
                                    />
                                    <View style={styles.dataContainer}>
                                        <Text style={styles.songTitle}>{item.title}</Text>
                                        <Text style={styles.description}>{item.description}</Text>
                                        <Text style={styles.duration}>{item.duration}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
          </View>
        );
}
}

const styles = StyleSheet.create({
  container: {
    width: width,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#000',
    margin: -40,
    marginLeft: 15,
    marginBottom: 10,
  },
  songContainer: {
      width: width,
      height: 70,
      flexDirection: 'row',
  }, 
  img: {
      height: 70,
      width: 70,
      borderRadius: 5,
  },
  dataContainer: {
      paddingLeft: 10,
      width: width - 70,
  },
  songTitle: {
      fontSize: 18,
      color: '#000'
  },
  description: {
      fontSize: 14,
      color: 'gray',
  },
  duration: {
    fontSize: 14,
    color: 'gray',
  },
});

export default Trending;