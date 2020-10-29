import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    ScrollView,
    Image,
    Dimensions,
    StyleSheet,
    Button,
} from "react-native";
import {FlatList} from 'react-native-gesture-handler';
import { suggestData } from '../data/Data';
import { connect } from "react-redux";
import { setStatus } from '../action/status';
import { currentSong } from '../action/current';

const { width } = Dimensions.get("window");
const index = Math.floor(Math.random() * 7);

class Library extends React.Component {
    
    playSong = () => {
        props.navigation.navigate('Player');
    }

    separator = () => {
        return <View style={{height: 10, backgroundColor: '#fff'}} />;
    }

    componentDidMount() {
        console.log(index);
    }

    state = {
        active: 0,
        xTabOne: 0,
        xTabTwo: 0,
        translateX: new Animated.Value(0),
        translateXTabOne: new Animated.Value(0),
        translateXTabTwo: new Animated.Value(width),
        translateY: -1000
    };

    handleSlide = type => {
        let {
            active,
            xTabOne,
            xTabTwo,
            translateX,
            translateXTabOne,
            translateXTabTwo
        } = this.state;
        Animated.spring(translateX, {
            toValue: type,
            duration: 100
        }).start();
        if (active === 0) {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: 0,
                    duration: 100
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: width,
                    duration: 100
                }).start()
            ]);
        } else {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: -width,
                    duration: 100
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: 0,
                    duration: 100
                }).start()
            ]);
        }
    };

    render() {
        let {
            xTabOne,
            xTabTwo,
            translateX,
            active,
            translateXTabOne,
            translateXTabTwo,
            translateY
        } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.library}>Thư viện</Text>
                <View
                    style={{
                        width: "99%",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 5,
                            marginBottom: 20,
                            height: 33,
                            position: "relative"
                        }}
                    >
                        <Animated.View
                            style={{
                                position: "absolute",
                                width: "50%",
                                height: "100%",
                                top: 0,
                                left: 0,
                                backgroundColor: "#004400",
                                borderRadius: 4,
                                transform: [
                                    {
                                        translateX
                                    }
                                ]
                            }}
                        />
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: 1,
                                borderColor: "#004400",
                                borderRadius: 4,
                                borderRightWidth: 0,
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0
                            }}
                            onLayout={event =>
                                this.setState({
                                    xTabOne: event.nativeEvent.layout.x
                                })
                            }
                            onPress={() =>
                                this.setState({ active: 0 }, () =>
                                    this.handleSlide(xTabOne)
                                )
                            }
                        >
                            <Text
                                style={{
                                    color: active === 0 ? "#fff" : "#000"
                                }}
                            >
                                Bài hát
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: 1,
                                borderColor: "#000",
                                borderRadius: 4,
                                borderLeftWidth: 0,
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0
                            }}
                            onLayout={event =>
                                this.setState({
                                    xTabTwo: event.nativeEvent.layout.x
                                })
                            }
                            onPress={() =>
                                this.setState({ active: 1 }, () =>
                                    this.handleSlide(xTabTwo)
                                )
                            }
                        >
                            <Text
                                style={{
                                    color: active === 1 ? "#fff" : "#000"
                                }}
                            >
                                Playlist
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView>
                        <Animated.View
                            style={{
                                // justifyContent: "center",
                                // alignItems: "center",
                                transform: [
                                    {
                                        translateX: translateXTabOne
                                    }
                                ]
                            }}
                            onLayout={event =>
                                this.setState({
                                    translateY: event.nativeEvent.layout.height
                                })
                            }
                        >

                            <View style={{ marginTop: 10}}>
                                    <TouchableOpacity
                                        style={{
                                            flex: 1,
                                            height: 40,
                                            width: 120,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderColor: "#000",
                                            borderRadius: 100,
                                            backgroundColor: "#004400",
                                            left: 115,
                                            elevation: 10,
                                            top: -10,
                                        }}
                                        onPress={() => {
                                            this.props.currentSong({
                                                img: suggestData[index].img,
                                                title: suggestData[index].title,
                                                artist: suggestData[index].artist,
                                                url: suggestData[index].url,
                                                trackLength: suggestData[index].trackLength,
                                                id: suggestData[index].id,
                                                timeRemaining: suggestData[index].duration,
                                            })          
                                            playSong();
                                        }}
                                    >
                                        <Text style={{color: 'white'}}>Phát bất kỳ</Text>
                                    </TouchableOpacity>
                                <FlatList style={{padding: 0, paddingTop: 0}}
                                    data = {suggestData}
                                    showsVerticalScrollIndicator={false}
                                    ItemSeparatorComponent = {() => this.separator()}
                                    renderItem = {({item, index}) => {
                                        return (
                                            <TouchableOpacity 
                                            style={styles.songContainer}
                                            onPress = {() => {
                                                playSong();
                                                this.props.setStatus(true);
                                                this.props.currentSong(
                                                    {
                                                        img: item.img,   
                                                        title: item.title,
                                                        artist: item.artist,
                                                        url: item.url,
                                                        trackLength: item.trackLength,
                                                        id: item.id,
                                                        timeRemaining: item.duration,
                                                    }
                                                )
                                                }}
                                            >
                                                <View style={{flexDirection: 'row'}}>
                                                    <Image  
                                                    source = {item.img}
                                                    style = {styles.img}
                                                />
                                                    <View style={styles.dataContainer}>
                                                        <Text style={styles.songTitle}>{item.title}</Text>
                                                        <Text style={styles.artist}>{item.artist}</Text>
                                                        <Text style={styles.duration}>{item.duration}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }}
                                />
                            </View>
                        </Animated.View>

                        <Animated.View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                transform: [
                                    {
                                        translateX: translateXTabTwo
                                    },
                                    {
                                        translateY: -translateY
                                    }
                                ]
                            }}
                        >
                            <Text>abc</Text>
                            <View style={{ marginTop: 20 }}>
                                <Image
                                    source={require("../asset/circles2.jpg")}
                                    style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 15
                                    }}
                                />
                            </View>
                        </Animated.View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const mapDispatchToProps = () => {
    return {
        setStatus: setStatus,
        currentSong: currentSong,
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.status.playing
    }
}

const styles = StyleSheet.create({

    library: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#000',
        margin: 10,
        marginLeft: 10,
    },
    songContainer: {
        width: width,
        height: 70,
        flexDirection: 'row',
    }, 
    img: {
        height: 65,
        width: 65,
        borderRadius: 5,
    },
    dataContainer: {
        paddingLeft: 10,
        width: width - 70,
    },
    songTitle: {
        fontSize: 16,
        color: '#000'
    },
    artist: {
        fontSize: 12,
        color: 'gray',
    },
    duration: {
        fontSize: 14,
        color: 'gray',
    },
    button: {
        color: "#004400",
    }
});

export default connect(mapStateToProps, mapDispatchToProps())(Library);