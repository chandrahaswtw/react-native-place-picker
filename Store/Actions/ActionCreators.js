import * as ACTION_TYPES from './ActionTypes';
import * as FileSystem from 'expo-file-system';
import { storePlaces, extractPlaces } from './../../helpers/db'

export const PLACE_ADD_ACTION_CREATOR = (place = "", image = "") => {
    return async dispatch => {
        const fileName = image.split("/").pop();
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            })
            var x = await storePlaces(place, newPath, "XYZ", 15.2, 14.9)

            console.log("YO KA", x.insertId);
            dispatch({
                type: ACTION_TYPES.PLACE_ADD,
                value: { id : String(x.insertId), place, image: newPath }
            })
        }
        catch (err) {
            console.log(err.message)
        }
    }
}

export const PLACE_EXTRACT_ACTION_CREATOR = () => {
    return async dispatch => {
        try {
            var result = await extractPlaces();
            dispatch({
                type: ACTION_TYPES.PLACE_EXTRACT,
                value: { result }
            })
        }
        catch (err) {
            console.log(err.message)
        }
    }
}


