// node_modules
import React, {useState} from 'react';
import {FontAwesome} from '@expo/vector-icons';

// Style
import colors from '../constants/Colors'

// Service
import http from '../services/http.service'
import getParams from '../environment/unsplash.params'

// React native components
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';

export default function RandomScreen() {
    const [resImage, setResImage] = useState(null);
    const [canGenerate, setCanGenerate] = useState(true);
    const [secondsRemaining, setSecondsRemaining] = useState(0);
    const totalWaitingTime = 5;

    const getRandomPhoto = async () => {
        if (!canGenerate) {
            return null
        }
        const randomPhoto = await http.get("/photos/random", getParams);
        setResImage(randomPhoto);
        console.log(randomPhoto.data);
        setCanGenerate(false);
        setSecondsRemaining(totalWaitingTime);
        setTimeout(() => {
            setCanGenerate(true);
            const secondsInterval = setInterval(() => {
                setSecondsRemaining(secondsRemaining - 1);
                console.log("interval...")
            }, 1000);
            return clearInterval(secondsInterval);
        }, totalWaitingTime * 1000);

    };

    return (
        <View style={styles.container}>

            {resImage && <Image
                style={styles.image}
                source={{uri: resImage.data.urls.regular}}
            />}
            <TouchableOpacity style={styles.button} onPress={getRandomPhoto}>
                <View pointerEvents="none">
                    {canGenerate ?
                        <FontAwesome.Button right={-5} backgroundColor="transparent" size={32} name="retweet"/> :
                        <Text>{secondsRemaining}</Text>}

                </View>
            </TouchableOpacity>
        </View>
    );
}

RandomScreen.navigationOptions = {
    title: "Let's random!",
    headerStyle: {
        backgroundColor: colors.main,
        height: 8,
    },
    headerTitleStyle: {
        color: colors.white,
        fontSize: 22,
        letterSpacing: 3,
        backgroundColor: "#111",
        borderRadius: 3,
        paddingHorizontal: 8,
    },
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.mainDarker,
        flex: 1,
        alignItems: 'center',
    },
    image: {
        flex: 10,
        width: "100%",
        height: "100%"
    },
    button: {
        borderWidth: 1,
        borderColor: '#ddd',
        alignSelf: 'flex-end',
        backgroundColor: colors.secondaryDarker,
        borderRadius: 50,
        position: 'absolute',
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        right: 10,
        bottom: 30,
    },
    buttonText: {
        color: '#fff',
        fontWeight: "600",
        fontSize: 18
    }
});
