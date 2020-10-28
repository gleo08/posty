import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { Surface } from 'react-native-paper'

function Profile() {
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Surface style={styles.surface}>
                    <Image
                        source = {require('../asset/final.jpg')}
                        style = {styles.img}
                    />
                </Surface>
                <View style={styles.dataContainer}> 
                    <Text style={styles.name}>InGameLeader</Text>
                </View>
            </View>
        </View>
    )
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        height: 80,
        backgroundColor: "#004400",
    },

    info: {
        padding: 10,
        flexDirection: 'row',
    },

    surface: {
        height: 60,
        width: 60,
        borderRadius: 49,
        elevation: 15,
        overflow: 'hidden'
    },

    img: {
        height: 60,
        width: 60,
    },

    dataContainer: {
        paddingLeft: 10,
    },

    name: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        bottom: -18,
    }
})
