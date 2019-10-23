import {Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";


export const SearchBoxGenerator = ({
                                       showSearchBox,
                                       s,
                                       canGenerate,
                                       secondsRemaining,
                                       setTextInputValue,
                                       textInputValue,
                                       searchForPhotos
                                   }) => {
    return showSearchBox ? (<View style={s.searchContainer}>
        <TextInput
            style={s.textInput}
            onChangeText={text => setTextInputValue(text)}
            value={textInputValue}
            autoFocus={true}
            onSubmitEditing={searchForPhotos}
            placeholder={"Car, nature, colors..."}
        />
        <TouchableOpacity style={s.buttonSearchAction}
                          onPress={searchForPhotos}>
            <Text style={s.buttonText}>  {canGenerate ? "SEARCH" : secondsRemaining}</Text>
        </TouchableOpacity>
    </View>) : null
};
