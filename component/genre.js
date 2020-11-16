import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import genreData from '../data/Data';

const numColumns = 2;
const {width, height} = Dimensions.get('window');

function Genre(props) {


    formatData = (genreData, numColumns) => {
        const totalRows = Math.floor(genreData.length / numColumns)
        let totalLastRow = genreData.length - (totalRows * numColumns)

        while (totalLastRow !== 0 && totalLastRow !== numColumns) {
            genreData.push({name: 'blank', empty: true})
        }
    }

    onGenrePress = () => {
        props.navigation.navigate('Songs');
    }

    return (
      <View>
        <FlatList 
            data={genreData}
            keyExtractor={(item, index) => index.toString()}
            numColumns = {numColumns}
            renderItem={(item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      onGenrePress();
                    }}>
                    <View style={{flexDirection: 'column'}}>
                      <Image source={item.img} style={styles.img} />
                      <View style={styles.dataContainer}>
                        <Text style={styles.genreTitle}>{item.name}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
            }}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  img: {
    height: 65,
    width: 65,
    borderRadius: 5,
  },
  dataContainer: {
    paddingLeft: 10,
    width: width - 70,
    bottom: -10,
  },
  genreTitle: {
    fontSize: 16,
    color: '#000',
  },
});

export default Genre;