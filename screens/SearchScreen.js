// node_modules
import React, {useState, useEffect} from 'react';
import {FontAwesome} from '@expo/vector-icons';

// Style
import colors from '../constants/Colors'

// Service
import http from '../services/http.service'
import getParams from '../environment/unsplash.params'

// Common
import { APIShotsSaver } from "../plugins/APISaver"
import {totalWaitingTime} from "../constants/Other";

// React native components
import {View, StyleSheet, Image, TouchableOpacity, Text, TextInput} from 'react-native';


export default function RandomScreen() {
    const [resImage, setResImage] = useState(null);
    const [canGenerate, setCanGenerate] = useState(true);
    const [textInputValue, setTextInputValue] = useState("");
    const [secondsRemaining, setSecondsRemaining] = useState(totalWaitingTime);

    const searchForPhotos = async () => {
        if (!canGenerate) {
            return null
        }
        setCanGenerate(false);

        const randomPhoto = await http.get(`/search/photos?page=1&query=${textInputValue}`, getParams).catch((error) => console.error(error));
        // setResImage(randomPhoto);
        console.log(randomPhoto)

        await APIShotsSaver(setSecondsRemaining, secondsRemaining, setCanGenerate);
    };

    return (
        <View style={styles.container}>
            {resImage && <Image
                style={styles.image}
                source={{uri: resImage.data.urls.regular}}
            />}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => setTextInputValue(text)}
                    value={textInputValue}
                />

                <TouchableOpacity style={styles.button} onPress={searchForPhotos}>
                    <View pointerEvents="none">
                        {canGenerate ?
                            <Text style={styles.buttonText}>Search</Text> :
                            <Text style={styles.buttonText}>{secondsRemaining}</Text>}
                    </View>
                </TouchableOpacity>


            </View>
        </View>
    );
}

RandomScreen.navigationOptions = {
    title: "Look for specific photos",
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
        justifyContent: 'flex-end'
    },
    image: {
        flex: 10,
        width: "100%",
        height: "100%"
    },
    searchContainer: {
        flexDirection: "row",
        marginBottom: 25,
        marginTop: 10,
        width: "90%"
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.gray,
        borderStyle: "solid",
        backgroundColor: colors.white,
        paddingHorizontal: 10,

    },
    button: {
        backgroundColor: colors.secondaryDarker,
        width: 80,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 1,
    },
    buttonText: {
        color: colors.white,
        fontWeight: "600",
        fontSize: 18,
    }
});
