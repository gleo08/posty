import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

class Home extends Component {
  state = {};
  render() {
    return <View style={styles.container} />;
  }
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