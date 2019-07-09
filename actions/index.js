import {
        NEW_DECK,
        GET_CARDS,GET_DECKS,GET_DECK,GET_RECORDS,
        EDIT_CARD,EDIT_DECK,
        DELETE_CARD, DELETE_DECK, DELETE_RECORD,
        FAVORITE_DECK,
        ADD_CARD,
        SET_SEARCH,
        SET_DECK, SET_DECK_BY_ID
    } from './types'

    import {hashID} from '../src/utils/helpers'
import DecksReducer from '../reducers/DecksReducer';


//DECKS
export const newDeck = (title, description, cards) => {
    
            let date = new Date();
            let id = hashID(4);
            let cardsInDeck = cards.map((card) => createCard(card.q, card.a))
            return {
                type: NEW_DECK,
                title,
                description,
                id,
                date,
                cards: cardsInDeck
            }
    
}

export const toggleFavorite = (id) => 
    ({
        type: FAVORITE_DECK,
        id
    })

export const removeDeck = (id) => 
    ({
        type: DELETE_DECK,
        id
    })

export const editDeck = (id, deck, cards) => {
    return (dispatch) => {
        let cardsInDeck = cards.map((card) => createCard(card.q, card.a)) 
        dispatch({type: EDIT_DECK,
            id,
            title: deck.title,
            description: deck.description,
            cards: cardsInDeck})
         dispatch(setDeckById(id))
    }
}

export const setDeckById = (id) => ({
    type: SET_DECK_BY_ID,
    id
})

export const setDeck = (deck) => {
    return (dispatch) => {
        dispatch({
            type: SET_DECK,
            deck
        })
        
    }
    
}

//SEARCH
export const setSearch = (query) => 
    ({    
        type: SET_SEARCH,
        search: query
    })

//CARDS
export const createCard = (question, answer) => {
    let id = hashID(6)
    return ({id, question, answer})
}
