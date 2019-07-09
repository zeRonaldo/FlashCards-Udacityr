import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../utils/variables';
import gradient from '../../assets/gradient.png'
import { setDeck} from '../../actions';
import { Actions } from 'react-native-router-flux';
import FavoriteStar from "../components/FavoriteStar";

 class DeckItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  goToDeck = (deck) => {
    this.props.dispatch(setDeck(deck))
    Actions.push("deck")
  }
  render() {
      const {id, title, cards} = this.props.deck
  
    return (
      <View style={styles.container} key={id}>
        <TouchableOpacity onPress={()=> this.goToDeck(this.props.deck)}>
          <View style={styles.viewCard}>
              <ImageBackground source={gradient} style={{width: '100%', height: '100%'}}>
                  <View style={styles.info}>
                      <View style={styles.mainInfo}>
                          <Text style={styles.txtBtn}>{title}</Text>
                          <Text style={styles.txtCard}>
                                      {cards.length + " Cards"}
                          </Text>
                      </View>
                      <View style={styles.actions}>
                        <FavoriteStar deckId={id}/>
                      </View>
                          

                  </View>
              </ImageBackground>
              
              {/* <View>
                  <TouchableOpacity>
                      <Icon
                      type="AntDesign"
                      name="delete"
                      onPress={() => this.props.dispatch({
                                  type: "DELETE_DECK",
                                  id:id})}
                      />
                  </TouchableOpacity>
              </View> */}
            </View>
        </TouchableOpacity>
        
      </View>
    );
  }
}

export default connect()(DeckItem)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        flexDirection: "column",
        alignItems: 'center',
        overflow: 'hidden'
      },
      viewCard: {
        width: 300,
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 15,
        borderWidth: 5,
        borderColor: colors.white,
        marginVertical: 5
      },
      info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.bg,
        opacity: .9,
        paddingHorizontal:10,
        paddingVertical: 15,
        marginTop:80
        
    },
    mainInfo: {
        opacity: 1,
        flexDirection: 'column',
    },
      txtBtn: {
        fontSize: 22,
        color: colors.lightBlue,
      },
      txtCard: {
        color: colors.lightGray,
        fontSize: 14
      },
})