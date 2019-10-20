// node_modules
import React from 'react';

// React native components
import {View, StyleSheet, Text} from 'react-native';

export default () => (
    <View style={styles.container}>
        <Text style={styles.text}> Check your internet connection please. {"\n"} It is necessary to run this
            app. </Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    }
});
