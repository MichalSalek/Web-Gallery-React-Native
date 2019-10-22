// node_modules
import React, {useState, useEffect} from 'react';
import {FontAwesome} from '@expo/vector-icons';

// Service
import http from '../services/http.service'
import getParams from '../environment/unsplash.params'

// Common
import {totalWaitingTime} from "../common/Constants";
import colors from '../common/Colors'
import dimensions from '../common/Layout';
import {invertColor} from "../plugins/invert-color";

// React native components
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import {APIShotsSaver} from "../plugins/APISaver";
import {commonStyles} from "../common/Style";

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
        if (randomPhoto.data) {
            setColoredBarColor(randomPhoto.data.color);
            setColoredBarColorInverted(invertColor(randomPhoto.data.color));
        }
        await APIShotsSaver(setSecondsRemaining, secondsRemaining, setCanGenerate);
    };

    return (
        <View style={s.container}>
            <View
                style={[s.topBar, {backgroundColor: coloredBarColor}]}/>
            {resImage && (<Image
                style={s.image}
                source={{uri: resImage.data.urls.regular}}
            />)}
            <TouchableOpacity
                style={[s.button, commonStyles.circleButton, {
                    backgroundColor: coloredBarColorInverted,
                    borderColor: coloredBarColor
                }]}
                onPress={getRandomPhoto}>
                <View pointerEvents="none">
                    {canGenerate ?
                        <FontAwesome.Button right={-5} backgroundColor="transparent" color={coloredBarColor} size={22}
                                            name="retweet"/> :
                        <Text style={[s.buttonText, {color: coloredBarColor}]}>{secondsRemaining}</Text>}
                </View>
            </TouchableOpacity>
            <View
                style={[s.bottomBar, {backgroundColor: coloredBarColorInverted}]}/>
        </View>
    );
}

RandomScreen.navigationOptions = {
    title: "Let's random!",
    headerStyle: {
        backgroundColor: colors.main,
        height: 25,
    },
    headerTitleStyle: {
        color: colors.white,
        fontSize: 20,
        letterSpacing: 3,
        backgroundColor: colors.black,
        borderRadius: 3,
        paddingHorizontal: 8,
    },
};

const s = StyleSheet.create({
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
        position: 'absolute',
        right: 10,
        bottom: 55,
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
