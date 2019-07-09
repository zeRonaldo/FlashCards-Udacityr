import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import Main from './src/views/Main';
import NewDeck from './src/views/NewDeck';
import EditDeck from './src/views/EditDeck';
import Results from './src/views/Results';
import Game from './src/views/Game';

import Deck from './src/views/Deck';
import DeckForm from './src/views/DeckForm';



export default Navigators = () => {
    return(
        <Router>
            <Scene 
                key="root" 
                hideNavBar
                >
                <Scene
                    key="index"
                    hideNavBar
                    modal
                    initial
                    >
                        <Scene
                            component={Main}
                            key="main"
                            title="Main"
                                                
                            initial
                        />
                        <Scene
                            key="createdeck"
                            component={EditDeck}
                            modal={true}
                            direction="vertical"
                            title = "Edit Deck"
                        />
                </Scene>
                    
                <Scene
                    key="deck"
                    hideNavBar
                    modal
                    direction="vertical"
                >
                    
                    <Scene
                            key="deckinfo"
                            component={Deck}
                            title = "Deck"
                        />
                    
                   
                   
                    <Scene
                        key="deckoptions"
                        hideNavBar
                        modal
                        direction="vertical"
                    >
                         <Scene
                            key="editdeck"
                            component={DeckForm}
                            title = "Edit Deck"
                            
                        />
                    </Scene>

                    <Scene
                        key="newgame"
                        hideNavBar
                        modal
                        direction="vertical"
                    >
                            <Scene
                                    key="game"
                                    component={Game}
                                    title = "Game"
                                />

                            <Scene
                                key="results"
                                component={Results}
                                title= "results"
                            
                            />
                    </Scene>
                </Scene>
                   
            </Scene>
                     
        </Router>
    )
}
