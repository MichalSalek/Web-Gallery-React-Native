// node_modules
import React, {useState, useEffect} from 'react';
import {FontAwesome} from '@expo/vector-icons';

// Common
import colors from '../common/Colors'
import dimensions from '../common/Layout';
import {invertColor} from "../plugins/invert-color";
import {randomColor} from "../plugins/random-color";

// React native components
import {View, StyleSheet, Image, Text, FlatList} from 'react-native';


export default function RandomScreen() {
    const [coloredBarColor, setColoredBarColor] = useState(colors.white);
    const [coloredBarColorInverted, setColoredBarColorInverted] = useState(colors.mainDarker);

    const featuresList = [
        {1: 'Getting a random photo'},
        {1: 'Generating tiles with pictures'},
        {1: 'Searching by keywords'},
        {1: 'Zooming and downloading a pictures'},
        {1: "Author's name"},
        {1: "Author's Instagram profile"},
        {1: '"Loading more" button'},
        {1: 'Search modal'},
        {1: 'Starts searching after text input editing'},
        {1: 'Getting base color from Random Picture for colored bars'},
        {1: 'Color randomizer'},
        {1: 'Color inverter'},
        {1: 'API shoots saver'},
        {1: 'Simple input validation'},
        {1: 'No internet checker and error boundary'},

    ];

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

            <View style={s.textContainer}>
                <Text style={s.heading}>Solutions and features</Text>
                <FlatList
                    style={{marginTop: 20}}
                    data={featuresList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => <Text
                        style={{color: 'white', fontSize: 16, paddingVertical: 1}}>{`${index + 1}. ${item[1]}`}</Text>}
                />
            </View>
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

const s = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        flex: 1,
        justifyContent: 'space-between',
    },
    textContainer: {
        paddingHorizontal: 20,
        paddingVertical: 50
    },
    heading: {
        fontSize: 20,
        color: colors.white,

    },
    bottomBar: {
        width: dimensions.window.width,
        height: 10,
        marginVertical: 10
    },
    topBar: {
        width: dimensions.window.width,
        height: 10,
        marginVertical: 6
    }
});
