import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ImageBackground,
  ScrollView
} from "react-native";
import { Header, Left, Icon, Body } from "native-base";
import { Actions } from "react-native-router-flux";
import SolidButton from "../components/SolidButton";
import {connect} from 'react-redux';
import {colors} from '../utils/variables';
import gradient from '../../assets/gradient.png';
import FavoriteStar from "../components/FavoriteStar";
import { removeDeck, clearDeck, setDeck } from "../../actions";
import { toDateReadable } from "../utils/helpers";
import { Constants } from 'expo';

 class Deck extends Component {
    state = {
        tab: 1,
      };
    
       componentDidMount() {
        
      }
      changeTab = i => {
          this.setState({tab: i})
      }
      deleteDeck = (id) => {
          Actions.popTo('main')
          this.props.dispatch(removeDeck(id))
      }
      backToMain = () => {
        Actions.popTo('main', {refresh: {}})
        // this.props.dispatch(setDeck(null))
      }
      render() {
        const { tab } = this.state;
        const {deck} = this.props
        return (
          <View style={[styles.container]}>
          {deck !== undefined ? (
            <View style={{flex: 2}}>
                <View style={{flex: 1,borderBottomColor: colors.lighterGray, borderBottomWidth:1}}>
                <ImageBackground source={gradient} style={{width: '100%', height: "100%"}}>
                    <View style={{flex: .8}}>
                        <View style={styles.topBar}>
                            <Icon
                            type="SimpleLineIcons"
                            name="arrow-left"
                            style={styles.icon}
                            onPress={() => this.backToMain()}
                            />
                            <FavoriteStar deckId={deck.id}/>
                        </View>   
                    </View>
                    <Text style={styles.title}>{deck.title}</Text> 
                    <Text style={styles.subtitle}>
                        {deck.cards.length + " Cards"}
                    </Text>
                </ImageBackground>
                </View>
    
            
              <View style={{flex: 1}}>
                  <View style={styles.tabBar}>
                      <TouchableOpacity style={tab === 1 ? [styles.tabItem, styles.tabItemSelected]: styles.tabItem} onPress={()=>this.changeTab(1)}>
                          <Icon type="AntDesign" name="bars"  style={tab === 1 ? [styles.tabItemIcon, styles.tabItemIconSelected]: styles.tabItemIcon}/>
                        </TouchableOpacity>
                      <TouchableOpacity style={tab === 2 ? [styles.tabItem, styles.tabItemSelected]: styles.tabItem} onPress={()=>this.changeTab(2)}>
                          <Icon type="AntDesign" name="Trophy" style={tab === 2 ? [styles.tabItemIcon, styles.tabItemIconSelected]: styles.tabItemIcon}/>
                        </TouchableOpacity>
                      <TouchableOpacity style={tab === 3 ? [styles.tabItem, styles.tabItemSelected]: styles.tabItem} onPress={()=>this.changeTab(3)}>
                          <Icon type="AntDesign" name="setting" style={tab === 3 ? [styles.tabItemIcon, styles.tabItemIconSelected]: styles.tabItemIcon}/>
                        </TouchableOpacity>
                  </View>

               <View style={{flex: 5}}>
                   {tab === 1 &&
                        <ScrollView  >
                            <Text style={styles.tabTitle}>About this Deck</Text>
                            <Text style={[styles.tabText, styles.description]}>{deck.description}</Text>
                            <View style={styles.inline}>
                                <Text style={styles.tabFluffText}>Created at</Text>
                                <Text style={styles.tabText}>{toDateReadable(deck.date)}</Text>
                            </View>
                            <View style={styles.inline}>
                                <Text style={styles.tabFluffText}>Number of Cards:</Text>
                                <Text style={styles.tabText}>{deck.cards.length}</Text>
                            </View>
                        </ScrollView>
                    }
                    {tab === 2 &&
                        <View >
                             <Text style={styles.tabTitle}>Leaderboards</Text>
                            {deck.records.length !== 0 ?
                                <View >
                                    <View style={styles.inline}>
                                      <Text style={[styles.tabFluffText, styles.mainRow, styles.limRow]}>Points</Text>
                                      <Text style={[styles.tabFluffText, styles.mainRow, styles.limRow]}>Time</Text>
                                      <Text style={[styles.tabFluffText, styles.mainRow]}>Date</Text>
                                    </View>
                                    
                                        {deck.records.map((record, index )=> 
                                          <View key={index} style={styles.inline}>
                                            <Text style={[styles.tabText, styles.row, styles.limRow]}>{record.points}</Text>
                                            <Text style={[styles.tabText, styles.row, styles.limRow]}>{record.time}</Text>
                                            <Text style={[styles.tabText, styles.row]}>{toDateReadable(record.date)}</Text>
                                          </View>
                                        )}
                                </View>
                            :
                                <View style={styles.inline}>
                                    <Text style={styles.tabFluffText}>No records yet</Text>
                                </View>
                          }
                        </View>
                      }
                        
                      {tab === 3 &&
                            <View >
                                <Text style={styles.tabTitle}>Settings</Text>
                                <View style={styles.inline}>
                                    <TouchableOpacity onPress={() => Actions.deckoptions()}>
                                        <Icon
                                            type="AntDesign"
                                            name="edit"
                                        />
                                        <Text>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.deleteDeck(deck.id, deck.title)}>
                                        <Icon
                                            type="AntDesign"
                                            name="delete"
                                        />
                                        <Text>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                      }
                            
                        
                    
               </View>
              </View>
              <SolidButton pressed={() => Actions.newgame({ id: deck.id })} buttonText='Start Quizz' color={colors.lightGreen} />
              </View>
            ) : (
              <View style={styles.container}>
                <Text style={styles.title}>Sem Dados</Text>
              </View>
            )}
          </View>
        );
}
}
mapStateToProps = ({deck}) => ({ deck })
export default connect(mapStateToProps)(Deck)


