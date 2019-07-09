import { AsyncStorage } from 'react-native'

export const fetchAllDecks = () => {
    return AsyncStorage.getItem('Decks')
        .then( res => JSON.parse(res))
}

export const fetchDeckById = (id) => {
    return AsyncStorage.getItem('Decks')
        .then( res => JSON.parse(res).filter(res => res.id === id))
}

export const saveDeck = (deck, edit = false) => {
    let decks = fetchAllDecks();
    if(edit){
        let index = getIndex(decks, deck.id);
        decks = 
    }
}



function getIndex(data, id){
    let clone = JSON.parse(JSON.stringify(data));
    return clone.findIndex((obj) => parseInt(obj.id) === parseInt(id));
}
