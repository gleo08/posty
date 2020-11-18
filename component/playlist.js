import React, {Component} from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {FlatList} from 'react-native-gesture-handler';
import {playlistData} from '../data/Data';
import {playlistSuggestData} from '../data/Data';
import AddModal from './addModal';

const {width} = Dimensions.get('window');

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: null,
    };
    this.onAddPress = this.onAddPress.bind(this);
  }

  separator = () => {
    return <View style={{height: 7, backgroundColor: '#fff'}} />;
  };

  onAddPress() {
    this.refs.addModal.showAddModal();
  }

  onPlaylistPress() {
    this.props.navigation.navigate('Songs');
  }

  refreshFlatList = (key) => {
    this.setState((prevState) => {
      return {
        key: key,
      };
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableHighlight
            style={styles.addPlaylist}
            onPress={this.onAddPress}>
            <Icon2
              name="add-circle-outline"
              size={35}
              color="#fff"
              style={{right: -15}}></Icon2>
          </TouchableHighlight>
          <Text
            style={{
              fontSize: 16,
              color: '#000',
              paddingLeft: 10,
              width: width - 70,
              bottom: -10,
            }}>
            Thêm Playlist
          </Text>
        </View>
        <View style={{height: 7, backgroundColor: '#fff'}} />
        <FlatList
          style={{padding: 0, paddingTop: 0}}
          data={playlistData}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => this.separator()}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={styles.songContainer}
                onPress={() => {
                  this.onPlaylistPress();
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{}}>
                    <Image source={item.img} style={styles.img} />
                  </View>
                  <View style={styles.dataContainer}>
                    <Text style={styles.songTitle}>{item.name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <AddModal ref={'addModal'} parentFlatList={this}></AddModal>
        <Text style={styles.suggestPlaylist}>Playlist gợi ý</Text>
        <FlatList
          style={{padding: 0, paddingTop: 0}}
          data={playlistSuggestData}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => this.separator()}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity style={styles.songContainer} onPress={() => {this.onPlaylistPress();}}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{}}>
                    <Image source={item.img} style={styles.img} />
                  </View>
                  <View style={styles.dataContainer}>
                    <Text style={styles.songTitle}>{item.name}</Text>
                  </View>
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
  songContainer: {
    width: width,
    height: 70,
    flexDirection: 'row',
  },
  img: {
    height: 65,
    width: 65,
    borderRadius: 5,
    bottom: -2.5,
    borderColor: '#000',
  },
  dataContainer: {
    paddingLeft: 10,
    width: width - 70,
    bottom: -10,
  },
  songTitle: {
    fontSize: 16,
    color: '#000',
  },
  addPlaylist: {
    width: 65,
    height: 65,
    backgroundColor: '#333333',
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  suggestPlaylist: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#000',
  },
});

export default Playlist;
