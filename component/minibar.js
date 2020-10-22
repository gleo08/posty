import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';



function MiniBar() {
    const status = useSelector(state => state.status.playing);

    const dispatch = useDispatch();

    const img = useSelector(state => state.current.img)
    const description = useSelector(state => state.current.description)
    const title = useSelector(state => state.current.title)
    return (
        <View style={styles.container}>
            <Image source={img} style={styles.image}/>
            <View style={styles.rightContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: -15,
        backgroundColor: '#EEEEEE',
        flexDirection: 'row',
        margin: 15,
        left: -15,
        width: '100%',
    },
    image: {
        width: 50,
        height: 58,
    },
    rightContainer: {
        justifyContent: 'space-around',
        marginLeft: 15,
    },
    title: {
        color: 'black',
        fontSize: 15,
    },
    description: {
        color: 'black',
        fontSize: 10,
    }

})

export default MiniBar;