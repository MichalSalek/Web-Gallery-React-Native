// node_modules
import React from 'react';
import {Platform, Text} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

// Screens
import HomeScreen from '../screens/HomeScreen';
import RandomScreen from '../screens/RandomScreen';
import SearchScreen from '../screens/SearchScreen';

// Style
import colors from '../constants/Colors'

const config = Platform.select({
    web: {headerMode: 'screen'},
    default: {},
});

const bottomBarStyles = {
    activeTintColor: colors.secondary,
    inactiveTintColor: 'white',
    labelStyle: {
        fontSize: 15,
        fontWeight: "800",
        marginBottom: 15,
        backgroundColor: "#111",
        padding: 5,
    },
    style: {
        backgroundColor: colors.main,
        height: 30,

    },
    showIcon: false,
};

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
    },
    config
);

HomeStack.navigationOptions = {

    tabBarLabel: 'Home',
    tabBarOptions: {...bottomBarStyles}
};

HomeStack.path = '';

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
    RandomStack,
    HomeStack,
    SearchStack,
});

tabNavigator.path = '';

export default tabNavigator;
