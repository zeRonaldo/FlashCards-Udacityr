import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import {Icon} from 'native-base';
import {connect} from 'react-redux';
import {colors} from '../utils/variables'
import { toggleFavorite } from '../../actions';

 class FavoriteStar extends Component {
  render() {
      const {deckId, dispatch} = this.props
      const deck = this.props.decks.filter(deck => deck.id === this.props.deckId)[0];
    return (
        <TouchableOpacity>
        <Icon
            type="AntDesign"
            name={deck.favorite ? "star": "staro"}
            style = {deck.favorite ? [styles.actions, styles.star]: styles.actions}
            onPress={() => dispatch(toggleFavorite(this.props.deckId))}
            />
        </TouchableOpacity>
    );
  }
}
const mapStateToProps = ({decks}) => ({decks}) 
export default connect(mapStateToProps)(FavoriteStar)

const styles = StyleSheet.create({
    actions:{
        fontSize: 40,
        color: colors.lightGray
    },
    star:{
        color: colors.yellow,
        opacity: 1
    },
})