import {Image} from "react-native";
import React from "react";


export const BigPictureGenerator = ({
                                        resImage,
                                        s,
                                    }) => {
    return resImage && (<Image
        style={s.image}
        source={{uri: resImage.data.urls.regular}}
    />)
};
