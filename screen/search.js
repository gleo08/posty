import React from 'react';
import {View, StyleSheet, Text, Dimensions, TextInput, ScrollView} from 'react-native';
import Icon2 from 'react-native-vector-icons/Ionicons';
import MiniBar from '../component/minibar';
import RTag from '../component/recommendTag';
import SongResult from '../component/songResult';
import {connect} from 'react-redux';
import {setStatus} from '../action/status';
import {currentSong} from '../action/current';
import PlaylistResult from '../component/playlistResult';
import ArtistResult from '../component/artistResult';
import Genre from '../component/genre';

const {width, height} = Dimensions.get('window');

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
    };
    this.inputText = React.createRef();
  }

  tag = (value) => {
    this.setState({
      searchValue: value.toLowerCase(),
    });
  };

  renderMiniBar = () => {
    return this.props.showing == true ? <MiniBar /> : null;
  };

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () =>
      setTimeout(() => {
        this.inputText.focus();
      }, 1),
    );
  }
  componentWillUnmount() {
    this.focusListener.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon2 name="search-outline" style={styles.icon}></Icon2>
          <View style={styles.bar}>
            <TextInput
              placeholder="Tên bài hát, nghệ sĩ, playlist..."
              style={styles.input}
              autoCapitalize="none"
              placeholderTextColor="#333333"
              ref={(ref) => {
                this.inputText = ref;
              }}
              onChangeText={(text) => this.setState({searchValue: text})}
              value={this.state.searchValue}
            />
          </View>
        </View>
        <View
          style={{
            top: 5,
            height: 3,
            backgroundColor: '#333333',
            width: width,
            elevation: 5,
          }}></View>
        <View
          style={{
            display: this.state.searchValue.length == 0 ? 'flex' : 'none',
            flex: 1,
          }}>
          <Text style={styles.history}>Lịch sử tìm kiếm</Text>
          <View
            style={{
              bottom: -20,
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingTop: 10,
              paddingHorizontal: 16,
            }}>
            <RTag onTag={this.tag} content="Post Malone"></RTag>
            <RTag onTag={this.tag} content="Circles"></RTag>
            <RTag onTag={this.tag} content="Sunflower"></RTag>
            <RTag onTag={this.tag} content="Hollywood Bleeding"></RTag>
          </View>
          <Text style={styles.recommend}>Gợi ý tìm kiếm</Text>
          <View
            style={{
              bottom: -20,
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingTop: 10,
              paddingHorizontal: 16,
            }}>
            <RTag onTag={this.tag} content="Post Malone"></RTag>
            <RTag onTag={this.tag} content="Circles"></RTag>
            <RTag onTag={this.tag} content="Sunflower"></RTag>
            <RTag onTag={this.tag} content="Hollywood Bleeding"></RTag>
          </View>
          <Text style={styles.recommend}>Chủ đề và thể loại</Text>
          <View style={{height: height}}>
            <Genre navigation={this.props.navigation} />
          </View>
        </View>
        <View
          style={{
            display: this.state.searchValue.length == 0 ? 'none' : 'flex',
            flex: 1,
          }}>
          <ScrollView
            style={
              {
                // height: height - 70,
              }
            }>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                top: 10,
              }}>
              Bài hát
            </Text>
            <View
              style={{
                top: 15,
                width: width,
                height: 75,
                flexDirection: 'row',
                right: -5,
                // backgroundColor: 'gray',
              }}>
              <SongResult
                navigation={this.props.navigation}
                img={require('../asset/circles2.jpg')}
                title={'Circles'}
                artist={'Post Malone'}
              />
            </View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                top: 15,
              }}>
              Playlist
            </Text>
            <View
              style={{
                top: 20,
                width: width,
                height: 75,
                flexDirection: 'row',
                right: -5,
              }}>
              <PlaylistResult
                navigation={this.props.navigation}
                img={require('../asset/hollywood_bleeding.jpg')}
                name={'Hollywood Bleeding'}
              />
            </View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                top: 20,
              }}>
              Nghệ sĩ
            </Text>
            <View
              style={{
                top: 25,
                width: width,
                height: 100,
                flexDirection: 'row',
                right: -5,
              }}>
              <ArtistResult
                navigation={this.props.navigation}
                img={require('../asset/post_malone.jpg')}
                artist={'Post Malone'}
              />
            </View>
          </ScrollView>
          <View>{this.renderMiniBar()}</View>
        </View>
        <View>{this.renderMiniBar()}</View>
      </View>
    );
  }
}

const mapDispatchToProps = () => {
  return {
    setStatus: setStatus,
    currentSong: currentSong,
  };
};

const mapStateToProps = (state) => {
  return {
    showing: state.showing.showing,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(Search);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bar: {
    borderRadius: 50,
    height: 40,
    backgroundColor: '#EEEEEE',
    width: width - 60,
    justifyContent: 'center',
    left: -20,
  },
  icon: {
    right: -8,
    fontSize: 24,
  },
  input: {
    fontSize: 15,
    marginLeft: 15,
    color: '#000000',
  },
  history: {
    fontSize: 22,
    fontWeight: 'bold',
    top: 10,
  },
  recommend: {
    fontSize: 22,
    fontWeight: 'bold',
    top: 20,
  },
  result: {},
});
