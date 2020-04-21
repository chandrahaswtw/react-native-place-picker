import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import {colors} from './../assets/colors'

const CustomButton = props => {
    return (
        <TouchableOpacity onPress={props.onPressHandler} activeOpacity = {0.8}>
            <View style={{...styles.wrapper, backgroundColor : props.color}}>
                <Text style={{...styles.wrapperTextStyles, color : [colors.lemon, colors.lightPink, colors.light, colors.yarrow].includes(props.color) ? "black" : "#fff"}}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 6,
        borderRadius: 2,
        alignItems: "center"
    },
    wrapperTextStyles: {
        fontFamily: "open-sans-extraBold",
        color: "#fff",
    }
})

export default CustomButton;