import React, { useState } from 'react';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, View, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { setStatus } from '../action/status';

function MiniBar() {
    const status = useSelector(state => state.status.playing);
    const dispatch = useDispatch();

    const [state, setState] = useState({
        heart: false
    })

    renderHeart = () => {
        return state.heart == true ? (
            <Icon name="cards-heart" size={23}/>
        ) : (
            <Icon2 name="heart-outline" size={23} />
        )
    }
    renderPlayPausePlayer = () => {
        return status == true ? (
            <Icon2 name="pause-outline" size={23} ></Icon2>
        ) : (
            <Icon2 name="play-outline" size={23} ></Icon2>
        );
  }
    const img = useSelector(state => state.current.img)
    const description = useSelector(state => state.current.description)
    const title = useSelector(state => state.current.title)
    return (
        <View style={styles.container}>
                <Image source={img} style={styles.image}/>
                <View style={styles.rightContainer}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.description}>{description}</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity
                        onPress={() => {
                            heart = state.heart;
                            setState({heart: !heart});
                        }}
                    >
                        {renderHeart()}
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {
                            dispatch(setStatus(!status));
                        }}
                    >
                        {renderPlayPausePlayer()}
                    </TouchableOpacity>
                 </View>
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
        left: 10,
        width: 50,
        height: 50,
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nameContainer: {
        flexDirection: 'column',
        alignContent: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 100,
        justifyContent: 'space-around'
    },
    title: {
        color: 'black',
        fontSize: 15,
        bottom: -5,
        left: 14,
    },
    description: {
        color: 'gray',
        fontSize: 11,
        bottom: -7,
        left: 15,
    }

})

export default MiniBar;