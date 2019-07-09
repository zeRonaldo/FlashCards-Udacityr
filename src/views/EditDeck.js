import React, { Component } from 'react';
import { View, Text , StyleSheet, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import { Icon } from 'native-base';
import SolidButton from '../components/SolidButton';
import { Actions } from 'react-native-router-flux';
import { colors } from '../utils/variables';
import { newDeck, editDeck } from '../../actions';
import {connect} from 'react-redux';

class EditDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      title: '',
      description: '',
      questions: [],
    };
  }
  componentDidMount = () => {
      this.props.id &&
      this.setState({
        id: this.props.id
      })
  }
  addCardForm = () => {
    let questions = this.state.questions.concat({q: '', a: ''})
    this.setState({
      questions
    })
  }

  deleteItem = i => e => {
    e.preventDefault()
    let questions = [
      ...this.state.questions.slice(0, i),
      ...this.state.questions.slice(i + 1)
    ]
    this.setState({
      questions
    })
  }

  handleCardsText = (i,field) => e => {
    let questions = [...this.state.questions]
    questions[i] = {...questions[i], [field]: e}
    this.setState({
      questions
    })
  }

  handleDeckText = field => e => {
       this.setState({
        [field]: e
      })
  }

  submitForm = () => {
    const {title, description, questions,id} = this.state
    if (title.length <= 3){
      alert("You need to fill at least the title to create this deck")
    }else{
        if(id === 0){
          this.props.dispatch(newDeck(title, description, questions))
          
        }else{
          this.props.dispatch(editDeck(id, {title, description}, questions))
        }
        Actions.pop()
    }
    
  }

  render() {
    const {newDeck} = this.props
    const {questions, title, description, } = this.state

    return (
      <View style={styles.container}>
        <View>
            <View style={styles.topbar}>
                {newDeck ?
                      <TouchableOpacity onPress={()=> Actions.popTo("main")}>
                            <Icon
                                type="AntDesign"
                                name="closecircleo"
                                style={styles.topbarIcon}
                            
                            />
                      </TouchableOpacity>
                    :
                      <TouchableOpacity>
                          <Icon
                              type="AntDesign"
                              name="closecircleo"
                              style={styles.topbarIcon}
                              onPress={()=> Actions.pop()}
                          />
                      </TouchableOpacity>
                  }
                  
                 
                      <TouchableOpacity onPress={this.submitForm}>
                        <Icon
                            type="AntDesign"
                            name="save"
                            style={styles.topbarIcon}
                        />
                      </TouchableOpacity>
            </View>
        </View>
        <View>
                  <TextInput value={title} onChangeText={this.handleDeckText("title")} style={styles.deckTitle} placeholder="Deck title" placeholderTextColor={colors.lightBlue}/>
                  <TextInput value={description} onChangeText={this.handleDeckText("description")} style={styles.deckDesc} placeholder="A brief description about this deck..." placeholderTextColor={colors.lightGray}/>
        </View>
        <ScrollView style={styles.scroll} >
              {questions.map((question, index) => 
                <View style={styles.questionContainter} key={index}>
                  <View style={{flex: 1}}>
                      <View style={styles.textField}>
                          <Icon
                                type="AntDesign"
                                name="questioncircleo"
                                style={styles.smallIcons}
                                
                          />
                          <TextInput 
                            style={styles.textInput}
                            placeholder='Here goes your question...'
                            placeholderTextColor={colors.lighterGray}
                            onChangeText={this.handleCardsText(index, "q")}
                            value= {question.q}
                          />
                      </View>
                      <View style={styles.textField}>
                          <Icon
                                type="AntDesign"
                                name="exclamationcircleo"
                                style={styles.smallIcons}
                          />
                          <TextInput 
                            style={styles.textInput}
                            placeholder='... and here goes the answer'
                            placeholderTextColor={colors.lighterGray}
                            onChangeText={this.handleCardsText(index, "a")}
                            value={question.a}
                          />
                      </View>
                  </View>
                  <TouchableOpacity onPress={this.deleteItem(index)} style={styles.remove}>
                          <Icon
                                type="EvilIcons"
                                name="trash"
                                style={styles.removeIcon}
                          />
                  </TouchableOpacity>
                </View>
                )}
        </ScrollView>

        <View>
          <SolidButton pressed={() => this.addCardForm()} buttonText='Add Card' color={colors.lightBlue}/>
        </View>
      </View>
      
    );
  }
}
export default connect()(EditDeck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    flexDirection: "column",
    backgroundColor: colors.bg,
    overflow: 'hidden',
  },
  topbar: {
    flexDirection: "row",
    backgroundColor: colors.bg,
    justifyContent: "space-between",
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  title: {
    color: colors.lightGray,
    fontSize: 20,
  },
  topbarIcon: { margin: 5, color: colors.lightBlue },
  scroll:{
    flex: 5,
    paddingHorizontal: 10
  },
  deckTitle:{
    fontSize:24,
    color: colors.lightBlue,
    textAlign: 'center',
    width: '70%',
    alignSelf:'center'
  },
  deckDesc:  {
    fontSize: 14,
    textAlign:"center",
    color: colors.lighterGray,
    width: '70%',
    alignSelf:'center',
    marginHorizontal:4,
    marginBottom: 10,
  },
  questionContainter: {
    backgroundColor: colors.lightGray,
    flexDirection: 'row',
    marginVertical: 5,
    alignContent: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 5,
    borderWidth: 3,
    borderColor: colors.white
  },
  textField: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '2%',
    marginVertical: '2%',
  },
  textInput: {
    flex: 1,
    marginHorizontal: '2%',
    padding: 4,
    color: colors.white
  },
  smallIcons: {
    color: colors.lighterGray,
    fontSize: 16,
  },
  remove: {
    backgroundColor: colors.red,
    padding: 2,
    justifyContent: 'center'
  },
  removeIcon: {
    color: colors.white,
    fontSize: 44,
  }
})