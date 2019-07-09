import { SET_SEARCH } from "../actions/types";

export default search = (state = '', action) => {
    switch(action.type){
        case SET_SEARCH:
            return action.search;
        default:
            return state
    }
}