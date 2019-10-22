// node_modules
import React from 'react';

// React native components
import {TouchableHighlight, Image} from "react-native";

export const SinglePhotoThumb = ({data, s, pressHandler}) => {

    return (<TouchableHighlight onPress={() => pressHandler(data)}>
        <Image
            style={s.thumb}
            source={{uri: data.urls.thumb}}
        />
    </TouchableHighlight>)
};

