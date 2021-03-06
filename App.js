// node_modules
import React, {useState, useEffect} from 'react';

// React native components
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {AppLoading} from 'expo';
import {Asset} from 'expo-asset';

// Navigator
import AppNavigator from './navigation/AppNavigator';

// Plugins
import isInternetChecker from './plugins/network-checker';

// Error boundary
import NoInternetErrorBoundary from "./components/NoInternetErrorBoundary";

export default (props) => {
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const [isInternetConnection, setIsInternetConnection] = useState(true);

    // Check on run that the internet connection working
    useEffect(() => {
        const networkChecker = setInterval(async () => {
            setIsInternetConnection(await isInternetChecker());
        }, 5000);

        // Unsubscription on unmount
        return () => clearInterval(networkChecker);
    }, []);

    if (!isLoadingComplete) {
        return (
            <AppLoading
                startAsync={loadResourcesAsync}
                onError={handleLoadingError}
                onFinish={() => handleFinishLoading(setLoadingComplete)}
            />
        );
    } else {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                {isInternetConnection ? <AppNavigator/> : <NoInternetErrorBoundary/>}
            </View>
        );
    }
}

async function loadResourcesAsync() {
    await Promise.all([
        Asset.loadAsync([
        ]),
    ]);
}

function handleLoadingError(error) {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
    setLoadingComplete(true);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
