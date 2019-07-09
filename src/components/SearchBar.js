import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput} from 'react-native'
import {connect} from 'react-redux';
import { Icon } from 'native-base';
import { colors } from '../utils/variables';
import {setSearch} from '../../actions/index'
import { Constants} from 'expo'
class SearchBar extends Component {
    state = {
       using: false,
       style_input: {}
      };
        onBlur = () => {
        this.setState({ ...this.state, using:false, style_input: {} });
       }
     
       onFocus = () =>{
         this.setState({ ...this.state, using:true, style_input:  styles.textInput_onFocus });
       }

       onInputChange = (text) => {
        this.props.dispatch(setSearch(text))
      }

        clearSearch = () => {
            this.props.dispatch(setSearch(''))
            this.refs['searchBar'].blur()
            this.onBlur()
        }
    render() {
        const {using, style_input} =this.state
        return (
            <View style={[styles.textInput, style_input]}>
                {!using &&
                    <Icon
                        type="AntDesign"
                        name="search1"
                        style={{fontSize: 18, paddingLeft: 4, color: colors.lightGray}}
                    />
                }
                
                <TextInput 
                placeholder="Find a Deck by name or Description..."
                onChangeText={ text => this.onInputChange(text)}
                placeholderTextColor={colors.lightGray}
                value={this.props.search}
                ref="searchBar"
                style={styles.input}
                onBlur={ () => this.onBlur()}
                onFocus={ () => this.onFocus()}
                />
                {using &&
                    <Icon
                    type="AntDesign"
                    name="closecircleo"
                    onPress={()=> this.clearSearch()}
                    style={{fontSize: 18, paddingRight: 4, color: colors.red}}
                    />
                }
            </View>
            
        )
    }
}
const mapStateToProps = ({search}) => { return { search }}
export default connect(mapStateToProps)(SearchBar)

const styles = StyleSheet.create({
    textInput: {
        width: '90%',
        marginTop: Constants.statusBarHeight+2,
        paddingHorizontal: '1%',
        height: 40,
        marginVertical: 10,
        borderRadius: 25,
        backgroundColor: colors.fg,
        color: colors.lightGray,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row'
      },
      input:{
          flex: 1,
          marginHorizontal:'3%'
      },
      textInput_onFocus: {
        backgroundColor: colors.lighterGray,
        paddingHorizontal: '1%',
        paddingLeft:'5%',
        color: colors.fg,
        height: 40,
        padding: 0
      },
})