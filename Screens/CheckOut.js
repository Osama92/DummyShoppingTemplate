import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert } from 'react-native';
import {connect} from 'react-redux'
import firebase from 'firebase'



const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class CheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.cartItems,
      total: this.props.total,
      trackingNo: this.makeTrackingNumber(8),
      name: '',
      Address:'',
      Phone:''
    };
  }

  confirmOrder = () => {
      Alert.alert(
        'ORDER CONFIRMED',
        'Dear customer, Thank you for shopping with us. A confirmation text containing your order number'+' '+ this.state.trackingNo + ' ' + 'will be sent to you shortly.',
        [{
          text: 'ok',
          onPress: ()=>{this.props.clear(this.props.cartItems); this.props.navigation.navigate('Home'); this.firebaseWrite()}
        }],
        {cancelable: false}
      )
  }

  readData = ()=> {
    firebase.database().ref('user/details').once('value').then((snapShot)=> {
      var Address = snapShot.child('Address').val()
      this.setState({Address:Address})
      var Phone = snapShot.child('Phone').val()
      this.setState({Phone:Phone})
    })
  }

  firebaseWrite = ()=> {
       //FIREBASE WRITE:
    firebase.database().ref('user/' + this.state.name + '/' + this.state.trackingNo).set({
      Item: this.state.item ,
      Total: this.state.total
  }).then(
      ()=> {
          console.log('Inserted')
      }
  ).catch((error)=>{
      console.log(error)
  })
  }

  makeTrackingNumber = (lenght) => {
      var result = ''
      var character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      var characterLenght = character.length
      for (var i = 0; i < lenght; i++) {
        result += character.charAt(Math.floor(Math.random() * characterLenght))
      }
      return result
  }


  componentDidMount() {
    var user = firebase.auth().currentUser
    var name
 
    if (user != null) {
      name = user.displayName
      this.setState({name:name})
     
      
    }
    this.readData()
   }


  render() {
   


    return (
      <View style={styles.container}>
       <View style={styles.headerView}>
         <TouchableOpacity style={styles.backView} onPress={()=>this.props.navigation.navigate('Cart')}>
           <Image source={require('../assets/smallback.png')} style={{width: 30, height:'100%', tintColor:'#fff'}}/>
           <Text style={{fontSize: 16, color: '#fff', fontWeight:'600'}}>Back to cart</Text>
         </TouchableOpacity>
         <View style={styles.checkOutView}>
            <Text style={styles.Text}>CheckOut</Text>
         </View>
       </View>

        <View style={styles.shippingView}>
          <View style={{flexDirection: 'row', paddingLeft: 40, marginTop: 10}}>
            <Text style={{fontSize: 25, fontWeight: '700'}}>1.</Text>
            <Text style={{fontSize: 25, fontWeight: '700'}}> Shipping</Text>
            <TouchableOpacity style={{width:'50%', alignItems:'flex-end', justifyContent:'center'}} onPress={()=>this.props.navigation.navigate('Details')}>
              <Text style={{fontWeight:'700', color:'#333'}}>Edit</Text>
            </TouchableOpacity>
          </View>
          <Text style={{paddingLeft:40}}> Delivery Address</Text>
          <Text style={{paddingLeft:40, color: 'grey', textAlign:'left', width:'90%', fontSize:20, paddingTop:10}}>{this.state.Address}</Text>
          <Text style={{paddingLeft:40, color: 'grey', textAlign:'left', width:'90%',fontSize:20, fontWeight:'700'}}>{this.state.Phone}</Text>
        </View>





        <View style={styles.paymentView}>
        <View style={{flexDirection: 'row', paddingLeft: 40, marginTop: 10}}>
            <Text style={{fontSize: 25, fontWeight: '700'}}>2.</Text>
            <Text style={{fontSize: 25, fontWeight: '700'}}> Payment</Text>
          </View>
          <Text style={{paddingLeft:40}}> Choose a Payment Method</Text>
        </View>




        <View style={styles.reviewView}>
          <View style={{flexDirection: 'row', paddingLeft: 40, marginTop: 10}}>
            <Text style={{fontSize: 25, fontWeight: '700'}}>3.</Text>
            <Text style={{fontSize: 25, fontWeight: '700'}}> Review</Text>
          </View>
    <Text style={{paddingLeft:40}}> Subtotal----------------- ₦{this.props.total}.00</Text>
          <Text style={{paddingLeft:40}}> Shipping----------------- ₦0.00 </Text>
          <Text style={{paddingLeft:40}}> Total----------------- ₦{this.props.total}.00</Text>
        </View>

        <TouchableOpacity onPress={()=>this.confirmOrder()}
                            style={{width:screenWidth/1.3, height: 60, backgroundColor: '#1b9cfc', alignItems:'center', justifyContent:'center', borderRadius:4, marginTop: 10}}>
            <Text style={styles.footerText}>Place Order</Text>
            
          </TouchableOpacity>
       <TouchableOpacity>
        <Text style={{fontSize: 12}}>Terms and Conditions</Text>
       </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
      
        
    },
    headerView: {
      backgroundColor: '#1b9cfc',
      width: '100%',
      height: screenHeight/5,
      flexDirection:'column'
    },
    backView: {
      flexDirection: 'row',
      width: '100%',
      //backgroundColor: 'blue',
      height: '30%',
      marginTop: 40,
      padding: 10
    },
    checkOutView: {
      justifyContent:'center',
      height: '40%',
      //backgroundColor: 'yellow',
    },
    Text: {
      fontSize: 40,
      fontWeight: '700',
      paddingLeft: 15,
      color: '#fff'
    },
    shippingView: {
      height: screenHeight/4,
      width: '100%',
      //backgroundColor: 'green'
    },
    paymentView: {
      height: screenHeight/5,
      width: '100%',
     // backgroundColor: 'yellow'
    },
    reviewView: {
      height: screenHeight/5,
      width: '100%',
      //backgroundColor: 'orange'
    },
    footerText:{
      fontSize: 20,
      fontWeight: '700',
      color: '#fff'
    },
});

const mapStateToProps = (state) => {
  return {
    cartItems: state,
    total: state.reduce((prev, next)=> prev + next.price * next.qty,0)
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    clear: (product)=>dispatch({type: 'CLEAR', payload:product})
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(CheckOut);
