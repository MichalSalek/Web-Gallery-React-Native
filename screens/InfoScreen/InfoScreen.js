// node_modules
import React, {useState, useEffect} from 'react';

// Style
import {s} from './info-style';

// Common
import colors from '../../common/Colors'
import {invertColor} from "../../plugins/invert-color";
import {randomColor} from "../../plugins/random-color";

// React native components
import {View} from 'react-native';

// Child
import {FeaturesListGenerator} from "./FeaturesListGenerator";

export default function RandomScreen() {
    const [coloredBarColor, setColoredBarColor] = useState(colors.white);
    const [coloredBarColorInverted, setColoredBarColorInverted] = useState(colors.mainDarker);

    useEffect(() => {
        const randomizeColors = setInterval(() => {
            const newColor = randomColor();
            const invertedColor = invertColor(newColor);

            setColoredBarColor(newColor);
            setColoredBarColorInverted(invertedColor);
        }, 3500);

        return () => {
            clearInterval(randomizeColors)
        };
    }, []);

    return (
        <View style={s.container}>
            <View
                style={[s.topBar, {backgroundColor: coloredBarColor}]}/>
            <View
                style={[s.bottomBar, {backgroundColor: coloredBarColorInverted}]}/>
            <FeaturesListGenerator {...{s}} />
            <View
                style={[s.bottomBar, {backgroundColor: coloredBarColorInverted}]}/>
            <View
                style={[s.topBar, {backgroundColor: coloredBarColor}]}/>
</View>
    );
}

RandomScreen.navigationOptions = {
    title: "App dev info",
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
