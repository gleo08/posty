import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {playlistSuggestData} from '../data/Data';
import {Surface} from 'react-native-paper';

const {width} = Dimensions.get('window');

function WouldLike(props) {

  onWouldLikePress = () => {
    props.navigation.navigate('Songs');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Có thể bạn muốn nghe</Text>
      <FlatList
        data={playlistSuggestData}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity onPress={() => onWouldLikePress()}>
              <Surface style={styles.surface}>
                <ImageBackground
                  source={item.img}
                  style={styles.img}></ImageBackground>
              </Surface>
              <Text style={styles.name}>
                {item.name}
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
    height: 250,
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

export default WouldLike;
