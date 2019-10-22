// node_modules
import React from 'react';

// React native components
import {Image, TouchableHighlight, View, Text, TouchableOpacity} from "react-native";

// Icons
import {FontAwesome} from "@expo/vector-icons";

// Common
import {commonStyles} from "../../common/Style";

export const SinglePhotoFull = ({data, s, pressHandler}) => {

    return (<View style={s.fullImageContainer}>
        <TouchableHighlight style={s.fullImageBox} onPress={() => pressHandler(null)}>
            <Image
                style={s.fullImage}
                source={{uri: data.urls.full}}
            />
        </TouchableHighlight>
        <View style={s.fullImageBottomSection}>
            <Text style={s.fullImageTitle}>{data.description}</Text>
            <View style={s.fullImageButtons}>
                <TouchableOpacity style={commonStyles.circleButton}>
                    <FontAwesome.Button right={-5} backgroundColor="transparent" size={22} name="download"/>
                </TouchableOpacity>
            </View>
        </View>
    </View>)
};

