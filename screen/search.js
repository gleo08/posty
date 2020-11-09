import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TextInput} from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

function Search() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput style={{width: width - 70, height: 10}}></TextInput>
        <TouchableOpacity style={styles.icon}>
          <Icon2 name="search-outline" size={23} color="black"></Icon2>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 3,
          backgroundColor: '#333333',
          width: width,
        }}></View>
        <View style={styles.result}></View>
    </View>
  );
}

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 40,
    width: 40,
    backgroundColor: '#EEEEEE',
    alignContent: 'center',
    justifyContent: 'center',
    elevation: 5,
    borderRadius: 20,
  },
  result: {

  }
});
