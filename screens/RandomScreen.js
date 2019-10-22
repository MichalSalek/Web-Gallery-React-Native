// node_modules
import React, {useState, useEffect} from 'react';
import {FontAwesome} from '@expo/vector-icons';

// Constants
import colors from '../constants/Colors'
import dimensions from '../constants/Layout';

// Service
import http from '../services/http.service'
import getParams from '../environment/unsplash.params'

// Common
import {totalWaitingTime} from "../constants/Other";
import {invertColor} from "../plugins/invert-color";

// React native components
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import {APIShotsSaver} from "../plugins/APISaver";

export default function RandomScreen() {
    const [resImage, setResImage] = useState(null);
    const [canGenerate, setCanGenerate] = useState(true);
    const [secondsRemaining, setSecondsRemaining] = useState(totalWaitingTime);
    const [coloredBarColor, setColoredBarColor] = useState(colors.white);
    const [coloredBarColorInverted, setColoredBarColorInverted] = useState(colors.mainDarker);

    const getRandomPhoto = async () => {
        if (!canGenerate) {
            return null
        }
        setCanGenerate(false);

        const randomPhoto = await http.get("/photos/random", getParams).catch((error) => console.error(error));
        setResImage(randomPhoto);
        setColoredBarColor(randomPhoto.data.color);
        setColoredBarColorInverted(invertColor(randomPhoto.data.color));
        await APIShotsSaver(setSecondsRemaining, secondsRemaining, setCanGenerate);
    };

    return (
        <View style={styles.container}>
            <View
                style={[styles.topBar, {backgroundColor: coloredBarColor}]}/>
            {resImage && <Image
                style={styles.image}
                source={{uri: resImage.data.urls.regular}}
            />}
            <TouchableOpacity
                style={[styles.button, {backgroundColor: coloredBarColorInverted, borderColor: coloredBarColor}]}
                onPress={getRandomPhoto}>
                <View pointerEvents="none">
                    {canGenerate ?
                        <FontAwesome.Button right={-5} backgroundColor="transparent" color={coloredBarColor} size={22}
                                            name="retweet"/> :
                        <Text style={[styles.buttonText, {color: coloredBarColor}]}>{secondsRemaining}</Text>}
                </View>
            </TouchableOpacity>
            <View
                style={[styles.bottomBar, {backgroundColor: coloredBarColorInverted}]}/>
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
        backgroundColor: colors.black,
        borderRadius: 3,
        paddingHorizontal: 8,
    },
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    image: {
        flex: 10,
        width: "100%",
        height: "100%"
    },
    button: {
        borderWidth: 1,
        borderColor: colors.gray,
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
        color: colors.white,
        fontWeight: "800",
        fontSize: 20,
    },
    bottomBar: {
        width: dimensions.window.width,
        height: 13,
    },
    topBar: {
        width: dimensions.window.width,
        height: 4,
    }
});
