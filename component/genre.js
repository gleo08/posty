import React from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {genreData} from '../data/Data';

const {width, height} = Dimensions.get('window');
const numColumns = 2;

class Genre extends React.Component {
  onGenrePress = () => {
    this.props.navigation.navigate('Songs');
  };

  separator = () => {
    return <View style={{height: 0.5, backgroundColor: '#fff'}} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={genreData}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => this.separator()}
          numColumns={numColumns}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={styles.genreContainer}
                onPress={() => {
                  this.onGenrePress();
                }}>
                <View style={{flexDirection: 'column', alignContent: 'center', alignItems: 'center'}}>
                  <Image source={item.img} style={styles.img} />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    height: 100,
    width: width / 2.12,
    borderRadius: 8,
    flex: 1,
    margin: 5,
  },
});

export default Genre;
