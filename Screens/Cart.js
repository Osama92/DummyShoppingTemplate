import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image, ImageBackground } from 'react-native';
import Products from '../Components/Products'
import {connect} from 'react-redux';
import Total from '../Components/Total'
import MyCart from '../Components/MyCart'
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height



class Cart extends Component {



  renderEmptyCart = () => (
    <View style={{flexDirection:'column', alignItems:'center'}}>
      <Image source={require('../assets/cart.png')}
             style={styles.image}/>
      <Text style={{color:'black', fontSize: 13, fontWeight:'500'}}>No items in your cart, Go back to shop.</Text>
    </View>
  )
 
  

  render() {
    
    return (
      <View style={styles.container}>
       
       <ImageBackground  source={require('../assets/images/image3.jpg')}
                          style={{width: '100%', height: 140, justifyContent:'center', alignItems:'center'}}>
                    <View style={{width: '100%',flexDirection: 'row', justifyContent:'space-around'}}>
                    <Text style={styles.headerText}>My Cart</Text>
                    <View style={styles.cartItem}></View>
                    </View>
            

        </ImageBackground>
          
     

          <View style={{width:'100%', flex:1, alignItems:'center', justifyContent:'center'}}>
          {this.props.cartItems.length > 0 ? 
            
            <Products onPress={this.props.removeItem} products={this.props.cartItems} onInc={this.props.increaseCounter} onDec={this.props.decreaseCounter}/>
           
          : this.renderEmptyCart()}
          </View>
          
          
          <Total products={this.props.cartItems} total={this.props.total}/>

          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')}
                            style={{width:screenWidth/1.3, height: 40, backgroundColor: '#ff7566', alignItems:'center', justifyContent:'center', borderRadius:4}}>
            <Text style={styles.footerText}>Go Back to Shopping</Text>
            
          </TouchableOpacity>

          
            
          
      </View>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      cartItems: state,
      total: state.reduce((prev, next)=> prev + next.price * next.qty,0)
    }
  }
 
 
const mapDispatchToProps = (dispatch)=> {
  return {
    removeItem: (product)=>dispatch({type: 'REMOVE_FROM_CART', payload: product}),
    increaseCounter: (products)=> dispatch({type: 'INCREASE', payload: products}),
    decreaseCounter: (products)=> dispatch({type: 'DECREASE', payload: products})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //flexDirection:'column',
    backgroundColor:'#fff'
  },
  headerText:{
    fontSize: 45,
    fontWeight: 'bold',
    color:'white'
},
footerText:{
  fontSize: 17,
  fontWeight: 'bold',
  color: 'white'
},
image:{
  width: 130,
  height: 130,
  tintColor:'grey'
},
cartItem: {
  backgroundColor: '#fff',
  width: 60,
  height: 60,
  borderRadius: 30,
  justifyContent: 'center',
  alignItems:'center'
  
}
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
