import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, Image, StatusBar, TouchableOpacity } from 'react-native';
import MyCart from '../Components/MyCart'
import {connect} from 'react-redux'

const screenHeight = Dimensions.get('screen').height
const screenWidth = Dimensions.get('screen').width

class Oils extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item:  this.props.route.params.viewClicked
    };
  }



  renderProducts = (item) => (
    
    <View style={styles.container}>
       <View style={styles.view1}>
       <ImageBackground  source={item.image}
                          resizeMode='cover'
                          style={styles.imgBack}>
          <View style={styles.headerView}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')} style={styles.back}>
              <Image  style={{width: 25, height: 25, tintColor:'#1b9cfc'}}
                      source={require('../assets/leftBtn.png')}/>
            </TouchableOpacity>
            <View style={styles.cart}>
              <View style={styles.cartIcon}>
                <MyCart count={this.props.cartItems.length}/>
              </View>
            </View>
          </View>
        </ImageBackground>
       </View>
      <View style={styles.view2}>

<View style={styles.view2sub1}>
    <View style={styles.descriptionView}>
      <Text style={styles.TextBig}>{item.name}</Text>
    </View>
    <View style={styles.price}>
        <Text style={styles.TextBig2}>₦{item.price}:00</Text>
    </View>
</View>

<View style={styles.view2sub2}>
  <View style={styles.label}>
    <Text style={{color: '#1b9cfc', fontSize: 17, fontWeight: '600'}}>Details</Text>
  </View>
  <View style={styles.description}>
    <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
  </View>
  
  <TouchableOpacity style={styles.add} onPress={()=>this.props.addItemToCart(item)}>
    <Text style={{fontSize: 20, color: 'white', fontWeight:'600'}}>Add to cart</Text>
  </TouchableOpacity>
</View>
</View>
    </View>
  )

  render() {
    console.log(this.props.route.params.viewClicked)
    return (
      <View style={styles.container}>
        {this.renderProducts(this.state.item)}
        <StatusBar barStyle='dark-content'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //width: screenWidth,
    //height:screenHeight,

  },
  view1: {
    width: '100%',
    height: '50%',
    backgroundColor: 'white',
  },
  view2: {
    width: '100%',
    height: '50%',
    backgroundColor: '#f3f3f3',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
    
  },
  view2sub1: {
    flexDirection: 'row',
    width: '100%',
    height: '40%',
    justifyContent:'center'
    //backgroundColor: 'orange'
  },
  view2sub2: {
    width: '100%',
    height: '60%',
   // backgroundColor:'tomato'
  },
  descriptionView: {
    width:'50%',
    //backgroundColor: 'green',
    padding: 10
  },
  price: {
    width:'50%',
    //backgroundColor: 'red',
    padding: 10
  },
  label: {
    height: '10%',
   // backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  description: {
    height: '30%',
   // backgroundColor: 'yellow',
    justifyContent:'center',
    padding: 10
  },
  counter: {
    height: '20%',
    //backgroundColor: 'blue',
    justifyContent:'center',
    alignItems:'center'
  },
  add: {
    height: 60,
    backgroundColor: '#1b9cfc',
    margin: 10,
    borderRadius: 10,
    justifyContent:'center',
    alignItems: 'center'
  },
  TextBig: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  TextBig2: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#1b9cfc'
  },
  headerView: {
    height: '20%',
    width: '100%',
    //backgroundColor: 'tomato',
    //marginTop: 10,
    flexDirection: 'row'
  },
  back: {
    width: '50%',
    //backgroundColor: 'white',
    justifyContent:'center', 
    padding: 10
  },
  cart: {
    width: '50%',
   // backgroundColor: 'pink',
    justifyContent:'center', 
    alignItems:'flex-end',
    padding: 10,
  },
  imgBack: {
    width: '100%',
    height: '100%',
    marginTop: 30
  },
  cartIcon: {
    backgroundColor: '#f3f3f3',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems:'center'
  }
});


const mapStateToProps = (state) => {
  return {
    cartItems: state
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    addItemToCart: (product) => dispatch({type: 'ADD_TO_CART', payload: product}),
    

   
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Oils);
