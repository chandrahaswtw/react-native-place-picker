import * as ACTION_TYPES from './ActionTypes';
import * as FileSystem from 'expo-file-system';

export const PLACE_ADD_ACTION_CREATOR = (place = "", image = "") => {
    return async dispatch => {
        const fileName = image.split("/").pop();
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            })
        }
        catch(err){
            console.log(err.message)
        }

        dispatch({
            type: ACTION_TYPES.PLACE_ADD,
            value: { place, image : newPath }
        })
    }
}
