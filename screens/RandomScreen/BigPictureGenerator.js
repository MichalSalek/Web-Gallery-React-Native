// node_modules
import React from "react";

// React native components
import {Image} from "react-native";


export const BigPictureGenerator = ({
                                        resImage,
                                        s,
                                    }) => {
    return resImage && (<Image
        style={s.image}
        source={{uri: resImage.data.urls.regular}}
    />)
};
