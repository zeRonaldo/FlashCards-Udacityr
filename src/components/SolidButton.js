import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import { colors, shadows, shadowsPre } from '../utils/variables';


export default class SolidButton extends Component{
    constructor (props) {
        super(props);
        this.state = {
            text : '',
            style_input : {},
            color: this.props.color
        }
    }

   

    render(){
        const {style_input, color} = this.state;
        let btnColor ;

        if (typeof color !== 'undefined'){
            btnColor = {backgroundColor : color}
        }

        return (
            <View style={styles.container}>
                <TouchableOpacity style={[styles.button, btnColor ]} onPress={()=> this.props.pressed()} >
                    <Text style={styles.buttonText}>{this.props.buttonText}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button:{
        width: '70%',
        height: 45,
        margin: 15,
        borderRadius: 25,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: colors.lightBlue,
        
        elevation: 5,
    },
    buttonText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 18,
        ...shadowsPre.buttonShadow,
        elevation: 2,
    }

  })