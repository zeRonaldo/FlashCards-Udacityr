import React, { Component } from 'react';
import { View, ScrollView,  StyleSheet, } from 'react-native';
import {Tabs, Tab, ScrollableTab} from 'native-base'
import {connect} from 'react-redux';
import DeckItem from './DeckItem';
import { setDeck } from '../../actions';
 class DeckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
    };
  }
  
  render() {
      const {decks, search} =  this.props
      const {currentTab}= this.state
    return (
      <View style={styles.scroll}>

          {search !== '' ?
            <ScrollView style={styles.scroll}>
              
                    {decks !== undefined &&
                      decks !== null &&
                      decks.filter(deck => deck.title.toUpperCase().includes(search.toUpperCase())).map(deck => 
                        <DeckItem deck={deck} key={deck.id}/>    
                    )}
              
            </ScrollView>
            :
            <ScrollView style={styles.scroll}>
              
                    {decks !== undefined &&
                      decks !== null &&
                      decks.map(deck => 
                        <DeckItem deck={deck} key={deck.id}/>    
                    )}
              
            </ScrollView>
          }
      </View>
      
      

      
    );
  }
}

const mapStateToProps =({decks, search}) =>{
    return {decks, search}
}

export default connect(mapStateToProps)(DeckList)

const styles = StyleSheet.create({
    scroll: {
      flex: 5,
      paddingHorizontal: 10
    },
});