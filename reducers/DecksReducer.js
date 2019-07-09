import { NEW_DECK, EDIT_DECK, FAVORITE_DECK, DELETE_DECK, GET_DECKS, GET_DECK, SET_DECKS, SET_DECK_BY_ID } from "../actions/types";
import DeckReducer from './DeckReducer';
import { setDeck } from "../actions";

export default DecksReducer = (state = [], action) => {
    switch(action.type){
        //Call to deck reducer and Add the deck object created to the state
        case NEW_DECK:
            return [...state,
            DeckReducer(undefined, action)]
        
        //Call to deck reducer and Edit the deck object created to the state
        case EDIT_DECK:
            
            return state.map(item => {
                if(item.id !== action.id){
                    return item
                }
                return {
                    ...item, 
                    title: action.title,
                    description: action.description,
                    cards: action.cards,
                }
            })
        
        //Toggle the favorite property from a deck that has the id passed down
        case FAVORITE_DECK:
            return state.map(item => DeckReducer(item, action))
        
        //Returns the state without a deck that has the id passed down
        case DELETE_DECK:
            if(state === []){
                return state
            }
            return state.filter( item => {
                if(item.id !== action.id){
                    return item
                }
            })
        
        //Just returns the state
        case GET_DECKS:
            return state

        //Return the item in the state with the id passed down
        case GET_DECK:
            if(state === []){
                return []
            }
            return state.filter( item => item.id === action.id)

        //Set the value of the state
        case SET_DECKS:
            return action.decks
        
        case SET_DECK_BY_ID:
            let deck = state.filter( item => item.id === action.id)
            setDeck(deck)
            return state

        default:
            return state
    }
}