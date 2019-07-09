import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ImageBackground
} from "react-native";
import { Actions } from "react-native-router-flux";
import {colors} from '../utils/variables';
import { Icon, Left, Right } from "native-base";
// import { getDeck } from "../functions";
import cardque from '../../assets/cardque.png'
import cardans from '../../assets/cardans.png'
import FAB from "../components/FAB";

export default class Game extends Component {
    state = {
        hit: 0,
        isAnswer: false,
        prg: 0,
        deck: undefined
      };
    
       async componentDidMount () {
        // await getDeck(this.props.id).then(  deck => {
        //      this.setState({ deck });
        // })
      }
      
      componentWillMount() {
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
        this.value = value;
        })
        this.frontInterpolate = this.animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
        })
        this.backInterpolate = this.animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg']
        })
      }

      async nextQuestion(answer) {
        const { hit, prg, deck } = this.state;
        this.setState({
          isAnswer: false
        });
        await this.setState({
          hit: answer ? hit + 1 : hit
        });
    
        if (this.state.prg + 1 >= deck.questions.length) {
          Actions.results({
            tot: deck.questions.length,
            hit: this.state.hit,
            title: this.props.id
          });
        } else {
          this.setState({
            prg: prg + 1
          });
        }
      }

      goBack = () => {
          const {deck} = this.state
          Actions.deck({ id: deck.title });
      }

      flipCard() {
            this.setState({ isAnswer: true })
            if (this.value >= 90) {
            Animated.spring(this.animatedValue,{
                toValue: 0,
                friction: 8,
                tension: 10
            }).start();
            } else {
            Animated.spring(this.animatedValue,{
                toValue: 180,
                friction: 8,
                tension: 10
            }).start();
            }
      }

  render() {
    const { deck, prg, isAnswer } = this.state;

    const frontAnimatedStyle = {
        transform: [
          { rotateX: this.frontInterpolate}
        ]
    }
    const backAnimatedStyle = {
        transform: [
          { rotateX: this.backInterpolate }
        ]
    }


    return (
      <View style={styles.container}>
        <View style={{flex: .8}}>
          <Left style={styles.left}>
            <Icon
              type="SimpleLineIcons"
              name="close"
              style={[styles.icon]}
              onPress={() => this.pop()}
            />
             <Text style={[styles.icon, {fontSize: 30}]}>
                1/1
                {/* {(prg + 1) + "/" + deck.questions.length} */}
            </Text>
            <Text style={[styles.icon, {fontSize: 30}]}>
                <Icon
                    type="AntDesign"
                    name="clockcircleo"
                    style={[styles.icon]}
                />
                30
                {/* {(prg + 1) + "/" + deck.questions.length} */}
            </Text>
          </Left>
        </View>
        
        <View style={{flex:7, alignContent: 'center', justifyContent: 'center', alignItems:"center"}}>
            <View style={styles.cardContainer}>
                <View>
                    <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                        <ImageBackground source={cardque} style={{width: '100%', height: '100%'}}>
                            <TouchableOpacity onPress={() => this.flipCard()} style={styles.cardContent} >
                                <Text style={styles.cardText}>
                                    {/* {deck.questions[prg].question} */}Question
                                </Text>
                            </TouchableOpacity>
                        </ImageBackground>
                    </Animated.View>

                    <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
                        <ImageBackground source={cardans} style={{width: '100%', height: '100%'}}>
                        <TouchableOpacity onPress={() => this.flipCard()} style={styles.cardContent}>
                            <Text style={styles.cardText}>
                                {/* {deck.questions[prg].answer} */}answer
                            </Text>
                        </TouchableOpacity>
                        </ImageBackground>
                    </Animated.View>
                </View>
            </View>
        </View>
        
        <View style={{flex: 2}}>
          {!isAnswer ? (
               
                  <FAB action={() => this.flipCard()} icon={{type: "SimpleLineIcons", name: "refresh"}} color={colors.lightPurple}/>
                    
               
          ):(
              <View style={styles.fabContainer}> 
                  <FAB action={() => this.nextQuestion(false) } icon={{type: "Feather", name: "x"}} color={colors.red}/>
                   
                  <FAB action={() => this.nextQuestion(true) } icon={{type: "Feather", name: "check"}} color={colors.lightGreen}/>
              </View>
          )}
        </View>
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    flexDirection: "column",
    backgroundColor: colors.fg,
    overflow: 'hidden',
  },
  title: {
    fontSize: 30,
    color: colors.lightBlue,
    paddingVertical: 15,
    textShadowColor: colors.fg,
    textShadowOffset: {
        width: 0,
        height: 2,
    },
    textShadowRadius: 5

  },
  txtBtn: {
    fontSize: 27
  },
  input: {
    height: 40,
    borderColor: colors.fg,
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
    color: colors.bg,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  textInput_onFocus: {
    backgroundColor: colors.lighterGray,
    color: colors.fg,
    height: 40,
    padding: 0
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-between",
    paddingHorizontal: 10,
    backgroundColor: colors.fg,
    width: '100%',
    height: 20
  },
  icon: { margin: 5, color: colors.lightBlue },
  fabContainer: {
      flexDirection: "row",
      alignContent: 'center',
      justifyContent: 'space-evenly'
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flipCard: {
    width: 340,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
    marginVertical: -10,
    borderRadius: 15,
    borderWidth: 7,
    borderColor: colors.white,
  },
  flipCardBack: {
    backgroundColor: colors.red,
    position: "absolute",
    top: 0,
  },
  cardContent: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardText: {
    fontSize: 40,
    padding: 10,
    backgroundColor: colors.white,
    textAlign:'center',
    width: '100%',
    color: colors.bg,
    textShadowColor: colors.lightGray,
    textShadowOffset: {
        width: 0,
        height: 1,
    },
    textShadowRadius: 1
  }
});
