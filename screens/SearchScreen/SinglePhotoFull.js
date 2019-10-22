// node_modules
import React from 'react';

// React native components
import {Image, TouchableHighlight, View} from "react-native";

export const SinglePhotoFull = ({data, s, pressHandler}) => {

    return (<View>
        <TouchableHighlight style={s.fullImage} onPress={() => pressHandler(null)}>
            <Image
                style={s.fullImage}
                source={{uri: data.urls.full}}
            />
        </TouchableHighlight>
    </View>)
};

