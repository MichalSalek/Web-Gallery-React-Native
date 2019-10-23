// node_modules
import React, {useState, useEffect} from 'react';

// Constants
import colors from '../../common/Colors'

// Service
import http from '../../services/http.service'
import getParams from '../../environment/unsplash.params'

// Common
import {APIShotsSaver} from "../../plugins/APISaver"
import {totalWaitingTime} from "../../common/Constants";

// Style 
import {s} from "./search-style";

// React native components
import {View, Keyboard} from 'react-native';

// Child
import {FlatListGenerator} from "./FlatListGenerator";
import {SearchBoxGenerator} from "./SearchBoxGenerator";
import {SearchButtonGenerator} from "./SearchButtonGenerator";
import {SinglePhotoFull} from "./SinglePhotoFull";

// Initial photos
import realResponse from '../../common/search-real-response'

export default function RandomScreen() {
    const [picturesData, setPicturesData] = useState([realResponse.results]);
    const [canGenerate, setCanGenerate] = useState(true);
    const [textInputValue, setTextInputValue] = useState("");
    const [secondsRemaining, setSecondsRemaining] = useState(totalWaitingTime);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState("1");
    const [noMorePictures, setNoMorePictures] = useState(true);
    const [chosenPhoto, setChosenPhoto] = useState(null);
    const [filledInput, setFilledInput] = useState(false);
    const [showSearchBox, setShowSearchBox] = useState(false);

    useEffect(() => {
        setFilledInput(!!textInputValue);
    }, [textInputValue]);

    const searchForPhotos = async () => {
        if (!canGenerate || !filledInput) {
            return null
        }
        setShowSearchBox(false);
        setNoMorePictures(false);
        setCanGenerate(false);
        Keyboard.dismiss();

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
        if (!canGenerate) {
            return null
        }
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
            <SinglePhotoFull data={chosenPhoto} s={s} pressHandler={setFullScreenImage}/>
            <FlatListGenerator {...{
                picturesData,
                s,
                setFullScreenImage,
                noMorePictures,
                canGenerate,
                loadMorePhotos,
                secondsRemaining
            }}/>
            <SearchBoxGenerator {...{
                showSearchBox,
                s,
                canGenerate,
                secondsRemaining,
                setTextInputValue,
                textInputValue,
                searchForPhotos
            }} />
            <SearchButtonGenerator {...{
                showSearchBox,
                s,
                setShowSearchBox
            }} />
        </View>
    );
}

RandomScreen.navigationOptions = {
    title: "Look for specific photos",
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

