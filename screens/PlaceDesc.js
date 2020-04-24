import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { colors } from "./../assets/colors";
import ENV from './../env';

const PlaceDesc = props => {
    
    const title = props.navigation.getParam("title");
    const uri = props.navigation.getParam("uri");
    const lat = props.navigation.getParam("lat");
    const lng = props.navigation.getParam("lng");

    return (
        <ScrollView style={{ padding: 10 }}>
            <View style={styles.outerWrapper}>
                <Text style={styles.textStyles}>{title.toUpperCase()}</Text>
                <View style={styles.imageWrapper}>
                    <Image style={styles.imageStyles} source={{ uri }}>
                    </Image>
                </View>
                <TouchableOpacity activeOpacity={0.5} style={{...styles.imageWrapper, height: Dimensions.get("window").height * 0.4, backgroundColor : "white"}} onPress={()=>{props.navigation.navigate("PLACEMAP",{lat, lng, readOnly : true})}}>
                    <Image style={styles.imageStyles} source={{
                        uri: `https://maps.googleapis.com/maps/api/staticmap?&zoom=13&size=600x600&maptype=roadmap
                        &markers=color:red%7Clabel:C%7C${lat},${lng}
                        &key=${ENV().googleApiKey}`
                    }}>
                    </Image>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    outerWrapper: {
        padding: 10,
        borderColor: colors.info,
        borderWidth: 2,
        borderRadius: 5
    },
    textStyles: {
        fontSize: 16,
        fontFamily: "open-sans-semiBold-italic",
        textAlign: "center",
        marginVertical: 10,
    },
    imageWrapper: {
        height: Dimensions.get("window").height * 0.25,
        marginVertical: 10,
        borderRadius: 5,
        overflow: "hidden",
        elevation : 5
    },
    imageStyles: {
        height: "100%",
        width: "100%",
        resizeMode: "cover",
        borderRadius: 5,
    }
})

PlaceDesc.navigationOptions = navInfo => {
    return {
        headerTitle: navInfo.navigation.getParam("title").toUpperCase()
    }
}

export default PlaceDesc