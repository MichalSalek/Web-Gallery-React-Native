import {FlatList, ScrollView, Text, TouchableOpacity, View} from "react-native";
import React from "react";

import {SinglePhotoThumb} from "./SinglePhotoThumb";
import colors from "../../common/Colors";
import dimensions from "../../common/Layout";


export const FlatListGenerator = ({
                                      picturesData,
                                      s,
                                      setFullScreenImage,
                                      noMorePictures,
                                      canGenerate,
                                      loadMorePhotos,
                                      secondsRemaining
                                  }) => {
    return <ScrollView>
        {picturesData ? (
            <View style={s.picturesContainer}>
                {
                    picturesData.map((el, index) => (<FlatList
                        key={index}
                        numColumns={3}
                        contentContainerStyle={s.list}
                        data={el}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => (
                            <SinglePhotoThumb data={item} s={s} pressHandler={setFullScreenImage}/>)}
                    />))
                }
                {noMorePictures ? (<View style={s.noMore}>
                        <Text
                            style={s.buttonMoreText}>{picturesData[0][0].hardcoded ? "Use the search button 👀" : "There is nothing to see anymore."}</Text>
                    </View>) :
                    (<TouchableOpacity onPress={loadMorePhotos} style={s.buttonMore}>
                        {canGenerate ?
                            <Text style={s.buttonMoreText}>Load more...</Text> :
                            <Text style={s.buttonMoreText}>Wait {secondsRemaining} seconds...</Text>}
                    </TouchableOpacity>)}
            </View>
        ) : <Text style={{marginTop: 50, color: colors.white, paddingLeft: dimensions.window.width / 5}}>We are
            looking for...</Text>}
    </ScrollView>
};
