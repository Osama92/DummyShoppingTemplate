import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {connect} from 'react-redux'

class Total extends Component {
 
    state={
        Total: 0
    }

    renderProducts = (products) => {
        return products.map((item, index) => {
            const price = item
            //this.state.Total += price
            const total = products.reduce((prev, next)=> prev + next.price,0)
            this.state.Total = total
            console.log(total)
            
        })
    }
           
        
      

  render() {
      
    return (
      <View style={styles.container}>
        <Text style={styles.TotalText}>Total</Text>
        {/* {this.renderProducts(this.props.products)} */}
        
        {this.props.products.length > 0 ? 
            
            <Text style={styles.amountText}>N: {this.props.total}.00</Text>
           
          : <Text style={styles.emptyCart}>N: 0.00</Text>}
          
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    height:60, 
    //backgroundColor:'green', 
    width:'100%', 
    flexDirection:'row', 
    justifyContent:'space-around', 
    alignItems:'center'
  },
  TotalText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'grey'
  },
  amountText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'grey'
  },
  emptyCart: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'grey'
  }
})


// const mapStateToProps = (state)=>{
//   return {
//     total: state.reduce((prev, next)=> prev + next.price,0)
//   }
// }




export default Total;
