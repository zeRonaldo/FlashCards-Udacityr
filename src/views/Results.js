import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground
} from "react-native";
import { Actions } from "react-native-router-flux";
import SolidButton from "../components/SolidButton";

import gradient from '../../assets/gradient.png'
import { colors } from "../utils/variables";


export default class AfterMatch extends Component {
  render() {
    const { tot, hit } = this.props;
    
    return (
          <View style={styles.fullScreen}>
           
              <View style={styles.container}>
                        <View style={{flex: 2}}>
                        </View>

                        <View
                          style={styles.viewCard}
                          onPress={() => Actions.deck({ id: deck.title })}
                        >
                            <ImageBackground source={gradient} style={{width: '100%', height: '100%'}}>
                                <Text style={styles.txtBtn}>{hit} / {tot}</Text>
                                <Text style={styles.subtxtBtn}>{hit === 0 && "no question right"}{hit === 1 && hit+" question right."}{hit > 1 && hit+" questions right!"}</Text>
                            </ImageBackground>
                        </View>
                        <View style={{flex:2}}></View>

              </View>
              
            
            <SolidButton pressed={() => Actions.game({ id: this.props.title })} buttonText='Play Again'/>
            <SolidButton pressed={() => Actions.main()} buttonText='Back home'/>
          </View>
            
    );
  }
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: colors.fg,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  container: {
    flex: 1,
    height: '100%',
    flexDirection: "column",
    overflow: 'hidden'

  },
  viewCard: {
    width: 340,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 15,
    borderWidth: 5,
    borderColor: colors.white,
    marginVertical: 5,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  txtBtn: {
    fontSize: 80,
    fontWeight: '700',
    color: colors.white,
    textShadowColor: colors.bg,
    textShadowOffset: {
        width: 0,
        height: 1,
    },
    textShadowRadius: 2,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  subtxtBtn: {
    fontSize: 20,
    color: colors.bg,
    backgroundColor: colors.white,
    opacity: .8,
    textAlign: "center",
    padding: 5,
    marginTop:15,
  },
  txtCard: {
    color: colors.lightGray,
    fontSize: 14
  },
  bottomGradient: {

  }
});
