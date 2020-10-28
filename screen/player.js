import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, Image, SafeAreaView, StatusBar} from 'react-native';
import Moment from 'moment';
import Slider from 'react-native-slider';
import Icon2 from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {suggestData} from '../data/Data';
import { useDispatch, useSelector } from 'react-redux';
import { setStatus } from '../action/status';
import { setShowing } from '../action/showing';
import { currentSong } from '../action/current';
import TrackPlayer from 'react-native-track-player';

function Player (props) {
  const status = useSelector(state => state.status.playing);
  const current = useSelector(state => state.current);

  // const track = { 
  //   img: current.img,
  //   title: current.title,
  //   artist: current.artist,
  //   url: current.url,
  //   timeRemaining: current.timeRemaining,
  //   trackLength: current.trackLength,
  //   id: current.id,
  // };

  // console.log(track);

  const index = current.id;
  
  const [state, setState] = useState({
    shuffle: true,
    repeat: false,
  })

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await TrackPlayer.setupPlayer().then(() => {
        console.log('player is setup');
      });
      await TrackPlayer.reset();

      await TrackPlayer.add([current]);

      await TrackPlayer.play();

      setTimeout(() => {
        TrackPlayer.stop();
      }, track.trackLength * 1000); 
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
        timeRemaining: suggestData[current.id + 1].duration,
        timeElapsed: '0:00',
        trackLength: suggestData[current.id + 1].trackLength,
        id: suggestData[current.id + 1].id,
      }));
    } else {
      dispatch(currentSong({
        img: suggestData[0].img,
        title: suggestData[0].title,
        artist: suggestData[0].artist,
        url: suggestData[0].url,
        timeRemaining: suggestData[0].duration,
        timeElapsed: '0:00',
        trackLength: suggestData[0].trackLength,
        id: suggestData[0].id,
      }));
    }
    dispatch(setStatus(true));
    TrackPlayer.reset();
    console.log(current);
    TrackPlayer.add(current).then(() => {
      TrackPlayer.play();
    })
  }

  renderPlayPausePlayer = () => {
    return status == true ? (
      <Icon2 name="pause-outline" size={35} color="#8E97A6"></Icon2>
    ) : (
      <Icon2 name="play-outline" size={35} color="#8E97A6"></Icon2>
    );
  }

  renderShuffle = () => {
    let shuffle = state.shuffle;
    return shuffle == false ? (
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
    let repeat = state.repeat;
    return repeat == false ? (
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
        timeRemaining: suggestData[current.id - 1].duration,
        timeElapsed: '0:00',
        trackLength: suggestData[current.id - 1].trackLength,
        id: suggestData[current.id - 1].id,
      }));
    } else {
      dispatch(currentSong({
        img: suggestData[n - 1].img,
        title: suggestData[n - 1].title,
        artist: suggestData[n - 1].artist,
        timeRemaining: suggestData[n - 1].duration,
        timeElapsed: '0:00',
        trackLength: suggestData[n - 1].trackLength,
        id: suggestData[n - 1].id,
      }));
    }
  }

  changeTime = (seconds) => {
    setState({timeElapsed: Moment.utc(seconds * 1000).format('m:ss')});
    setState({
      timeRemaining: Moment.utc(
        (state.trackLength - seconds) * 1000,
      ).format('m:ss'),
    });
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
            maximumValue={current.trackLength}
            trackStyle={styles.track}
            thumbStyle={styles.thumb}
            minimumTrackTintColor="#3b5998"
            onValueChange={(seconds) => changeTime(seconds)}></Slider>
          <View
            style={{
              marginTop: -12,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={[styles.textLight, styles.timeStamp]}>
              {current.timeElapsed}
            </Text>
            <Text style={[styles.textLight, styles.timeStamp]}>
              {current.timeRemaining}
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
                shuffle = state.shuffle;
                setState({shuffle: !shuffle});
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
                repeat = state.repeat;
                setState({repeat: !repeat});
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
