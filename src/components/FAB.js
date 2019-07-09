import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity} from 'react-native'
import { Icon }from 'native-base'
import {colors} from '../utils/variables'

export default FAB= (props) => {
        return (
           
            <TouchableOpacity style={[styles.fab, {backgroundColor: props.color}]} onPress={() => props.action()}>
                <Icon
                    type={props.icon.type}
                    name={props.icon.name}
                    style={styles.fabIcon}
                />
            </TouchableOpacity>
        
        )
}


const styles = StyleSheet.create({
    fab: {
        backgroundColor: colors.lightBlue,
        width: 90,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center",
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
  
    },
    fabIcon: {
      color: colors.white, 
      fontSize: 60,
      textShadowColor: colors.lightGray,
      textShadowOffset: {
          width: 0,
          height: 1,
      },
      textShadowRadius: 4
    }
})