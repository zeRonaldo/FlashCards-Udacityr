import React from 'react'
import { View, Text } from 'react-native'
import {Constants} from 'expo'

const TopBar = () => {
    return (
        <View style={styles.container}>
            {this.props.left}
            {this.props.right}
        </View>
    )
}

export default TopBar

const styles = StyleSheet.create({
    container:{
        paddingTop: Constants.statusBarHeight,
        flex: .8
    }
})