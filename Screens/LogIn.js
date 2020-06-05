import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated, TouchableOpacity, Alert, Image } from 'react-native';
import firebase from 'firebase'
import * as Facebook from 'expo-facebook'




class LogIn extends Component {


  componentDidMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyCUdnkw82O5UtEiGphWG9iM-sF-LgAPFjg",
      authDomain: "alubarika-28416.firebaseapp.com",
      databaseURL: "https://alubarika-28416.firebaseio.com",
      projectId: "alubarika-28416",
      storageBucket: "alubarika-28416.appspot.com",
      messagingSenderId: "391925263393",
      appId: "1:391925263393:web:71eda9910a8278a051c760",
      measurementId: "G-9871R0GPEL"
    };
   // Initialize Firebase
    if(!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    //firebase.analytics();
    this.getUsername()
    
  }

    

    state = {
        name: ''
    }


   

    getUsername =()=> {
        firebase.auth().onAuthStateChanged((user)=> {
            if (user != null) {
                console.log(user.displayName)
                // this.props.navigation.navigate('Home')
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
      
    return (
      <View style={styles.container}>

        <View style={styles.logoView}>
          <Image source={require('../assets/logo1.png')}/>
          <Image source={require('../assets/bag.png')} style={{width:350, height:350}}/>
        </View>
        <View style={styles.buttonView}>
        
          <Text style={{color:'#333', fontSize:25, fontWeight: '700'}}>Continue with:</Text>
          

          <TouchableOpacity onPress={()=>this.signOut()}>
          <Text style={{color:'#333'}}>signOut</Text>
          </TouchableOpacity>
          <TouchableOpacity   onPress={()=>this.logIn()}
                              style={{width:100, height:100, borderRadius: 50, backgroundColor:'#fff',alignItems:'center', justifyContent:'center'}}>
            <Image source={require('../assets/facebookC.png')} style={{width:60, height:60}}/>
          </TouchableOpacity>
        </View>
         
          
        
      </View>
    );
  }
}

// onPress={()=>{this.logIn(); this.getUsername()}}

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
     },
     logoView: {
      width: '100%',
      height:'70%',
      //backgroundColor: 'green',
      alignItems:'center',
      justifyContent:'center'
     },
     buttonView: {
      flex:1,
      width: '100%',
      height:'30%',
      backgroundColor: '#f3f3f3',
      justifyContent:'center',
      alignItems:'center',
      borderTopLeftRadius:30,
      borderTopRightRadius:30
     }

});

export default LogIn;
