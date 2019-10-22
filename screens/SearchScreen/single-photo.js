// node_modules
import React, {useState, useEffect} from 'react';

// React native components
import {TouchableHighlight, Image} from "react-native";

export const SinglePhoto = ({data, s}) => {
    console.log(data);

    return (
        <TouchableHighlight>
            <Image
                style={s.thumb}
                source={{uri: data.urls.thumb}}
            />
        </TouchableHighlight>
    )
};

