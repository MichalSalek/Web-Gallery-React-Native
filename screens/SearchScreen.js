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
import {APIShotsSaver} from "../plugins/APISaver"
import {totalWaitingTime} from "../constants/Other";

// React native components
import {View, StyleSheet, Image, TouchableOpacity, Text, TextInput, ScrollView, FlatList} from 'react-native';


export default function RandomScreen() {

    const [picturesData, setPicturesData] = useState(null);
    const [canGenerate, setCanGenerate] = useState(true);
    const [textInputValue, setTextInputValue] = useState("");
    const [secondsRemaining, setSecondsRemaining] = useState(totalWaitingTime);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState("1");
    const [noMorePictures, setNoMorePictures] = useState(false);

    const searchForPhotos = async () => {
        if (!canGenerate) {
            return null
        }
        setNoMorePictures(false);
        setCanGenerate(false);

        const rawResponse = await http.get(`/search/photos?page=1&per_page=30&orientation=portrait&query=${textInputValue}`, getParams).catch((error) => console.error(error));

        const picturesData = rawResponse.data.results;
        setTotalPages(String(rawResponse.data.total_pages));
        setPicturesData([picturesData]);

        if (String(rawResponse.data.total_pages) === "1") {
            setNoMorePictures(true);
        }

        await APIShotsSaver(setSecondsRemaining, secondsRemaining, setCanGenerate);
    };

    const loadMorePhotos = async () => {
        if (totalPages === String(page)) {
            setNoMorePictures(true);
            return null;
        }
        setCanGenerate(false);
        const rawResponse = await http.get(`/search/photos?page=${page + 1}&per_page=30&orientation=portrait&query=${textInputValue}`, getParams).catch((error) => console.error(error));
        setPage(page + 1);
        if (typeof picturesData !== "object") {
            return null
        }
        const previousState = Object.assign(picturesData);
        previousState.push(rawResponse.data.results);
        setPicturesData(previousState);

        await APIShotsSaver(setSecondsRemaining, secondsRemaining, setCanGenerate);
    };

    return (<View style={styles.container}>
            <ScrollView>
                {picturesData ? (
                    <View style={styles.picturesContainer}>
                        {
                            picturesData.map((el, index) => (<FlatList
                                key={index}
                                numColumns={3}
                                contentContainerStyle={styles.list}
                                data={el}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item}) => (<Image
                                    style={styles.thumb}
                                    source={{uri: item.urls.thumb}}
                                />)}
                            />))
                        }
                        {noMorePictures ? (<View style={styles.noMore}>
                                <Text style={styles.buttonMoreText}>There is nothing to see anymore.</Text>
                            </View>) :
                            (<TouchableOpacity onPress={loadMorePhotos} style={styles.buttonMore}>
                                {canGenerate ?
                                    <Text style={styles.buttonMoreText}>Load more...</Text> :
                                    <Text style={styles.buttonMoreText}>{secondsRemaining}</Text>}
                            </TouchableOpacity>)}
                    </View>
                ) : <Text style={{marginTop: 50, color: colors.white, paddingLeft: dimensions.window.width / 5}}>We are
                    looking for...</Text>}
            </ScrollView>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => setTextInputValue(text)}
                    value={textInputValue}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={searchForPhotos}>
                <View pointerEvents="none">
                    {canGenerate ?
                        <FontAwesome.Button right={-5} backgroundColor="transparent" size={22}
                                            name="search"/> :
                        <Text style={styles.buttonText}>{secondsRemaining}</Text>}
                </View>
            </TouchableOpacity>
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
    },
    image: {
        flex: 10,
        width: "100%",
        height: "100%",
    },
    list: {
        marginTop: 22,

        alignItems: 'center',
    },
    thumb: {
        width: dimensions.window.width / 3 - 10,
        height: dimensions.window.height / 5,
        marginHorizontal: 5,
        marginVertical: 5,
    },
    searchContainer: {
        flexDirection: "row",
        width: dimensions.window.width,
        height: 30,
        position: 'absolute',
        bottom: 13,
        paddingHorizontal: dimensions.window.width / 4,
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.gray,
        borderStyle: "solid",
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        fontSize: 20,
        fontWeight: '600',
    },
    button: {
        borderWidth: 1,
        borderColor: colors.gray,
        alignSelf: 'flex-end',
        backgroundColor: colors.mainDarker,
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
        fontWeight: "600",
        fontSize: 18,
    },
    picturesContainer: {
        flex: 1,
        marginBottom: dimensions.window.height / 10,
        alignItems: "center",
    },
    buttonMore: {
        backgroundColor: colors.main,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
        width: dimensions.window.width / 3,
        paddingVertical: 5,
        borderRadius: 5
    },
    noMore: {
        backgroundColor: colors.secondaryDarker,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    buttonMoreText: {
        color: colors.white,
        fontWeight: '600',
        fontSize: 18,
        padding: 5,

    }
});
