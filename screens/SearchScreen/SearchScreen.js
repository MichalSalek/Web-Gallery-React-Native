// node_modules
import React, {useState, useEffect} from 'react';
import {FontAwesome} from '@expo/vector-icons';

// Constants
import colors from '../../common/Colors'
import dimensions from '../../common/Layout';

// Service
import http from '../../services/http.service'
import getParams from '../../environment/unsplash.params'

// Common
import {APIShotsSaver} from "../../plugins/APISaver"
import {totalWaitingTime} from "../../common/Constants";

// Style 
import {s} from "./search-style";

// React native components
import {View, TouchableOpacity, Text, TextInput, ScrollView, FlatList, Image} from 'react-native';

// Child
import {SinglePhotoThumb} from "./SinglePhotoThumb";

import realResponse from '../../helpers/search-real-response'
import {SinglePhotoFull} from "./SinglePhotoFull";
import {commonStyles} from "../../common/Style";

export default function RandomScreen() {

    const [picturesData, setPicturesData] = useState([realResponse.results]);
    const [canGenerate, setCanGenerate] = useState(true);
    const [textInputValue, setTextInputValue] = useState("");
    const [secondsRemaining, setSecondsRemaining] = useState(totalWaitingTime);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState("1");
    const [noMorePictures, setNoMorePictures] = useState(false);
    const [chosenPhoto, setChosenPhoto] = useState(null);

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

        if (picturesData.length === 0) {
            setTotalPages(0);
            setNoMorePictures(true);
        }

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

    const setFullScreenImage = (imgData) => setChosenPhoto(imgData);

    return (<View style={s.container}>
            {chosenPhoto && <SinglePhotoFull data={chosenPhoto} s={s} pressHandler={setFullScreenImage} />}
            <ScrollView>
                {picturesData ? (
                    <View style={s.picturesContainer}>
                        {
                            picturesData.map((el, index) => (<FlatList
                                key={index}
                                numColumns={3}
                                contentContainerStyle={s.list}
                                data={el}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item}) => (
                                    <SinglePhotoThumb data={item} s={s} pressHandler={setFullScreenImage}/>)}
                            />))
                        }
                        {noMorePictures ? (<View style={s.noMore}>
                                <Text style={s.buttonMoreText}>There is nothing to see anymore.</Text>
                            </View>) :
                            (<TouchableOpacity onPress={loadMorePhotos} style={s.buttonMore}>
                                {canGenerate ?
                                    <Text style={s.buttonMoreText}>Load more...</Text> :
                                    <Text style={s.buttonMoreText}>{secondsRemaining}</Text>}
                            </TouchableOpacity>)}
                    </View>
                ) : <Text style={{marginTop: 50, color: colors.white, paddingLeft: dimensions.window.width / 5}}>We are
                    looking for...</Text>}
            </ScrollView>
            <View style={s.searchContainer}>
                <TextInput
                    style={s.textInput}
                    onChangeText={text => setTextInputValue(text)}
                    value={textInputValue}
                />
            </View>
            <TouchableOpacity style={[s.button, commonStyles.circleButton]} onPress={searchForPhotos}>
                <View pointerEvents="none">
                    {canGenerate ?
                        <FontAwesome.Button right={-5} backgroundColor="transparent" size={22}
                                            name="search"/> :
                        <Text style={s.buttonText}>{secondsRemaining}</Text>}
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
        fontSize: 20,
        letterSpacing: 3,
        backgroundColor: colors.black,
        borderRadius: 3,
        paddingHorizontal: 8,
    },
};

