import React from "react";
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import CustomButton from './../UI/CustomButton';
import { colors } from './../assets/colors';
import { AntDesign } from '@expo/vector-icons';

const HomeScreen = props => {
    return (
        <ImageBackground style={styles.imageStyles} source={{uri : "https://3.bp.blogspot.com/-dQxMjUVgsug/T5QebiBQurI/AAAAAAAACF4/qDOCpEaSSHc/s1600/Dry+Leaf+Wallpapers+2.jpg"}}>
            <View style={styles.wrapper}>
                <CustomButton 
                title={<Text>WELCOME TO IMAGE PICKER <AntDesign name="arrowright" size={15}></AntDesign></Text>} 
                color={colors.yarrow}
                onPressHandler={()=>{props.navigation.navigate("CONTENT")}}></CustomButton>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20
    },
    imageStyles : {
        width : "100%",
        height : "100%",
        resizeMode : "cover"
    }
})

export default HomeScreen;