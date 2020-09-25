import React, {Component} from 'react';
import {View, StyleSheet, Text, Image, SafeAreaView} from 'react-native';
import Moment from 'moment';
import Slider from 'react-native-slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Player extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    img: this.props.route.params.item.img,
    title: this.props.route.params.item.title,
    description: this.props.route.params.item.description,
    timeRemaining: this.props.route.params.item.duration,
    timeElapsed: "0:00",
    trackLength: this.props.route.params.item.trackLength,
  };

  changeTime = seconds => {
    this.setState({ timeElapsed: Moment.utc(seconds * 1000).format("m:ss") });
    this.setState({ timeRemaining: Moment.utc((this.state.trackLength - seconds) * 1000).format("m:ss") });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <View style={{alignItems: 'center', marginTop: 24}}>
            <Text style={[styles.textLight, {fontSize: 12}]}>PLAYING</Text>
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

        <View style={{margin: 32, marginTop: 15}}>
          <Slider
            minimumValue={0}
            maximumValue={this.state.trackLength}
            trackStyle={styles.track}
            thumbStyle={styles.thumb}
            minimumTrackTintColor="#93A8B3"
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
              marginTop: 16,
            }}>
            <TouchableOpacity>
              <Icon
                name="random"
                size={25}
                color="#8E97A6"
                style={{marginRight: 20}}></Icon>
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="backward" size={25} color="#8E97A6" style={{marginRight: 4}}></Icon>
            </TouchableOpacity>
            <TouchableOpacity style={styles.playButtonContainer}>
              <Icon
                name="play"
                size={30}
                color="#8E97A6"
                style={{marginLeft: 8}}></Icon>
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                name="forward"
                size={25}
                color="#8E97A6"
                style={{marginLeft: 4}}></Icon>
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                name="retweet"
                size={25}
                color="#8E97A6"
                style={{marginLeft: 20}}></Icon>
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
    backgroundColor: '#EAEAEC',
  },
  textLight: {
    color: '#B6B7BF',
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
    width: 10,
    height: 10,
    backgroundColor: '#3D425C',
  },
  timeStamp: {
    fontSize: 14,
    fontWeight: '500',
  },
  playButtonContainer: {
    backgroundColor: '#FFF',
    borderColor: '#8E97A6',
    borderWidth: 16,
    width: 100,
    height: 100,
    borderRadius: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 32,
    elevation: 1,
  },
});

export default Player;
