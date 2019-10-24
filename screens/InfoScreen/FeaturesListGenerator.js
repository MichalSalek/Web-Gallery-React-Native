// node_modules
import React from "react";

// React native components
import {FlatList, Text, View} from "react-native";

// Asset
import {featuresList} from "./features-list";

export const FeaturesListGenerator = ({s}) => {
    return <View style={s.textContainer}>
        <Text style={s.heading}>Solutions and featuresssss</Text>

        <FlatList
            key={"Features"}
            style={{marginTop: 20}}
            keyExtractor={(item, index) => item + index}
            data={featuresList}
            renderItem={({item, index}) => <Text
                style={{color: 'white', fontSize: 16, paddingVertical: 1}}>{`${index + 1}. ${item[1]}`}</Text>}
        />

    </View>
};
