import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import Home from './Screens/Home'
import Flour from './Components/Flour'
import Noodles from './Components/Noodles'
import Oils from './Components/Oils'
import Pasta from './Components/Pasta'
import CatMenu from './Components/CatMenu'
import Cart from './Screens/Cart'

const Stack = createStackNavigator()

class Index extends Component {
 

  render() {
    return (
        <NavigationContainer>
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name='Home' component={Home}/>
          <Stack.Screen name='Pasta' component={Pasta}/>
          <Stack.Screen name='Oils' component={Oils}/>
          <Stack.Screen name='Noodles' component={Noodles}/>
          <Stack.Screen name='Flour' component={Flour}/>
          <Stack.Screen name='CatMenu' component={CatMenu}/>
          <Stack.Screen name='Cart' component={Cart}/>
        
        </Stack.Navigator>
    </NavigationContainer>
    );
  }
}

export default Index;
