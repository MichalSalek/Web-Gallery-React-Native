// node_modules
import React, {useState} from 'react';
import * as Permissions from 'expo-permissions';

// React native components
import {Image, TouchableHighlight, View, Text, TouchableOpacity, ToastAndroid} from "react-native";
import * as WebBrowser from 'expo-web-browser';

// Icons
import {FontAwesome} from "@expo/vector-icons";

// Common
import {commonStyles} from "../../common/Style";

export const SinglePhotoFull = ({data, s, pressHandler}) => {

    const downloadFile = () => {
        WebBrowser.openBrowserAsync(data.links.download);
    };

    const openInstagram = () => {
        WebBrowser.openBrowserAsync(`https://www.instagram.com/${data.user.instagram_username}`)
    };

    return (<View style={s.fullImageContainer}>
        <TouchableHighlight style={s.fullImageBox} onPress={() => pressHandler(null)}>
            <Image
                style={s.fullImage}
                source={{uri: data.urls.regular}}
            />
        </TouchableHighlight>

            <View style={s.fullImageBottomSection}>
                {data.description && <Text style={s.fullImageTitle}>{data.description}</Text>}
                <Text style={[s.fullImageTitle, {fontSize: 14, marginBottom: 4}]}>Author: {data.user.name}</Text>
                <View style={s.fullImageButtons}>
                    <TouchableOpacity style={commonStyles.circleButton} onPress={downloadFile}>
                        <View pointerEvents="none">
                            <FontAwesome.Button right={-5} backgroundColor="transparent" size={22} name="download"/>
                        </View>
                    </TouchableOpacity>
                    {data.user.instagram_username && <TouchableOpacity style={commonStyles.circleButton} onPress={openInstagram}>
                        <View pointerEvents="none">
                            <FontAwesome.Button right={-5} backgroundColor="transparent" size={28} name="instagram"/>
                        </View>
                    </TouchableOpacity>}
                </View>
        </View>
    </View>)
};