const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      flexDirection: "column",
      backgroundColor: colors.bg,
      overflow: 'hidden',
    },
    title: {
      fontSize: 36,
      color: colors.bg,
      paddingVertical: 15,
      alignSelf: 'center',
      textShadowColor: colors.white,
      textShadowOffset: {
          width: 0,
          height: 1,
      },
      textShadowRadius: 2
  
    },
    txtBtn: {
      fontSize: 27
    },
    input: {
      height: 40,
      borderColor: colors.gray,
      borderBottomWidth: 3,
      width: "80%"
    },
    textInput: {
      width: '90%',
      paddingLeft: '5%',
      height: 40,
      marginVertical: 25,
      borderRadius: 25,
      backgroundColor: colors.lightGray,
      color: colors.lighterGray,
      fontWeight: 'bold',
      justifyContent: 'center',
      alignSelf: 'center'
    },
    textInput_onFocus: {
      backgroundColor: colors.lighterGray,
      color: colors.gray,
      height: 40,
      padding: 0
    },
    topBar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent:"space-between",
      paddingHorizontal: 10,
      marginTop: Constants.statusBarHeight+2,
      width: '100%',
      height: 40
    },
    icon: { margin: 5, color: colors.backgroundColor },
    subtitle: {
      color: colors.blue,
      alignSelf: 'center'
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'stretch'
    },
    tabItem: {
        backgroundColor: colors.fg,
        alignContent: 'stretch',
        width: '33,34%',
        alignItems: 'center',
        paddingVertical: 10
    },
    tabItemIcon: {
        color: colors.lighterGray,
        fontSize: 28,
    },
    tabItemIconSelected: {
        color: colors.lightBlue
    },
    tabItemSelected: {
        backgroundColor: colors.bg,
        paddingVertical: 8,
        borderTopColor: colors.lightBlue,
        borderTopWidth: 4
    },
    tabTitle: {
      fontSize: 24,
      color: colors.lightBlue,
      paddingHorizontal: 15,
      paddingVertical: 20,
      textAlign: "center",
      opacity: .7,
    },
    tabText: {
      color: colors.lighterGray,
      fontSize: 16,
    },
    tabFluffText: {
      color: colors.lightGray,
      fontSize: 16,
      paddingRight: 10
    },
    description: {
      fontSize: 20,
      paddingHorizontal: 20,
      paddingBottom: 20,
      alignSelf: "center"
    },
    inline: {
      flexDirection: 'row',
      paddingHorizontal: 30,
      justifyContent: 'space-between'
    },
    mainRow: {
      fontSize: 20,
      paddingVertical: 4,
      textAlign: "center"
    },
    row: {
      fontSize: 16,
      paddingVertical: 2,
      textAlign: "center"
    },
    limRow: {
      width: 70,
    }
  });
  