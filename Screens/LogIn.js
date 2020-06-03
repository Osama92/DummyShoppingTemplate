import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated, TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase'
import * as Facebook from 'expo-facebook'

var provider = new firebase.auth.FacebookAuthProvider()


class LogIn extends Component {
    constructor(props) {
        super(props)

        this.handlePressIn = this.handlePressIn.bind(this)
        this.handlePressOut = this.handlePressOut.bind(this)
    }

    state = {
        name: ''
    }


    handlePressIn() {
        Animated.spring(this.animatedValue, {toValue: .5}).start()
    }

    handlePressOut() {
        Animated.spring(this.animatedValue, {toValue: 1, friction: 2, tension: 50}).start()
    }

    // componentDidMount() {
    //     // this.animatedValue = new Animated.Value(1);
    //     firebase.auth().onAuthStateChanged((user)=>{
    //         if (user != null) {
    //             console.log(user)
    //         }
    //     })

    // }

    

    // async loginWithFacebook() {

    //     const {type, token} = await Facebook.logInWithReadPermissionsAsync('566325950929908', {permissions: ['public_profile', 'email']})
    //     if (type === 'success') {
            
               
            
    //         const credential = firebase.auth.FacebookAuthProvider.credential(token)
    //         firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {console.log(error)})
           
    //     }
        
    // }

    getUsername =()=> {
        firebase.auth().onAuthStateChanged((user)=> {
            if (user != null) {
                console.log(user.displayName)
                this.props.navigation.navigate('Home')
                this.setState({name: user.displayName})
            } else {
                this.setState({name: ''})
            }
        })
    }

    async logIn() {
        try {
          await Facebook.initializeAsync('566325950929908');
          const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
          } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile', 'email'],
          });
          if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
            Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
            const credential = firebase.auth.FacebookAuthProvider.credential(token)
            firebase.auth().signInWithCredential(credential).catch((error) => {console.log(error)})
            
          } else {
            // type === 'cancel'
          }
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
        }
      }

      signOut=()=> {
          firebase.auth().signOut().then(function() {
              console.log('Signed Out')
          }).catch(function(error) {
              console.log(error)
          })
      }

  render() {
      const animatedStyle = {
          transform: [{scale: this.animatedValue}]
      }

     
    return (
      <View style={styles.container}>
          {/* <TouchableWithoutFeedback
                onPressIn={this.handlePressIn}
                onPressOut={this.handlePressOut}>
          <Animated.View style={[styles.button, animatedStyle]}>
            <Text style={{color:'#fff'}}>Login</Text>
            </Animated.View>
          </TouchableWithoutFeedback> */}

          <TouchableOpacity onPress={()=>{this.logIn(); this.getUsername()}}>
          <Text style={{color:'#333'}}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>this.signOut()}>
          <Text style={{color:'#333'}}>signOut</Text>
          </TouchableOpacity>
        <Text>{this.state.name}</Text>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#fff'

    },
     button: {
         backgroundColor:'#333',
         width: 100,
         height: 50,
         justifyContent:'center',
         alignItems:'center'
     }
});

export default LogIn;
