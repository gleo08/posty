import React, {Component} from 'react';
import {Dimensions, Text, StyleSheet, View, Image, TextInput} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import { playlistData } from '../data/Data';

var screen = Dimensions.get('window');

class AddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: ''
    }
  }

  showAddModal = () => {
    this.refs.myModal.open();
  }

  render() {
    return (
      <Modal
        ref={'myModal'}
        style={{
          justifyContent: 'center',
          elevation: 10,
          width: screen.width - 80,
          height: 200,
          borderRadius: 30,
          top: -50,
        }}
        // position=""
        backdrop={true}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 40,
          }}>
          Tên Playlist
        </Text>
        <TextInput
          style={{
            height: 40,
            borderBottomColor: 'gray',
            marginLeft: 30,
            marginRight: 30,
            marginTop: 20,
            marginBottom: 10,
            borderBottomWidth: 1,
          }}
          onChangeText={(text) => this.setState({name: text})}
          placeholder="Tên Playlist"
          value={this.state.name}
        />
        <Button
            style={{fontSize: 18, color: 'white'}}
            containerStyle={{
                padding: 8,
                marginLeft: 70,
                marginRight: 70,
                height: 40,
                borderRadius: 10,
                backgroundColor: 'gray'
            }}
            onPress={() => {
              if (this.state.name.length == 0) {
                alert('Bạn chưa nhập tên Playlist');
                return;
              }
              const key = playlistData.length + 1;
              const newPlaylist = {
                name: this.state.name,
                id: key,
                img: require('../asset/playlist3.jpg'),
              };
              playlistData.push(newPlaylist);
              this.props.parentFlatList.refreshFlatList(key);
              this.refs.myModal.close();
            }}
        >Tạo Playlist</Button>
      </Modal>
    );
  }
}

export default AddModal;
