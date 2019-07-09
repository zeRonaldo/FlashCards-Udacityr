import { SET_DECK } from "../actions/types";

export default DeckAuxReducer = (state= {}, action) => {
    switch (action.type){
        case SET_DECK:
            return action.deck;
        default:
            return state;
    }
}