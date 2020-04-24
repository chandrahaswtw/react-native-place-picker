import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AddPlaceComponent from "../components/AddPlace/AddPlace";
import CustomHeaderButton from './../UI/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import { PLACE_ADD_ACTION_CREATOR } from './../Store/Actions/ActionCreators';
import CustomAlert from './../UI/CustomAlert';

const AddPlace = props => {

    const [placeTitle, setPlaceTitle] = useState("");
    const [imgURI, setImgURI] = useState("");
    const [location, setLocation] = useState("");

    const dispatch = useDispatch();

    const dispatchFunction = useCallback(() => {
        if (placeTitle && imgURI && location) {
            dispatch(PLACE_ADD_ACTION_CREATOR(placeTitle, imgURI, location.lat, location.lng));
            props.navigation.goBack();
        }
        else
            CustomAlert("CANNOT ADD NEW PLACE", "Title/Image/Location is missing. Kindly fill both and try to submit again");
    }, [placeTitle, imgURI,location])

    useEffect(() => {
        props.navigation.setParams({ dispatchFunction });
    }, [dispatchFunction])

    return (
            <AddPlaceComponent setPlaceTitle={setPlaceTitle}
                value={placeTitle}
                imgURI={imgURI}
                setImgURI={setImgURI}
                location={location}
                setLocation={setLocation}
                navigation={props.navigation}
            ></AddPlaceComponent>
    )
}

AddPlace.navigationOptions = navInfo => {
    return {
        headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="OK" iconName="checkcircle"
                onPress={
                    () => {
                        navInfo.navigation.getParam("dispatchFunction")();
                    }}></Item>
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({

})

export default AddPlace