import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Text, Image} from 'react-native';

const logo = require('../asset/logo.jpg');

class Splash extends React.Component {
    constructor(props) {
        super(props);
        setTimeout(() => {
            this.props.navigation.navigate("Tabs");
        }, 2500);
    }

    render() {
        return(
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />
                <Text style={styles.title}>Posty</Text>
                    <Image
                        source={logo}
                        style={styles.logo}
                    >
                    </Image>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#000',
    fontWeight: 'bold',
  },
  logo: {
    height: 220,
    width: '80%',
    marginBottom: 40,
    marginTop: 20,
  },
});

export default Splash;