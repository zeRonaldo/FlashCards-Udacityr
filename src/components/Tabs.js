import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../utils/variables';

export const Tabs = (props) => {
    return (
      <View style={styles.container}>
          {props.tabs.map(tab => 
            <TouchableOpacity onPress>
                {tab.icon}
            </TouchableOpacity>
          )}
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.blue
    }
})