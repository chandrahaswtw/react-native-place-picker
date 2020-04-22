import React from 'react';
import { Alert} from 'react-native';

const CustomAlert = (title, body) => {
    Alert.alert(title, body, [{
        text : "CANCEL",
        style : "cancel"
    }])
}

export default CustomAlert;