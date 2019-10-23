import {FlatList, Text, View, ScrollView} from "react-native";
import React from "react";

import {featuresList} from "./features-list";

export const FeaturesListGenerator = ({
                                          s,
                                      }) => {
    return <View style={s.textContainer}>
        <Text style={s.heading}>Solutions and features</Text>
        <View><ScrollView>
            <FlatList
                style={{marginTop: 20}}
                data={featuresList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => <Text
                    style={{color: 'white', fontSize: 16, paddingVertical: 1}}>{`${index + 1}. ${item[1]}`}</Text>}
            />
        </ScrollView></View>
    </View>
};
