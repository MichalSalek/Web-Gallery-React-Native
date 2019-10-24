// node_modules
import React from "react";
import {FontAwesome} from "@expo/vector-icons";

// React native components
import { Text, TouchableOpacity, View} from "react-native";

// Style
import {commonStyles} from "../../common/Style";

export const RandomButtonGenerator = ({
                                          coloredBarColorInverted,
                                          s,
                                          coloredBarColor,
                                          getRandomPhoto,
                                          canGenerate,
                                          secondsRemaining
                                      }) => {
    return <TouchableOpacity
        style={[s.button, commonStyles.circleButton, {
            backgroundColor: coloredBarColorInverted,
            borderColor: coloredBarColor
        }]}
        onPress={getRandomPhoto}>
        <View pointerEvents="none">
            {canGenerate ?
                <FontAwesome.Button right={-5} backgroundColor="transparent" color={coloredBarColor} size={22}
                                    name="retweet"/> :
                <Text style={[s.buttonText, {color: coloredBarColor}]}>{secondsRemaining}</Text>}
        </View>
    </TouchableOpacity>
};
