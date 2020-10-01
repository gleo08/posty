import React from 'react';
import {View, StyleSheet, Text, Image, SafeAreaView, StatusBar} from 'react-native';
import Moment from 'moment';
import Slider from 'react-native-slider';
import Icon2 from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {suggestData} from '../data/Data';

class Player extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    playing: true,
    shuffle: true,
    repeat: false,
    img: this.props.route.params.item.img,
    title: this.props.route.params.item.title,
    description: this.props.route.params.item.description,
    timeRemaining: this.props.route.params.item.duration,
    timeElapsed: '0:00',
    trackLength: this.props.route.params.item.trackLength,
    id: this.props.route.params.item.id,
  };

  onDownPress() {
    this.props.navigation.navigate('Tabs');
  }

  onNextPress() {
    let n = suggestData.length;
    if (this.state.id < n - 1) {
      this.setState({
        playing: true,
        img: suggestData[this.state.id + 1].img,
        title: suggestData[this.state.id + 1].title,
        description: suggestData[this.state.id + 1].description,
        timeRemaining: suggestData[this.state.id + 1].duration,
        timeElapsed: '0:00',
        trackLength: suggestData[this.state.id + 1].trackLength,
        id: suggestData[this.state.id + 1].id,
      });
    } else {
      this.setState({
        playing: true,
        img: suggestData[0].img,
        title: suggestData[0].title,
        description: suggestData[0].description,
        timeRemaining: suggestData[0].duration,
        timeElapsed: '0:00',
        trackLength: suggestData[0].trackLength,
        id: suggestData[0].id,
      });
    }
  }

  renderPlayPausePlayer() {
    let playing = this.state.playing;

    return playing == true ? (
      <Icon2 name="pause-outline" size={35} color="#8E97A6"></Icon2>
    ) : (
      <Icon2 name="play-outline" size={35} color="#8E97A6"></Icon2>
    );
  }

  renderShuffle() {
    let shuffle = this.state.shuffle;
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

  renderRepeat() {
    let repeat = this.state.repeat;
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

  onBackPress() {
    let n = suggestData.length;
    if (this.state.id != 0) {
      this.setState({
        playing: true,
        img: suggestData[this.state.id - 1].img,
        title: suggestData[this.state.id - 1].title,
        description: suggestData[this.state.id - 1].description,
        timeRemaining: suggestData[this.state.id - 1].duration,
        timeElapsed: '0:00',
        trackLength: suggestData[this.state.id - 1].trackLength,
        id: suggestData[this.state.id - 1].id,
      });
    } else {
      this.setState({
        playing: true,
        img: suggestData[n - 1].img,
        title: suggestData[n - 1].title,
        description: suggestData[n - 1].description,
        timeRemaining: suggestData[n - 1].duration,
        timeElapsed: '0:00',
        trackLength: suggestData[n - 1].trackLength,
        id: suggestData[n - 1].id,
      });
    }
  }

  changeTime = (seconds) => {
    this.setState({timeElapsed: Moment.utc(seconds * 1000).format('m:ss')});
    this.setState({
      timeRemaining: Moment.utc(
        (this.state.trackLength - seconds) * 1000,
      ).format('m:ss'),
    });
  };

  render() {
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
            <TouchableOpacity onPress={() => this.onDownPress()}>
              <Icon2 name="chevron-down-outline" size={28} color="#8E97A6" />
            </TouchableOpacity>
            <Text style={[styles.textLight, {fontSize: 12}]}>PLAYING</Text>
            <TouchableOpacity>
              <Icon2 name="menu-outline" size={28} color="#8E97A6" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.coverContainer}>
          <Image source={this.state.img} style={styles.cover}></Image>
        </View>

        <View style={{alignItems: 'center', marginTop: 25}}>
          <Text style={[styles.textDark, {fontSize: 20, fontWeight: 'bold'}]}>
            {this.state.title}
          </Text>
          <Text style={[styles.text, {fontSize: 16, marginTop: 5}]}>
            {this.state.description}
          </Text>
        </View>

        <View style={{margin: 25, marginTop: 15}}>
          <Slider
            minimumValue={0}
            maximumValue={this.state.trackLength}
            trackStyle={styles.track}
            thumbStyle={styles.thumb}
            minimumTrackTintColor="#3b5998"
            onValueChange={(seconds) => this.changeTime(seconds)}></Slider>
          <View
            style={{
              marginTop: -12,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={[styles.textLight, styles.timeStamp]}>
              {this.state.timeElapsed}
            </Text>
            <Text style={[styles.textLight, styles.timeStamp]}>
              {this.state.timeRemaining}
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
                shuffle = this.state.shuffle;
                this.setState({shuffle: !shuffle});
              }}>
              {this.renderShuffle()}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onBackPress()}>
              <Icon2
                name="play-skip-back-outline"
                size={25}
                color="#8E97A6"
                style={{marginRight: 4}}></Icon2>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.playButtonContainer}
              onPress={() => {
                playing = this.state.playing;
                this.setState({playing: !playing});
              }}>
              {this.renderPlayPausePlayer()}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onNextPress()}>
              <Icon2
                name="play-skip-forward-outline"
                size={25}
                color="#8E97A6"
                style={{marginLeft: 4}}></Icon2>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                repeat = this.state.repeat;
                this.setState({repeat: !repeat});
              }}>
              {this.renderRepeat()}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
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
    borderRadius: 50,
    marginLeft: 52,
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
