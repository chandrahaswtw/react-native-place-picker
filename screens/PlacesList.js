import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from './../UI/CustomHeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import { PLACE_EXTRACT_ACTION_CREATOR } from './../Store/Actions/ActionCreators';
import { colors } from '../assets/colors';
import { AntDesign } from '@expo/vector-icons';

const PlacesList = props => {

    const placesState = useSelector(state => state.places.places);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(PLACE_EXTRACT_ACTION_CREATOR())
    }, [])

    const individualItem = item => (
        <TouchableOpacity activeOpacity={0.9} style={{ marginVertical: 10, paddingHorizontal: 10 }}>
            <View style={styles.contentOuterWrapper}>
                <View style={styles.imageWrapper}>
                    <ImageBackground style={styles.imageStyles} source={{ uri: item.info.uri }}>
                        <View>
                            <TouchableOpacity>
                                <AntDesign name="delete" size={23} color={colors.danger}></AntDesign>
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
        <View>
            <FlatList data={placesState} renderItem={dataItem => individualItem(dataItem.item)}>
            </FlatList>
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