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
import { removeDeck } from "../../actions";

 class Deck extends Component {
    state = {
        deck: undefined,
        tab: 1,
      };
    
       componentDidMount() {
        const deck = this.props.decks.filter(deck => deck.id === this.props.id)[0];
        this.setState({deck})
        console.log(deck)
      }
      changeTab = i => {
          this.setState({tab: i})
      }
      deleteDeck = (id) => {
          Actions.popTo('main');
          this.props.dispatch(removeDeck(id))
      }
      render() {
        const { deck, tab } = this.state;
        return (
          <View style={[styles.container]}>
          {deck !== undefined ? (
            <View>
                <View style={{height:160,borderBottomColor: colors.lighterGray, borderBottomWidth:2}}>
                <ImageBackground source={gradient} style={{width: '100%', height: "100%"}}>
                    <View style={{flex: .8}}>
                        <View style={styles.left}>
                            <Icon
                            type="SimpleLineIcons"
                            name="arrow-left"
                            style={styles.icon}
                            onPress={() => Actions.pop()}
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
    
            
              <View>
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
               <View >
                   {tab === 1 &&
                        <ScrollView style={{}}>
                            <Text>About this Deck</Text>
                            <Text>{deck.description}</Text>
                            <View>
                                <Text>Created at</Text>
                                <Text>{deck.date}</Text>
                            </View>
                            <View>
                                <Text>Number of Cards:</Text>
                                <Text>{deck.cards.count}</Text>
                            </View>
                        </ScrollView>
                    }
                    {tab === 2 &&
                        <View>
                             <Text>Leaderboards</Text>
                            {deck.records.length !== 0 ?
                                <View>
                                    <View>
                                        <Text>Points</Text>
                                        {deck.records.map(record => <Text>{record.points}</Text>)}
                                        
                                    </View>
                                    <View>
                                        <Text>Time</Text>
                                        {deck.records.map(record => <Text>{record.time}</Text>)}
                                    </View>
                                    <View>
                                        <Text>Date</Text>
                                        {deck.records.map(record => <Text>{record.date}</Text>)}
                                    </View>
                                </View>
                            :
                                <View>
                                    <Text>No records yet</Text>
                                </View>
                        }
                        {tab === 3 &&
                            <View>
                                <TouchableOpacity onPress={() => Actions.editdeck({ id: deck.id, edit: true})}>
                                    <Icon
                                         type="AntDesign"
                                         name="edit"
                                    />
                                    <Text>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.deleteDeck(deck.id)}>
                                    <Icon
                                         type="AntDesign"
                                         name="delete"
                                    />
                                    <Text>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        }
                            
                        </View>
                    }
               </View>
              </View>
              <SolidButton pressed={() => Actions.game({ id: deck.id })} buttonText='Start Quizz' color={colors.lightGreen} />
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
mapStateToProps = ({decks}) => ({ decks })
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
    left: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent:"space-between",
      paddingHorizontal: 10,
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
    }
  });
  