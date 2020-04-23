import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { colors } from './../../assets/colors';
import { SetPermissions } from './../../helpers/permissions';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import CustomAlert from './../../UI/CustomAlert';
import ENV from "./../../env";

const LocationSection = props => {

    const [isLoading, setLoading] = useState(false);

    const onClickHandler = async () => {
        
        const locationPermission = await SetPermissions(Permissions.LOCATION);

        if (locationPermission) {
            setLoading(true);
            try {
                const currentLocation = await Location.getCurrentPositionAsync({ timeout: 5000 })
                props.setLocation({
                   lat :  currentLocation.coords.latitude,
                   lng :  currentLocation.coords.longitude,
                })
            }
            catch(err){
                CustomAlert("INTERNAL ERROR", err.message)
            }
            finally{
                setLoading(false);
            }
        }
        else {
            CustomAlert("OOPS!", "This feature requires loction feature to be enabled on you phone")
        }
    }

    return (
        <View style={styles.wrapper}>
            {isLoading ? <ActivityIndicator></ActivityIndicator> : 
            <TouchableOpacity style={{ flex: 1, justifyContent: "center" }} onPress={onClickHandler}>
               {props.location ? 
               <Image style={{height : "100%", width : "100%", resizeMode : "cover"}}
               source = {{uri : `https://maps.googleapis.com/maps/api/staticmap?&zoom=13&size=600x300&maptype=roadmap
               &markers=color:red%7Clabel:C%7C${props.location.lat},${props.location.lng}
               &key=${ENV().googleApiKey}`}}>
               </Image>
               :<Text style={styles.textStyles}>CLICK TO FETCH CURRENT LOCATION</Text>} 
            </TouchableOpacity>}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        borderWidth: 2,
        borderColor: colors.simpleGrey,
        borderStyle: "dashed",
        borderRadius: 5,
        height: Dimensions.get("window").height * 0.25,
        justifyContent: "center",
        marginVertical: 10
    },
    textStyles: {
        textAlign: "center",
        fontFamily: "open-sans-semiBold-italic",
        color: colors.success
    }
})

export default LocationSection;