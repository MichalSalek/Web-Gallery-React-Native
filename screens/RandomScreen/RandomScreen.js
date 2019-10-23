// node_modules
import React, {useState} from 'react';

// Service
import http from '../../services/http.service';
import getParams from '../../environment/unsplash.params';

// Style
import {s} from './random-style';

// Common
import {totalWaitingTime} from "../../common/Constants";
import colors from '../../common/Colors'
import {invertColor} from "../../plugins/invert-color";
import {APIShotsSaver} from "../../plugins/APISaver";

// React native components
import {View} from 'react-native';

// Child
import {RandomButtonGenerator} from "./RandomButtonGenerator";
import {BigPictureGenerator} from "./BigPictureGenerator";

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
            <BigPictureGenerator {...{
                resImage,
                s,
            }} />
            <RandomButtonGenerator {...{
                coloredBarColorInverted,
                s,
                coloredBarColor,
                getRandomPhoto,
                canGenerate,
                secondsRemaining
            }} />
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
