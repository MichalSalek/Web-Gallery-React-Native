import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import React, { useState, useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

// Navigator
import AppNavigator from './navigation/AppNavigator';

// Plugins
import isInternet from './plugins/network-checker';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);


  useEffect(() => {
    isInternet();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
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
        <StatusBar hidden={true} />
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
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
