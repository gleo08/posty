import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';

function RTag(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onTag(props.content);
      }}>
      <Text style={styles.text}>{props.content}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    borderRadius: 18,
    backgroundColor: '#333333',
    color: '#fff',
    padding: 9,
    paddingHorizontal: 15,
    marginBottom: 6,
    marginEnd: 6,
  },
});

export default RTag;
