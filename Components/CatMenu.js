import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class CatMenu extends Component {
  

  render() {
    return (
        <View style={styles.catViewMain}>
            <Text style={styles.catHeaderText}>Choose a category:</Text>
             <View style={styles.catView}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Oils')}>
            <Text style={styles.catText}>Oils</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Pasta')}>
            <Text style={styles.catText}>Pasta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Noodles')}>
            <Text style={styles.catText}>Noodles</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Flour')}>
            <Text style={styles.catText}>Flour</Text>
        </TouchableOpacity>
    </View>
        </View>
       
    );
  }
}

const styles = StyleSheet.create({
    catView: {
        height: '100%',
        width: '100%',
        backgroundColor:'#fff',
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems:'center',
        paddingBottom: 10
    },
    catText: {
        //fontWeight: 'bold',
        color: 'grey'
    },
    catViewMain: {
        height: '9%',
        width: '100%',
        backgroundColor:'#fff',
        flexDirection: 'column',
        // justifyContent:'space-around',
        // alignItems:'center'
    },
    catHeaderText: {
        fontSize: 17,
        fontWeight:'bold',
        color:'silver',
        paddingLeft: 15,
        
    }
})

export default CatMenu;
