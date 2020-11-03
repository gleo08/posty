import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, Image, SafeAreaView, StatusBar} from 'react-native';
import Slider from 'react-native-slider';
import Icon2 from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {suggestData} from '../data/Data';
import { useDispatch, useSelector } from 'react-redux';
import { setStatus } from '../action/status';
import { setShowing } from '../action/showing';
import { currentSong } from '../action/current';
import TrackPlayer, {useProgress} from 'react-native-track-player';

function Player (props) {
  const status = useSelector(state => state.status.playing);
  const current = useSelector(state => state.current);

  const {position, duration} = useProgress();

  const index = current.id;
  
  const [state, setState] = useState({
    shuffle: true,
    repeat: false,
  })

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await TrackPlayer.add([current]);
      if (status === true) {
        await TrackPlayer.play();
      }
    })();
  }, [index]);

  onPlayPauseTrack = () => {
    if (status) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  }

  onDownPress = () => {
    dispatch(setShowing(true));
    props.navigation.navigate('Tabs');
  }

  onNextPress = () => {
    let n = suggestData.length;
    if (current.id < n - 1) {
      dispatch(currentSong({
        img: suggestData[current.id + 1].img,
        title: suggestData[current.id + 1].title,
        artist: suggestData[current.id+ 1].artist,
        url: suggestData[current.id + 1].url,
        id: suggestData[current.id + 1].id,
      }));
    } else {
      dispatch(currentSong({
        img: suggestData[0].img,
        title: suggestData[0].title,
        artist: suggestData[0].artist,
        url: suggestData[0].url,
        id: suggestData[0].id,
      }));
    }
    dispatch(setStatus(true));
    TrackPlayer.reset();
    console.log(current);
  }

  renderPlayPausePlayer = () => {
    return status == true ? (
      <Icon2 name="pause-outline" size={35} color="#8E97A6"></Icon2>
    ) : (
      <Icon2 name="play-outline" size={35} color="#8E97A6"></Icon2>
    );
  }

  renderShuffle = () => {
    return state.shuffle == true ? (
      <Icon2
        name="shuffle-outline"
        size={28}
        color="#8E97A6"
        style={{marginRight: 25}}></Icon2>
    ) : (
      <Icon2
        name="shuffle-outline"
        size={28}
        color="#000"
        style={{marginRight: 25}}></Icon2>
    );
  }

  renderRepeat = () => {
    return state.repeat == true ? (
      <Icon2
        name="repeat-outline"
        size={28}
        color="#8E97A6"
        style={{marginLeft: 25}}></Icon2>
    ) : (
      <Icon2
        name="repeat-outline"
        size={28}
        color="#000"
        style={{marginLeft: 25}}></Icon2>
    );
  }

  onBackPress = () => {
    let n = suggestData.length;
    if (current.id != 0) {
      dispatch(currentSong({
        img: suggestData[current.id - 1].img,
        title: suggestData[current.id - 1].title,
        artist: suggestData[current.id - 1].artist,
        url: suggestData[current.id  - 1].url,
        id: suggestData[current.id - 1].id,
      }));
    } else {
      dispatch(currentSong({
        img: suggestData[n - 1].img,
        title: suggestData[n - 1].title,
        artist: suggestData[n - 1].artist,
        url: suggestData[n - 1].url,
        id: suggestData[n - 1].id,
      }));
    }
    dispatch(setStatus(true));
    TrackPlayer.reset();
    console.log(current);
  }

  const formatTime = (secs) => {
    let minutes = Math.floor(secs / 60);
    let seconds = Math.ceil(secs - minutes * 60);

    if (seconds < 10) seconds = `0${seconds}`;

    return `${minutes}:${seconds}`;
  };

  const handleChange = (val) => {
    TrackPlayer.seekTo(val);
  };

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#DEE9FD" />
        <View style={{marginHorizontal: 24, marginTop: 24}}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <TouchableOpacity onPress={() => onDownPress()}>
              <Icon2 name="chevron-down-outline" size={28} color="#8E97A6" />
            </TouchableOpacity>
            <Text style={[styles.textLight, {fontSize: 12}]}>PLAYING</Text>
            <TouchableOpacity>
              <Icon2 name="menu-outline" size={28} color="#8E97A6" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.coverContainer}>
          <Image source={current.img} style={styles.cover}></Image>
        </View>

        <View style={{alignItems: 'center', marginTop: 25}}>
          <Text style={[styles.textDark, {fontSize: 20, fontWeight: 'bold'}]}>
            {current.title}
          </Text>
          <Text style={[styles.text, {fontSize: 16, marginTop: 5}]}>
            {current.artist}
          </Text>
        </View>

        <View style={{margin: 25, marginTop: 15}}>
          <Slider
            minimumValue={0}
            value={position}
            maximumValue={duration}
            trackStyle={styles.track}
            thumbStyle={styles.thumb}
            minimumTrackTintColor="#3b5998"
            onSlidingComplete={handleChange}
            >
          </Slider>
          <View
            style={{
              marginTop: -12,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={[styles.textLight, styles.timeStamp]}>
              {formatTime(position)}
            </Text>
            <Text style={[styles.textLight, styles.timeStamp]}>
              {formatTime(duration)}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <TouchableOpacity
              onPress={() => {
                s = state.shuffle;
                setState({shuffle: !s});
              }}>
              {renderShuffle()}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onBackPress()}>
              <Icon2
                name="play-skip-back-outline"
                size={25}
                color="#8E97A6"
                style={{marginRight: 4}}></Icon2>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.playButtonContainer}
              onPress={() => {
                dispatch(setStatus(!status));
                onPlayPauseTrack();
              }}>
              {renderPlayPausePlayer()}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onNextPress()}>
              <Icon2
                name="play-skip-forward-outline"
                size={25}
                color="#8E97A6"
                style={{marginLeft: 4}}></Icon2>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                r = state.repeat;
                setState({repeat: !r});
              }}>
              {renderRepeat()}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DEE9FD',
  },
  textLight: {
    color: '#3D425C',
  },
  textDark: {
    color: '#3D425C',
  },
  text: {
    color: '#8E97A6',
  },
  coverContainer: {
    marginTop: 32,
    width: 250,
    height: 250,
    shadowColor: '#000',
    shadowOffset: {height: 15},
    shadowRadius: 8,
    shadowOpacity: 0.3,
  },
  cover: {
    width: 250,
    height: 250,
    marginLeft: 55,
  },
  track: {
    height: 2,
    borderRadius: 1,
    backgroundColor: '#fff',
  },
  thumb: {
    width: 12,
    height: 12,
    backgroundColor: '#3b5998',
  },
  timeStamp: {
    fontSize: 14,
    fontWeight: '500',
  },
  playButtonContainer: {
    backgroundColor: '#FFF',
    width: 70,
    height: 70,
    borderRadius: 49,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 32,
    elevation: 5,
    marginLeft: 40,
  },
});

export default Player;
