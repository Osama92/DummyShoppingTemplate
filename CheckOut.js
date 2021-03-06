import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';





const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class CheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
          </View>
          <Text style={{paddingLeft:40}}> Delivery Address</Text>
          <Text style={{paddingLeft:40, color: 'grey', textAlign:'left', width:'90%'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
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
          <Text style={{paddingLeft:40}}> Subtotal-----------------</Text>
          <Text style={{paddingLeft:40}}> Shipping-----------------</Text>
          <Text style={{paddingLeft:40}}> Total-----------------</Text>
        </View>

        <TouchableOpacity onPress={()=>this.props.navigation.navigate('CheckOut')}
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

export default CheckOut;
