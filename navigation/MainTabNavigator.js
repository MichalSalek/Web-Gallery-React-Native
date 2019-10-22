// node_modules
import React from 'react';
import {Platform, Text} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

// Screens
import InfoScreen from '../screens/InfoScreen';
import RandomScreen from '../screens/RandomScreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';

// Style
import colors from '../common/Colors'

const config = Platform.select({
    web: {headerMode: 'screen'},
    default: {},
});

const bottomBarStyles = {
    activeTintColor: colors.secondary,
    inactiveTintColor: colors.white,
    labelStyle: {
        fontSize: 17,
        fontWeight: "800",
        marginBottom: 15,
        backgroundColor: colors.black,
        paddingTop: 2,
        paddingBottom: 6,
    },
    style: {
        backgroundColor: colors.main,
        height: 37,

    },
    showIcon: false,
};

const InfoStack = createStackNavigator(
    {
        Home: InfoScreen,
    },
    config
);

InfoStack.navigationOptions = {

    tabBarLabel: 'Info',
    tabBarOptions: {...bottomBarStyles}
};

InfoStack.path = '';

const RandomStack = createStackNavigator(
    {
        Random: RandomScreen,
    },
    config
);

RandomStack.navigationOptions = {
    tabBarLabel: 'Random',
    tabBarOptions: {...bottomBarStyles}
};

RandomStack.path = '';

const SearchStack = createStackNavigator(
    {
        Search: SearchScreen,
    },
    config
);

SearchStack.navigationOptions = {
    tabBarLabel: 'Search',
    tabBarOptions: {...bottomBarStyles}
};

SearchStack.path = '';

const tabNavigator = createBottomTabNavigator({
    SearchStack,
    RandomStack,
    InfoStack,
});

tabNavigator.path = '';

export default tabNavigator;
