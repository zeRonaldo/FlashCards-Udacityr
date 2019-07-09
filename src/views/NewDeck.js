import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import {connect} from 'react-redux';
import { Actions } from "react-native-router-flux";
import {withFormik} from 'formik';
import SolidButton from '../components/SolidButton';
import { colors } from '../utils/variables';
import { Left, Icon } from 'native-base';
import { newDeck } from '../../actions';

 class NewDeck extends Component {
  state = {
    title: '',
    description: ''
  };
  
  onBlur = () => {
   this.setState({ ...this.state, style_input: {} });
  }

  onFocus = () =>{
    this.setState({ ...this.state, style_input:  styles.textInput_onFocus });
  }

  render() {
    const {style_input} = this.state
    const {values, handleSubmit, setFieldValue} = this.props
    return (
      <View style={styles.container}>
      <View style={{flex: .8}}>
        <Left style={styles.left}>
          <Icon
            type="SimpleLineIcons"
            name="arrow-left"
            style={styles.icon}
            onPress={() => Actions.pop()}
          />
        </Left>
      </View>
      
      
        <View style={{flex:5, alignContent: 'center', justifyContent: 'center', alignItems:"center"}}>
            <Text style={styles.title}>Create a New Deck</Text>
            <Text   style={{color:colors.lightGray}}> Add a name for your Deck, it may be the subject or theme of the quizz</Text>
            <TextInput
              placeholder="Deck Title"
              style={[ styles.textInput , style_input]}
              onChangeText={ text => setFieldValue('title', text)}
              value={values.title}
              
            />
            <TextInput
              placeholder="Description"
              style={[ styles.textInput , style_input]}
              onChangeText={ text => setFieldValue('description', text)}
              value={values.description}
              onFocus={() => this.onFocus()} 
              onBlur={() => this.onBlur()}
            />
        </View>
        
        <View style={{flex: 1}}>
         
              <SolidButton  pressed={handleSubmit}  buttonText='Create Deck' color={colors.lightBlue}/>
            
        </View>
      </View>
    );
  }
}

export default withFormik({
  mapPropsToValues: () => ({ title: '', description: '' }),

  handleSubmit: (values) => {
    Actions.push("editdeck", {title: values.title, description: values.description, newDeck: true});
  }
})(NewDeck)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    flexDirection: "column",
    backgroundColor: colors.bg,
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
    backgroundColor: colors.lightGray,
    color: colors.bg,
    height: 40,
    padding: 0
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"flex-start",
    paddingLeft: 10,
    backgroundColor: colors.bg,
    width: '100%',
    height: 20
  },
  icon: { margin: 5, color: colors.lightBlue },
});
