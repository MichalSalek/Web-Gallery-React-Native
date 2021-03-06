// node_modules
import React from "react";
import {FontAwesome} from "@expo/vector-icons";

// React native components
import {TouchableOpacity, View} from "react-native";

// Common
import {commonStyles} from "../../common/Style";

export const SearchButtonGenerator = ({
                                          showSearchBox,
                                          s,
                                          setShowSearchBox
                                      }) => {
    return (<TouchableOpacity style={[s.button, commonStyles.circleButton]}
                              onPress={() => setShowSearchBox(!showSearchBox)}>
        <View pointerEvents="none">
            <FontAwesome.Button right={-5} backgroundColor="transparent" size={22}
                                name="search"/>
        </View>
    </TouchableOpacity>)
};
