import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { FlatList} from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { setStatus } from '../action/status';
import { currentSong } from '../action/current';
import { suggestData } from '../data/Data';
import TrackPlayer from 'react-native-track-player';

const {width, height} = Dimensions.get('window')

function Trending (props) {

    const dispatch = useDispatch();

    separator = () => {
        return <View style={{height: 10, backgroundColor: '#fff'}} />;
    }

    playSong = () => {
      props.navigation.navigate('Player');
      TrackPlayer.reset();
    };
        return (
          <View style={styles.container}>
            <Text style={styles.title}>Top thịnh hành</Text>
                <FlatList style={{padding: 10, paddingTop: 0, left: 5}}
                    data = {suggestData}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent = {() => this.separator()}
                    renderItem = {({item, index}) => {
                        return (
                          <TouchableOpacity
                            style={styles.songContainer}
                            onPress={() => {
                              playSong();
                              dispatch(setStatus(true));
                              dispatch(
                                currentSong({
                                  img: item.img,
                                  title: item.title,
                                  artist: item.artist,
                                  url: item.url,
                                  id: item.id,
                                }),
                              );
                            }}>
                            <View style={{flexDirection: 'row'}}>
                              <Image source={item.img} style={styles.img} />
                              <View style={styles.dataContainer}>
                                <Text style={styles.songTitle}>
                                  {item.title}
                                </Text>
                                <Text style={styles.artist}>{item.artist}</Text>
                              </View>
                            </View>
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
    left: -5,
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
      bottom: -10,
  },
  songTitle: {
      fontSize: 16,
      color: '#000'
  },
  artist: {
      fontSize: 12,
      color: 'gray',
  },
});

export default Trending;