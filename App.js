import React from 'react';
import { StyleSheet, View, StatusBar} from 'react-native';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import Reducers from './reducers';
import Middlewares from './middlewares';
import { Constants } from 'expo';
import Navigators from './Navigators'
import Main from './src/views/Main';
import { colors } from './src/utils/variables';
import initialState from './actions/initial'
import devToolsEnhancer from 'remote-redux-devtools';

if (__DEV__) {
  require('react-devtools');
  require('react-devtools-core').connectToDevTools()
}

const store = createStore(Reducers, initialState, Middlewares);

export default function App () {
  return (
    <Provider store={store}>
      <View style={styles.container}>
         <StatusBar barStyle="light-content" />
         <Navigators />
      </View>
      
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
