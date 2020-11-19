import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {artistsData} from '../data/Data';

const {width} = Dimensions.get('window');

function Artists(props) {

  const onArtistsPress = () => {
    props.navigation.navigate('Songs');
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nghệ sĩ yêu thích</Text>
      <FlatList
        data={artistsData}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity onPress={() => onArtistsPress()}>
              <View
                style={{
                  flexDirection: 'column',
                  padding: 5,
                  left: -5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={styles.img}
                  source={item.img}
                  style={styles.img}></Image>
                <Text style={styles.name}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

export default Artists;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    top: 15,
    width: width,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#000',
    margin: -20,
    marginLeft: 0,
    marginBottom: 10,
  },
  img: {
    height: 70,
    width: 70,
    borderRadius: 49,
  },
  name: {
    fontSize: 12,
    color: '#000',
  },
});
