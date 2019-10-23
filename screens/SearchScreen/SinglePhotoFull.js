// node_modules
import React from 'react';

// React native components
import {Image, TouchableHighlight, View, Text, TouchableOpacity} from "react-native";
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

    return (data && <View style={s.fullImageContainer}>
        <TouchableHighlight style={s.fullImageBox} onPress={() => pressHandler(null)}>
            <View>
                <Text style={{
                    position: 'absolute',
                    top: 90,
                    left: 25,
                    zIndex: 0,
                    color: "#f5f5f5",
                    fontSize: 16
                }}>Loading higher resolution...</Text>
                <Image
                    style={s.fullImage}
                    source={{uri: data.urls.regular}}
                />
            </View>
        </TouchableHighlight>

        <View style={s.fullImageBottomSection}>
            {data.description && <Text style={[s.fullImageTitle, {fontSize: 11}]}>{data.description}</Text>}
            <Text style={[s.fullImageTitle, {marginBottom: 4}]}>Author: {data.user.name}</Text>
            <View style={s.fullImageButtons}>
                <TouchableOpacity style={commonStyles.circleButton} onPress={downloadFile}>
                    <View pointerEvents="none">
                        <FontAwesome.Button right={-5} backgroundColor="transparent" size={22} name="download"/>
                    </View>
                </TouchableOpacity>
                {data.user.instagram_username ?
                    (<TouchableOpacity style={commonStyles.circleButton} onPress={openInstagram}>
                        <View pointerEvents="none">
                            <FontAwesome.Button right={-5} backgroundColor="transparent" size={28} name="instagram"/>
                        </View>
                    </TouchableOpacity>) : null}
            </View>
        </View>
    </View>)
};

