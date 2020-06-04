import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import Home from './Screens/Home'
import Flour from './Components/Flour'
import Profile from './Components/Profile'
import Oils from './Components/Oils'
import Details from './Components/Details'
import CatMenu from './Components/CatMenu'
import Cart from './Screens/Cart'
import CheckOut from './Screens/CheckOut'
import firebase from 'firebase'
import LogIn from './Screens/LogIn';
import Sections from './Screens/Sections';


const Stack = createStackNavigator()

class Index extends Component {

 
 

 

  

  render() {
    
    return (
        <NavigationContainer>
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name='LogIn' component={LogIn}/>
          <Stack.Screen name='Home' component={Home}/>
          <Stack.Screen name='Details' component={Details}/>
          <Stack.Screen name='Oils' component={Oils}/>
          <Stack.Screen name='Profile' component={Profile}/>
          <Stack.Screen name='Sections' component={Sections}/>
          <Stack.Screen name='CatMenu' component={CatMenu}/>
          <Stack.Screen name='Cart' component={Cart}/>
          <Stack.Screen name='CheckOut' component={CheckOut}/>
          
        </Stack.Navigator>
    </NavigationContainer>
    );
  }
}

export default Index;
