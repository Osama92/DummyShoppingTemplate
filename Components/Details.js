// import React, { Component } from 'react';
// import { View, Text, StyleSheet, TextInput,Keyboard,KeyboardAvoidingView, Platform, Dimensions, SafeAreaView } from 'react-native';


// const screenHeight = Dimensions.get('screen').height
// const screenWidth = Dimensions.get('screen').width

// class Details extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     };
//   }

//   render() {
//     return (
//       <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : null}>
//         <SafeAreaView style={styles.container}>
//         <View style={styles.greetingView}>
//           <Text style={{fontWeight:'700', color:'#333', fontSize: 50}}>Hi there!</Text>
//           <Text>Username</Text>
//           <Text style={{color:'#333', fontSize:20, fontWeight:'600'}}>Let's get to know you better.</Text>
//         </View>
//         <View style={styles.detailholder}>
//           <View style={styles.address}></View>
//           <View style={styles.phone}>
//             <Text style={{fontSize:20, fontWeight:'700', color:'grey'}}>We would love to here from you</Text>
//             <View style={{flexDirection:'row'}}>
//               <Text style={{fontSize:20, fontWeight:'500', color:'#333'}}>Phone</Text>
//               <TextInput style={{width:'80%', height:50, borderBottomColor:'#333',borderBottomWidth:0.5}}/>
//             </View>
//           </View>
//         </View>
//         </SafeAreaView>
        
//       </KeyboardAvoidingView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
    
//   },
//   greetingView: {
//     width: '100%',
//     height: screenHeight/6,
//     //backgroundColor:'grey',
//     justifyContent:'space-around',
//     paddingLeft:10
//   },
//   detailholder: {
//     width: '100%',
//     height: screenHeight/1.4,
//     backgroundColor:'yellow',
//     justifyContent:'center',
//     alignItems:'center'
//   },
//   footer: {
//     width:'100%',
//     height:'10%',
//     backgroundColor:'orange'
//   },
//   address: {
//     width:'95%',
//     height:screenHeight/1.8,
//     backgroundColor:'#fff'
//   },
//   phone: {
//     width:'95%',
//     height: screenHeight/8,
//     backgroundColor:'#fff',
//     marginTop:10
//   }
// });

// export default Details;

import React, { Component } from "react";
import { Button, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet,Text, TextInput, TouchableWithoutFeedback, View, Alert } from "react-native";
import firebase from 'firebase'

class Details extends Component {

  constructor(props) {
        super(props);
        this.state = {
          name: '',
          Address: '',
          Additional: '',
          phone:'',
          data: []
         };
       }


       

  componentDidMount() {
    var user = firebase.auth().currentUser
    var name, email, photoUrl, phone
 
    if (user != null) {
      name = user.displayName
      this.setState({name:name})
      photoUrl =  user.photoURL
      this.setState({photo:photoUrl+'?height=600'})
      email = user.email
      console.log(email)
      this.setState({email:email})

    
      
    }
    

   }

   handleAddress = (text) => {
     this.setState({Address:text})
   }
   handleAdditional = (text) => {
    this.setState({Additional:text})
  }
  handlePhone = (text) => {
    this.setState({phone:text})
  }

  submit = () => {
    if (this.state.Address != '' && this.state.phone != '') {
      firebase.database().ref('user/details').set({
        Name: this.state.name,
        Address: this.state.Address ,
        Phone: this.state.phone
        
    }).then(
        ()=> {
          this.props.navigation.navigate('Home')
        }
    ).catch((error)=>{
        console.log(error)
    })
    } else {
      Alert.alert(
        'MISSING FIELDS',
        'Oops! Please ensure "Address field and Phone number field" are correct.Thank you!',
        [{
          text: 'ok',
          
        }],
        {cancelable: false}
      )
    }
    }
  



     render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={{ flex: 1 }}
            >
                <SafeAreaView style={styles.container}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.inner}>
                            <Text style={styles.header}>
                                Hi there!
                            </Text>
                            <Text style={{fontWeight:'600',fontSize:17,color:'#333'}}>
                                {this.state.name}
                            </Text>
                            <Text style={{fontWeight:'600',fontSize:20,color:'silver',marginBottom:20}}>
                            Let's get to know you better.
                            </Text>
                            <TextInput
                                onChangeText={this.handleAddress}
                                autoCorrect={false}
                                placeholder="Address"
                                style={styles.input}
                            />
                            <TextInput
                                onChangeText={this.handleAdditional}
                                autoCorrect={false}
                                placeholder="Additional Information"
                                style={styles.input}
                            />
                            <TextInput
                                onChangeText={this.handlePhone}
                                keyboardType={'numeric'}
                                placeholder="Phone number"
                                style={styles.input}
                            />
                            <View style={styles.btnContainer}>
                                <Button title="Submit" onPress={() =>this.submit()} color='#fff' />
                            </View>
                            <Text style={{textAlign:'center', color: 'grey',marginTop:10}}>We know how much you value your data,your data is safe with us.Information collected here is solely for delivery of items purchased on this platform.</Text>
                            <View style={{ flex : 1 }} />
                        </View>
                    </TouchableWithoutFeedback>
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "flex-end",
    },
    header: {
        fontSize: 36,
        marginBottom: 48,
        fontWeight:'700'
    },
    input: {
        height: 40,
        borderColor: "#000000",
        borderBottomWidth: 1,
        marginBottom: 36,
    },
    btnContainer: {
        backgroundColor: "#333",
        marginTop: 12,
    },
});

export default Details;