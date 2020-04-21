import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from './../UI/CustomHeaderButton';
import { useSelector } from 'react-redux';
import { colors } from '../assets/colors';

const PlacesList = props => {

    const placesState = useSelector(state => state.places.places);


    const individualItem = item => (
        <TouchableOpacity activeOpacity={0.9} style= {{marginVertical : 10, paddingHorizontal: 10}}>
            <View style={styles.imageOuterWrapper}>
                <View style={styles.imageWrapper}>
                    <Image style={styles.imageStyles} source={{uri : item.info.uri}}></Image>
                </View>
            </View>
            <View style={styles.itemWrapper}>
                <Text>{item.info.name}</Text>
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

    imageOuterWrapper: {
        height: Dimensions.get("window").width * 0.2,
        alignItems : "center"
    },

    imageWrapper: {
        width: Dimensions.get("window").width * 0.9,
        height: Dimensions.get("window").width * 0.4,
        borderRadius: 5,
        borderColor: colors.simpleGrey,
        borderWidth: 1,
        overflow: "hidden",
        zIndex : 1,
        backgroundColor : "#fff"
    },

    itemWrapper: {
        paddingTop: Dimensions.get("window").width * 0.2 + 10,
        borderColor: colors.yarrow,
        borderWidth: 2,
        borderRadius: 3,
        minHeight: Dimensions.get("window").width * 0.4,
    },

    imageStyles: {
        width: "100%",
        height: "100%",
        resizeMode: "cover"
    }

})

export default PlacesList