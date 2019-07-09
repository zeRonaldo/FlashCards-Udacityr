import {combineReducers} from 'redux'
import DecksReducer from  './DecksReducer'
import SearchReducer from './SearchReducer';
import DeckAuxReducer from './DeckAuxReducer';

export default combineReducers({
    decks: DecksReducer,
    deck: DeckAuxReducer,
    search: SearchReducer
})