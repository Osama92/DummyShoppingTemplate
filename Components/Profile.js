import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import firebase from 'firebase'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      photo: 'https://graph.facebook.com/10214339220712649/picture',
      email:''
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.backView}>
          <View style={{flexDirection: 'column', width: '100%', justifyContent:'center', flex: 1, padding:10}}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')}>
              <Text style={{fontWeight:'600'}}>Go back to home</Text>
            </TouchableOpacity>
            <Text style={{fontSize:40, fontWeight: '800', color: '#333'}}>Hey there!</Text>
          </View>
        </View>
        <View style={styles.profile}>
          <View style={styles.profilePicture}>
            <Image source={{uri:this.state.photo}} style={styles.profilePicture}/>
          </View>
        </View>
        <View style={styles.details}>
          <View style={styles.accountD}>
            <Text style={{color:'#333', paddingLeft: 10, fontSize: 20,fontWeight: '800'}}>Account Details</Text>
              <View style={{flexDirection:'row', height: '50%', justifyContent:'space-around'}}>
                <Text style={{color:'#333', fontSize: 15, fontWeight: '600'}}>Display Name:</Text>
    <Text style={{color:'#333', fontSize: 13, fontWeight: '600', textAlign:'left'}}>{this.state.name}</Text>
              </View>
          </View>
          <View style={styles.Address}>
            <Text style={{color:'#333', paddingLeft: 10, fontSize: 20,fontWeight: '800'}}>Delivery Details</Text>
            <Text style={{color:'#333', paddingLeft: 10, fontSize: 14,fontWeight: '600'}}>Your default shipping address:</Text>
            <Text style={{paddingLeft:10,paddingTop:10}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
          </View>
          <View style={styles.phone}>
          <Text style={{color:'#333', paddingLeft: 10, fontSize: 20,fontWeight: '800'}}>Contact Details</Text>
          <View style={{flexDirection:'row', justifyContent:'space-around', paddingBottom:10}}>
          <Text style={{color:'#333', fontSize: 15, fontWeight: '600'}}>Phone number:</Text>
          <Text style={{color:'#333', fontSize: 15, fontWeight: '600'}}>2346253635363</Text>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-around'}}>
          <Text style={{color:'#333', fontSize: 15, fontWeight: '600'}}>Email address:</Text>
          <Text style={{color:'#333', fontSize: 15, fontWeight: '600'}}>{this.state.email}</Text>
          </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems:'center'
  },
  backView: {
    width: '100%',
    height: '20%',
    //backgroundColor: 'grey'
  },
  profile: {
    width: '100%',
    height: '30%',
    //backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    width: '100%',
    height: '50%',
   // backgroundColor: 'red'
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode:'cover'
    //backgroundColor: 'grey',
  },
  accountD: {
    width:'100%',
    height:'20%',
    //backgroundColor:'black',
    justifyContent:'center',
    borderBottomWidth:0.5,
    borderBottomColor:'#333'
  },
  Address: {
    width: '100%',
    height:'50%',
    //backgroundColor: 'yellow',
    borderBottomWidth:0.5,
    borderBottomColor:'#333'
  },
  phone: {
    width:'100%',
    height: '30%',
    //backgroundColor: 'orange'
  }
});

export default Profile;

