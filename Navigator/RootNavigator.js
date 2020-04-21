import React from 'react';
import {colors} from './../assets/colors';

// Importing the navigator content
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// Importing screens 
import HomeScreen from './../screens/HomeScreen';
import PlacesList from './../screens/PlacesList';
import PlaceDesc from './../screens/PlaceDesc';
import AddPlace from './../screens/AddPlace';
import PlaceMap from './../screens/PlaceMap';

// STACK NAVIGATOR STUFF
const stackNavigator = createStackNavigator({
    PLACESLIST : {
        screen : PlacesList,
        navigationOptions : {
            headerTitle : "LIST OF PLACES"
        }
    },
    PLACEDESC : {
        screen : PlaceDesc,
    },
    ADDPLACE : {
        screen : AddPlace,
        navigationOptions : {
            headerTitle : "ADD NEW PLACE"
        }
    },
    PLACEMAP : {
        screen : PlaceMap
    }
}, {
    initialRouteName : "PLACESLIST",
    defaultNavigationOptions : {
        headerStyle : {
            backgroundColor : colors.alizarin
        },
        headerTintColor : colors.light,
        headerTitleAlign : "center",
        headerTitleStyle : {
            fontFamily : "open-sans-extraBold",
            fontWeight : "200"
        }
    }
})

// SWITCH NAVIGATOR STUFF
const switchStuff = createSwitchNavigator({
    HOMESCREEN : HomeScreen,
    CONTENT : stackNavigator
})

export default createAppContainer(switchStuff)