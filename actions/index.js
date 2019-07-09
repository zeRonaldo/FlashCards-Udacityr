import {
        NEW_DECK,
        GET_CARDS,GET_DECKS,GET_DECK,GET_RECORDS,
        EDIT_CARD,EDIT_DECK,
        DELETE_CARD, DELETE_DECK, DELETE_RECORD,
        FAVORITE_DECK,
        ADD_CARD,
        SET_SEARCH
    } from './types'

    import {hashID} from '../src/utils/helpers'
//DECKS
export const newDeck = (title, description, cards) => {
    
            let date = new Date();
            let id = hashID(4);
            let cardsInDeck = cards.map((card) => createCard(card.q, card.a))
            console.log(cardsInDeck)
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
    let cardsInDeck = cards.map((card) => createCard(card.question, card.answer))
    return {
        type: EDIT_DECK,
        title,
        description,
        cards: cardsInDeck
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
    if(question.length < 3 && answer.length <3 ){
        return null
    }
    return ({id, question, answer})
}
