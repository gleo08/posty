import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {setStatus} from '../action/status';
import {currentSong} from '../action/current';
import TrackPlayer from 'react-native-track-player';
import {suggestData} from '../data/Data';

const {width, height} = Dimensions.get('window');

function SongResult(props) {

    const dispatch = useDispatch();

    playSong = () => {
        props.navigation.navigate('Player');
        TrackPlayer.reset();
    }

  return (
    <TouchableWithoutFeedback onPress={() => {
        playSong();
        dispatch(setStatus(true));
        dispatch(currentSong(
        {
            img: suggestData[0].img,
            title: suggestData[0].title,
            artist: suggestData[0].artist,
            url: suggestData[0].url,
            id: suggestData[0].id,
        }));
    }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Image
          source={props.img}
          style={{
            height: 70,
            width: 70,
            borderRadius: 5,
          }}></Image>
        <View style={styles.description}>
          <Text style={styles.songTitle}>{props.title}</Text>
          <Text style={styles.artist}>{props.artist}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  description: {
    paddingLeft: 10,
    width: width - 70,
    bottom: -10,
  },
  songTitle: {
    fontSize: 16,
    color: '#000',
  },
  artist: {
    fontSize: 12,
    color: 'gray',
  },
});

export default SongResult;
