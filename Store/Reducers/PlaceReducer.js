import * as ACTION_TYPES from './../Actions/ActionTypes';

const initial_state = {
    places: [
       // SYNTAX : {id : "1", info : {name: "VIRGINIA", uri : "https://www.virginia.org/-/media/VTC/Default-Images/DefaultVirginiaSharejpg.ashx"} }
    ]
};

const PlaceReducer = (state = initial_state, action) => {
    switch (action.type) {
        case ACTION_TYPES.PLACE_ADD:
            var item = {id : action.value.id, info : {name : action.value.place, uri : action.value.image, lat : action.value.lat, lng: action.value.lng}}
            var placesClone = [...state.places , item];
            return {
                places : placesClone
            }
        case ACTION_TYPES.PLACE_EXTRACT:
            var newArr = action.value.result.rows._array.map((el)=>{
                return {
                    id : String(el.id),
                    info : {
                        name : el.title,
                        uri : el.imageURI
                    }
                }
            })
            return {
                places : newArr
            };
        case ACTION_TYPES.PLACE_DELETE: 
            var newArray = state.places.filter((el)=>{
                return el.id !== action.value
            })
            return {
                places: newArray
            }
        default:
            return state
    }
}

export default PlaceReducer;