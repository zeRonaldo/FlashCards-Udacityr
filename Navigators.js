import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import Main from './src/views/Main';
import NewDeck from './src/views/NewDeck';
import EditDeck from './src/views/EditDeck';
import Results from './src/views/Results';
import Game from './src/views/Game';

import Deck from './src/views/Deck';



export default Navigators = () => {
    return(
        <Router>
            <Scene key="root" hideNavBar
                        direction="vertical">
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
                            component={Deck}
                            title = "Deck"
                            modal={false}
                        />
                    
                   
                   <Scene
                            key="game"
                            component={Game}
                            title = "Game"
                            modal
                            direction="vertical"
                        />

                    <Scene
                        key="results"
                        component={Results}
                        title= "results"
                       
                    />
                    <Scene
                            key="editdeck"
                            component={EditDeck}
                            title = "Edit Deck"
                            
                        />
            </Scene>
                     
        </Router>
    )
}
