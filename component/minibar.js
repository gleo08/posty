import React, {useState, useEffect} from 'react';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, View, Image, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {setStatus} from '../action/status';
import TrackPlayer from 'react-native-track-player';
import {useNavigation} from '@react-navigation/native';

function MiniBar(props) {
  const navigation = useNavigation();
  const status = useSelector((state) => state.status.playing);
  const current = useSelector((state) => state.current);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    heart: false,
  });

  onPlayPauseTrack = () => {
    if (status) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  };

  onMiniBarPress = () => {
    navigation.navigate("Player");
  };

  renderHeart = () => {
    return state.heart == true ? (
      <Icon name="cards-heart" size={23} />
    ) : (
      <Icon2 name="heart-outline" size={23} />
    );
  };
  renderPlayPausePlayer = () => {
    return status == true ? (
      <Icon2 name="pause-outline" size={23}></Icon2>
    ) : (
      <Icon2 name="play-outline" size={23}></Icon2>
    );
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => onMiniBarPress()}
      style={{position: 'relative', height: 50}}>
      <View style={styles.container}>
        <Image source={current.img} style={styles.image} />
        <View style={styles.rightContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.title}>{current.title}</Text>
            <Text style={styles.description}>{current.artist}</Text>
          </View>
          <TouchableWithoutFeedback onPress={(e) => e.preventDefault()}>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                onPress={() => {
                  heart = state.heart;
                  setState({heart: !heart});
                }}>
                {renderHeart()}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  dispatch(setStatus(!status));
                  onPlayPauseTrack();
                }}>
                {renderPlayPausePlayer()}
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  image: {
    left: 10,
    width: 50,
    height: 50,
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameContainer: {
    flexDirection: 'column',
    alignContent: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    justifyContent: 'space-around',
  },
  title: {
    color: 'black',
    fontSize: 15,
    bottom: -5,
    left: 14,
  },
  description: {
    color: 'gray',
    fontSize: 11,
    bottom: -7,
    left: 15,
  },
  container: {
    position: 'absolute',
    bottom: -15,
    backgroundColor: '#EEEEEE',
    flexDirection: 'row',
    margin: 15,
    left: -15,
    width: '100%',
  },
});

export default MiniBar;
