import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from './../UI/CustomHeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import { PLACE_EXTRACT_ACTION_CREATOR, PLACE_DELETE_ACTION_CREATOR } from './../Store/Actions/ActionCreators';
import { colors } from '../assets/colors';
import { AntDesign } from '@expo/vector-icons';

const PlacesList = props => {

    const placesState = useSelector(state => state.places.places);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(PLACE_EXTRACT_ACTION_CREATOR())
    }, [])

    const deleteHandler = (id) => {
        Alert.alert("WARNING", "Do you really want to delete this? This is irreversible !!", [
            { text: "OK", style: "cancel", onPress: () => { dispatch(PLACE_DELETE_ACTION_CREATOR(id)) } },
            { text: "CANCEL", style: "cancel" }
        ])

    }

    const individualItem = item => (
        <TouchableOpacity activeOpacity={0.9} style={{ marginVertical: 10, paddingHorizontal: 10 }}>
            <View style={styles.contentOuterWrapper}>
                <View style={styles.imageWrapper}>
                    <ImageBackground style={styles.imageStyles} source={{ uri: item.info.uri }}>
                        <View style={{ alignItems: "flex-end" }}>
                            <TouchableOpacity style={{ padding: 5 }} onPress={deleteHandler.bind(null, item.id)}>
                                <AntDesign name="close" size={23} color={colors.danger}></AntDesign>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.itemWrapper}>
                    <Text>{item.info.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={{ flex: 1 }}>
            {placesState.length ?
                <FlatList data={placesState} renderItem={dataItem => individualItem(dataItem.item)}>
                </FlatList>
                : <View style={{ flex: 1, paddingTop: 20 }}>
                    <Text style={{ textAlign: "center", fontFamily: "open-sans-semiBold-italic" }}>NO ITEMS TO SHOW. ADD THEM TO VIEW HERE.</Text>
                </View>}
        </View>
    )
}

PlacesList.navigationOptions = navInfo => {
    return {
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title="ADD" iconName="pluscircle" onPress={() => {
                        navInfo.navigation.navigate({
                            routeName: "ADDPLACE"
                        })
                    }}></Item>
                </HeaderButtons>
            )
        }
    }
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,

    },

    contentOuterWrapper: {
        minHeight: Dimensions.get("window").width * 0.6,
        borderColor: colors.yarrow,
        borderWidth: 2,
        borderRadius: 3,
        alignItems: "center",
        padding: 10
    },

    imageWrapper: {
        width: "100%",
        height: Dimensions.get("window").width * 0.4,
        borderRadius: 5,
        borderColor: colors.simpleGrey,
        borderWidth: 1,
        overflow: "hidden",
        zIndex: 1,
        backgroundColor: "#fff"
    },

    itemWrapper: {
        paddingTop: 10
    },

    imageStyles: {
        width: "100%",
        height: "100%",
        resizeMode: "cover"
    }

})

export default PlacesList