import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Carousel from '../component/carousel';
import {dummyData} from '../data/Data';
import {ScrollView} from 'react-native-gesture-handler';
import Suggestion from '../component/suggest';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Trending from '../component/trending';
import MiniBar from '../component/minibar';
import {useSelector} from 'react-redux';
import WouldLike from '../component/wouldLike';
import Artists from '../component/artists';

function Discover(props) {
  const showing = useSelector((state) => state.showing.showing);

  renderMiniBar = () => {
    return showing == true ? <MiniBar /> : null;
  };

  search = () => {
    props.navigation.navigate('Tabs', {screen: 'Tìm kiếm'});
  }

  console.disableYellowBox = true;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <Text style={styles.title}>Khám phá </Text>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            search();
          }}>
          <Icon2 name="search-outline" size={23} color="black"></Icon2>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Carousel navigation={props.navigation} data={dummyData} />
        <Suggestion navigation={props.navigation} />
        <WouldLike navigation={props.navigation} />
        <Trending navigation={props.navigation} />
        <Artists navigation={props.navigation} />
        <Text></Text>
        <Text></Text>
        <Text></Text>
      </ScrollView>
      <View>{renderMiniBar()}</View>
    </View>
  );
}

export default Discover;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 27,
    color: '#000',
    // margin: 10,
    // marginLeft: 15,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    height: 40,
    width: 40,
    backgroundColor: '#EEEEEE',
    left: -10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});
