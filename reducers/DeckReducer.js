import { NEW_DECK, EDIT_DECK, FAVORITE_DECK, GET_DECK } from "../actions/types";
import {hashID} from '../src/utils/helpers'

export default DeckReducer = (state = {}, action) => {
    switch(action.type){
        //Create a new deck object
        case NEW_DECK: 
                return {
                    id: action.id,
                    date: action.date,
                    title: action.title,
                    description: action.description,
                    favorite: false,
                    cards: action.cards,
                    records: []
                }
                
        
        //Chage the current deck object title and description
        case EDIT_DECK:
            if(state.id !== action.id){
                return state
            }
            return {
                ...state,
                ...action.title,
                ...action.description,
                ...action.cards,
            }
        
        //Toggle the favorite property of the deck with the responding id
        case FAVORITE_DECK:
            if(state.id !== action.id){
               
                return state
            }
                return {
                    ...state,
                    favorite: !state.favorite
                }
            
        
        //Returns a single deck object with the id passed
        case GET_DECK:
            if(state.id === action.id){
                return state;
            }
        
        default:
            return state;
    }
}

