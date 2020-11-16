import React from 'react';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {suggestData} from '../data/Data';
import TrackPlayer from 'react-native-track-player';
import {connect} from 'react-redux';
import {setStatus} from '../action/status';
import {currentSong} from '../action/current';

const {width} = Dimensions.get('window');
const index = Math.floor(Math.random() * 7);

class Songs extends React.Component {
  constructor(props) {
    super(props);
  }

  onBackPress = () => {
    this.props.navigation.navigate('Tabs');
  };

  separator = () => {
    return <View style={{height: 7, backgroundColor: '#fff'}} />;
  };

  playSong = () => {
    this.props.navigation.navigate('Player');
    TrackPlayer.reset();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{marginHorizontal: 24, marginTop: 24}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity style={{left: -15}} onPress={() => this.onBackPress()}>
              <Icon2 name="arrow-back-outline" size={28} color="#000" />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                color: '#000',
              }}>
              Bài hát
            </Text>
          </View>
          <View
            style={{
              height: 3,
              backgroundColor: '#333333',
              width: width,
              left: -24,
            }}
          />
        </View>
        <ScrollView
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            top: 5,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              backgroundColor: '#333333',
              alignItems: 'center',
              borderRadius: 100,
              width: 220,
              height: 50,
              justifyContent: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            onPress = {() => {
              this.props.setStatus(true)
              this.props.currentSong({
                img: suggestData[index].img,
                title: suggestData[index].title,
                artist: suggestData[index].artist,
                url: suggestData[index].url,
                id: suggestData[index].id,
              });
              this.playSong();
            }}
            
            >
            <Icon2 name="shuffle-outline" size={24} color="#fff"></Icon2>
            <Text style={{color: '#fff', fontSize: 18, top: -1}}>
              {' '}
              Phát ngẫu nhiên{' '}
            </Text>
          </TouchableOpacity>
          <FlatList
            style={{padding: 10, paddingTop: 20}}
            data={suggestData}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => this.separator()}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity 
                style={styles.songContainer}
                onPress={() => {
                  this.playSong();
                  this.props.setStatus(true);
                  this.props.currentSong({
                    img: item.img,
                    title: item.title,
                    artist: item.artist,
                    url: item.url,
                    id: item.id,
                  });
                }}
                >
                  <View style={{flexDirection: 'row'}}>
                    <Image source={item.img} style={styles.img} />
                    <View style={styles.dataContainer}>
                      <Text style={styles.songTitle}>{item.title}</Text>
                      <Text style={styles.artist}>{item.artist}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  songContainer: {
    width: width,
    height: 70,
    flexDirection: 'row',
  },
  img: {
    height: 70,
    width: 70,
    borderRadius: 5,
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
  artist: {
    fontSize: 12,
    color: 'gray',
  },
});

const mapDispatchToProps = () => {
  return {
    setStatus: setStatus,
    currentSong: currentSong,
  };
};

const mapStateToProps = (state) => {
  return {
    status: state.status.playing,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(Songs);
