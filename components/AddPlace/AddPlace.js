import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert, Image } from 'react-native';
import FormInput from '../../UI/FormInput';
import { colors } from '../../assets/colors';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { SetPermissions } from '../../helpers/permissions';
import LocationSection from './LocationSection';
import CustomButton from './../../UI/CustomButton';

const AddPlace = props => {

    var latitude = props.navigation.getParam("latitude"); 
    var longitude = props.navigation.getParam("longitude"); 

    useEffect(()=>{
        if(latitude && longitude)
        {
            props.setLocation({
                lat : latitude,
                lng : longitude
            })
        }
    },[latitude, longitude])
    

    const cameraUsage = useCallback(async () => {
        const permissionResult = await SetPermissions(Permissions.CAMERA_ROLL, Permissions.CAMERA);
        if (!permissionResult) {
            Alert.alert("OOPS!", "This operation needs the use of Camera!!", [{
                text: "OK",
                style: "cancel"
            }])
        }
        else {
            var img = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            })
            props.setImgURI(img.uri);
        }
    }, [])

    return (
        <View style={styles.wrapper}>
            <FormInput
                title="TITLE"
                onChangeHandler={(id, val) => { props.setPlaceTitle(val) }}
                value={props.placeTitle}>
            </FormInput>
            <View style={styles.imageWrapper}>
                <TouchableOpacity style={styles.imageInnerWrapper} onPress={cameraUsage}>
                    {props.imgURI ? <Image style={styles.imageStyles} source={{ uri: props.imgURI }}></Image>
                        : <Text style={{ ...styles.textStyles, textAlign: "center" }}>CLICK TO ADD IMAGE</Text>}
                </TouchableOpacity>
            </View>
            <LocationSection
                location={props.location}
                setLocation={props.setLocation}></LocationSection>
            <CustomButton title="PICK A LOCATION" color={colors.primary} onPressHandler={()=>{props.navigation.navigate("PLACEMAP")}}></CustomButton>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    },
    textStyles: {
        fontFamily: "open-sans-semiBold-italic",
        color: colors.success
    },
    imageWrapper: {
        padding: 10,
        borderWidth: 2,
        borderColor: colors.simpleGrey,
        borderStyle: "dashed",
        borderRadius: 5,
        height: Dimensions.get("window").height * 0.25
    },
    imageInnerWrapper: {
        flex: 1,
        justifyContent: 'center'
    },
    imageStyles: {
        width: "100%",
        height: "100%",
        resizeMode: "cover"
    }
})

export default AddPlace;