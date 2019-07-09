import {combineReducers} from 'redux'
import DecksReducer from  './DecksReducer'
import SearchReducer from './SearchReducer';

export default combineReducers({
    decks: DecksReducer,
    search: SearchReducer
})