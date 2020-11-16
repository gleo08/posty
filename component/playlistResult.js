import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Text,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

function PlaylistResult(props) {

    onPlaylistPress = () => {
    props.navigation.navigate('Songs');
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onPlaylistPress();
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
          <Text style={styles.playlistTitle}>{props.name}</Text>
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
  playlistTitle: {
    fontSize: 16,
    color: '#000',
  },
});

export default PlaylistResult;
