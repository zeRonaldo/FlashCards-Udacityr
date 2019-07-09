import React, { Component } from 'react';
import { View, Text,  StyleSheet, } from 'react-native';
import { colors } from '../utils/variables';
import DeckList from '../components/DeckList';
import SolidButton from '../components/SolidButton';
import SearchBar from '../components/SearchBar';
import { Actions } from 'react-native-router-flux';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.fullScreen}>
        <SearchBar/>
        <DeckList/>
        <SolidButton pressed={()=> Actions.createdeck({newDeck: true})} buttonText="New Deck"/>
      </View>
    );
  }
}
export default Main

const styles = StyleSheet.create({
    fullScreen: {
      flex: 1,
      backgroundColor: colors.bg,
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      alignContent: 'flex-start',
    },
})