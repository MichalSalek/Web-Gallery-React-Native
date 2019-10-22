// node_modules
import React from 'react';

// React native components
import {Image, TouchableHighlight, View, Text, TouchableOpacity} from "react-native";

// Icons
import {FontAwesome} from "@expo/vector-icons";

export const SinglePhotoFull = ({data, s, pressHandler}) => {

    return (<View style={s.fullImageContainer}>
        <TouchableHighlight style={s.fullImageBox} onPress={() => pressHandler(null)}>
            <Image
                style={s.fullImage}
                source={{uri: data.urls.full}}
            />
        </TouchableHighlight>
        <View style={s.fullImageButtons}>
            <TouchableOpacity style={s.button}>
                    <FontAwesome.Button right={-5} backgroundColor="transparent" size={22} name="search"/>
            </TouchableOpacity>
        </View>
    </View>)
};

