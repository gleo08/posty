import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { useSelector } from 'react-redux';

function Home () {

  const status = useSelector(state => state.status.playing);
  console.log(status);
  const showing = useSelector(state => state.current.showing);
  console.log(showing);
    return (
      <View style={styles.container}>
        {/* <Text>{status}</Text> */}
      </View>
    )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// import React, {Component} from 'react';
// import {View, StyleSheet, Text} from 'react-native';
// import Banner from '../component/banner';

// class Home extends Component {
//     constructor(props) {
//         super(props);
//     }
//     render () {
//         return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Posty</Text>
//             <Banner navigation = {this.props.navigation} />
//         </View>
//         )
//     }
// }

// export default Home;