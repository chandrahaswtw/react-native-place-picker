import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from './../UI/CustomHeaderButton';

const PlaceMap = props => {

    const [currentLocation, setLocation] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    const coordinate = {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude
    }

    useEffect(() => {
        props.navigation.setParams({
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude
        })
    }, [currentLocation])

    const onRegionChangeHandler = (e) => {

        const lat = e.nativeEvent.coordinate.latitude;
        const lon = e.nativeEvent.coordinate.longitude;

        setLocation((prev) => {
            return {
                ...prev,
                latitude: lat,
                longitude: lon
            }
        })
    }


    return (
        <MapView region={currentLocation} style={{ flex: 1 }} onPress={onRegionChangeHandler}>
            <Marker title="MY LOCATION" coordinate={coordinate}>
            </Marker>
        </MapView>
    )
}

const styles = StyleSheet.create({

})

PlaceMap.navigationOptions = navInfo => {
    const latitude = navInfo.navigation.getParam("latitude");
    const longitude = navInfo.navigation.getParam("longitude");

    return {
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title="OK" iconName="check" onPress={() => {
                        navInfo.navigation.navigate({ routeName: "ADDPLACE", params: { latitude, longitude } })
                    }}>
                    </Item>
                </HeaderButtons>
            )
        }
    }
}

export default PlaceMap