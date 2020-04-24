import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from './../UI/CustomHeaderButton';

const PlaceMap = props => {

    const [currentLocation, setLocation] = useState({
        latitude: props.navigation.getParam("lat") ? props.navigation.getParam("lat") : 37.78825,
        longitude: props.navigation.getParam("lng") ? props.navigation.getParam("lng") : -122.4324,
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

        if (!props.navigation.getParam("readOnly")) {
            setLocation((prev) => {
                return {
                    ...prev,
                    latitude: lat,
                    longitude: lon
                }
            })
        }

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
    const readOnly = navInfo.navigation.getParam("readOnly");


    return {
        headerRight: () => {
            if(! readOnly) 
            {return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title="OK" iconName="check" onPress={() => {
                        navInfo.navigation.navigate({ routeName: "ADDPLACE", params: { latitude, longitude } })
                    }}>
                    </Item>
                </HeaderButtons>
            )}
            return
        }
    }
}

export default PlaceMap