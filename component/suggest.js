import React from 'react'
import {View, StyleSheet, Text, Dimensions, ImageBackground} from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import {suggestData} from '../data/Data';
import {Surface} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { setStatus } from '../action/status';
import { currentSong } from '../action/current';
import TrackPlayer from 'react-native-track-player';

const {width} = Dimensions.get('window');

function Suggestion (props) {

  const dispatch = useDispatch();

  playSong = () => {
    props.navigation.navigate('Player');
    TrackPlayer.reset();
  };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Danh xuất đề xuất</Text>
        <FlatList
          data={suggestData}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity 
                onPress={() => {
                  playSong();
                  dispatch(setStatus(true));
                  dispatch(currentSong(
                    {
                      img: item.img,   
                      title: item.title,
                      artist: item.artist,
                      url: item.url,
                      id: item.id,
                    }
                  ));
                }}
              >
                <Surface style={styles.surface}>
                  <ImageBackground
                    source={item.img}
                    style={styles.img}></ImageBackground>
                </Surface>
                <Text style={styles.name}>
                  {item.title} - {item.artist}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 220,
    padding: 10,
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
    borderRadius: 5,
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
    fontSize: 14,
  },
});

export default Suggestion;