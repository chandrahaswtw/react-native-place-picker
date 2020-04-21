import * as ACTION_TYPES from './../Actions/ActionTypes';

const initial_state = {
    places: [
       // SYNTAX : {id : "1", info : {name: "VIRGINIA", uri : "https://www.virginia.org/-/media/VTC/Default-Images/DefaultVirginiaSharejpg.ashx"} }
    ]
};

const PlaceReducer = (state = initial_state, action) => {
    switch (action.type) {
        case ACTION_TYPES.PLACE_ADD:
            var item = {id : String(state.places.length), info : {name : action.value.place, uri : action.value.image}}
            var placesClone = [...state.places , item];
            return {
                places : placesClone
            }
        default:
            return state
    }
}

export default PlaceReducer;