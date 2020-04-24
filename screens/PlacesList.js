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
        <TouchableOpacity activeOpacity={0.5}  style={{ marginVertical: 10, paddingHorizontal: 10 }} onPress={()=>{props.navigation.navigate("PLACEDESC",{title : item.info.name,uri: item.info.uri, lat: item.info.lat, lng: item.info.lng})}}>
            <View style={styles.contentOuterWrapper}>
                <View style={styles.crossStyles}>
                    <TouchableOpacity onPress={deleteHandler.bind(null, item.id)}>
                        <AntDesign name="close" size={23} color={colors.danger}></AntDesign>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection : "row", alignItems : "center"}}>
                    <View style={styles.imageWrapper}>
                        <ImageBackground style={styles.imageStyles} source={{ uri: item.info.uri }}></ImageBackground>
                    </View>
                    <View style={styles.itemWrapper}>
                        <Text style={{ textAlign: "center", fontFamily: "open-sans-semiBold-italic" }}>{item.info.name}</Text>
                    </View>
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
        borderColor: colors.yarrow,
        borderWidth: 2,
        borderRadius: 3,
        padding: 10,
        position: "relative"
    },

    crossStyles: {
        position: "absolute",
        top: 5,
        right: 5
    },

    imageWrapper: {
        width: 100,
        height: 100,
        borderRadius: 100,
        borderColor: colors.simpleGrey,
        borderWidth: 1,
        overflow: "hidden",
        zIndex: 1,
        backgroundColor: "#fff",
    },

    itemWrapper: {
        flex : 1
    },

    imageStyles: {
        width: "100%",
        height: "100%",
        resizeMode: "cover"
    }

})

export default PlacesList