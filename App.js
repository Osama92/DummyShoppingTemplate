import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Index from './Index'
import {Provider} from 'react-redux'
import store from './store'

class App extends Component {
 

  render() {
    return (
      <Provider store={store}>
          <Index/>
      </Provider>
    
    );
  }
}

export default App;

