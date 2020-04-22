import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigator from './Navigator/RootNavigator';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import PlaceReducer from './Store/Reducers/PlaceReducer';
import thunk from 'redux-thunk';

import { init } from './helpers/db';

init()

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans-regular": require("./assets/Fonts/OpenSans-Regular.ttf"),
    "open-sans-regular-italic": require("./assets/Fonts/OpenSans-Italic.ttf"),
    "open-sans-semiBold": require("./assets/Fonts/OpenSans-SemiBold.ttf"),
    "open-sans-semiBold-italic": require("./assets/Fonts/OpenSans-SemiBoldItalic.ttf"),
    "open-sans-extraBold": require("./assets/Fonts/OpenSans-ExtraBold.ttf")
  })
}

export default function App() {

  const [isLoading, setLoading] = useState(true);

  const rootReducer = combineReducers({
    places: PlaceReducer
  })

  const store = createStore(rootReducer, applyMiddleware(thunk));

  if (isLoading) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => { setLoading(false) }}></AppLoading>
  }


  return (
    <Provider store={store}>
      <RootNavigator></RootNavigator>
    </Provider>

  );
}

const styles = StyleSheet.create({

});
