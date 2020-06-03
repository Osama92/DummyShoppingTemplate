import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, ImageBackground, TouchableOpacity, Platform, StatusBar, ScrollView, FlatList, Image, ActivityIndicator, SectionList, KeyboardAvoidingView} from 'react-native';
import * as Font from 'expo-font'
import {AppLoading} from 'expo'
import {products} from '../Data'
import Swiper from 'react-native-swiper'
import MyCart from '../Components/MyCart'
import {connect} from 'react-redux'
import SearchableDropdown from 'react-native-searchable-dropdown'   



const screenHeight = Dimensions.get('screen').height
const screenWidth = Dimensions.get('screen').width


let customFonts = {
    'Roboto': require('../fonts/Roboto-Bold.ttf')
  }

class Home extends Component {

    constructor(){
        super()
        this.state ={
            isLoading: false,
            products: [],
            inMemoryProducts:[],
            counter: 0,
            clickedItem: 'mee'
            
        }
    }

    state = {
        fontsLoaded: false,
       
      }

      async _loadFontsAsync() {
        await Font.loadAsync(customFonts)
        this.setState({fontsLoaded: true})
      }
    
     

      loadProducts = ()=> {
        this.setState({products: products, inMemoryProducts:products, isLoading: false })
    }

    searchProducts = (value)=> {
        const filteredProducts = this.state.inMemoryProducts.filter(
            products => {
                let productsLowercase = (products.name).toLowerCase()

                let searchTermLowercase = value.toLowerCase()

                return productsLowercase.indexOf(searchTermLowercase) > -1
            }
        )
        this.setState({products: filteredProducts})
    }
    renderItem = ({item})=> (
        
        <View style={{minHeight: 70,margin:9, width:screenWidth/3.5, alignItems:'center', backgroundColor: '#fff', borderRadius: 7, padding:5}}>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Oils' , { viewClicked: item})}} style={{justifyContent: 'center',}}>
            <Image source={item.image}
                   style={{width: 90, height: 90, resizeMode: 'cover', justifyContent:'center'}}/>
                   <Text style={{width:'100%', fontWeight:'700',textAlign:'left', color:'black', width:60}}>{item.name}</Text>
                   <Text style={{width:'100%', fontWeight:'700',textAlign:'left',color:'grey', fontSize:11}}>₦{item.price}.00</Text>
                   
            </TouchableOpacity>

        </View>
    )


   headerComponentRender = () => (
    <View style={{flexDirection: 'column', paddingTop: 10}}>
        <View style={styles.MPView}>
            
            <Swiper showsPagination={true} autoplay={true} dotColor='silver' activeDotColor='#1b9cfc' autoplayTimeout={5}>
                <ImageBackground source={require('../assets/images/mamador.jpg')}
                                 resizeMode='cover'
                                 style={styles.slide1}>
                    
                </ImageBackground>
                <ImageBackground source={require('../assets/images/Kings2.png')}
                                  resizeMode='contain'
                                 style={styles.slide1}>
                    
                </ImageBackground>
                <ImageBackground source={require('../assets/images/indomie3.jpg')}
                                  resizeMode='contain'
                                 style={styles.slide1}>
                    
                </ImageBackground>
            </Swiper>
            
            </View>
           
        
    </View>
    
   )

   _renderList = ({section, index}) => {
       if (index !==0) return null
       return (
           
           <FlatList numColumns={3}
           data={section.data}
           renderItem={this.renderItem}
           
           />
       )
   }

   isEmptyRender(sections) {
        if (sections.data.length == 0) {
            return(
                <View style={{flex:1, alignItems:'center',justifyContent:'center', height: 60}}>
                <Text style={{color: 'grey', fontWeight:'500', fontSize: 17}}>Unfortunately no match was found</Text>
                </View>
            )
        } 
        
   }


    componentDidMount() {
       this._loadFontsAsync()
        this.setState({isLoading: true})
        this.loadProducts()
    }

    
 

  render() {
      

    const section = [
        {title:'Food Cupboard', data: products},
        {title:'Showcase', data: products}
             ]
    if (this.state.fontsLoaded) {
    return (
        
      <View style={styles.container}>
           
        <View style={styles.HeaderView}>
            <View style={styles.headerFV}>
            <TouchableOpacity   onPress={()=>this.props.navigation.navigate('Profile')}
                                style={{width: 30, height: 30, marginTop:20, borderRadius: 15, backgroundColor:'#f3f3f3', justifyContent:'center', alignItems:'center'}}>
                <Image source={require('../assets/customer.png')} style={{width: 20, height: 20}}/>
            </TouchableOpacity>
                <View style={styles.cartItem}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Cart')}>
                        <MyCart count={this.props.cartItems.length}/>
                        </TouchableOpacity>
                 
                </View>
             
            </View>

            <View style={styles.headerSV}>
                <Text style={styles.headerText}>Hello There!</Text>
            </View>
            {/* <TextInput style={styles.textInput}
                       placeholder='What are you looking for?'
                       placeholderTextColor='grey'
                       onChangeText={(value)=>this.searchProducts(value)}/> */}
                <SearchableDropdown  onTextChange={(value)=>this.searchProducts(value)}
                                            onItemSelect={item=> this.props.navigation.navigate('Oils', { viewClicked: item})}
                                            //containerStyle={{backgroundColor:'blue'}}
                                            itemStyle={{padding: 10, marginTop: 2, backgroundColor:'#f1f1f1'}}
                                            itemsContainerStyle={{maxHeight: 300,}}
                                            items = {products}
                                            itemTextStyle={{fontFamily: 'Roboto', fontSize: 13}}
                                            defaultIndex={0}
                                            placeholder='What are you looking for?'
                                            placeholderTextColor = 'grey'
                                            resetValue={true}
                                            textInputStyle={styles.textInput}
                                            listProps={
                                                {
                                                    ListEmptyComponent: ()=>(
                                                        
                                                        <View style={{justifyContent: 'center', alignItems: 'center', height:300}}>
                                                            <Text style={{fontSize:15}}>Unfortunately, we could not find your item</Text>
                                                        </View>
                                                    ),

                                                }
                                            }
                                            
                                            />     
                            

            <SectionList 
                ListHeaderComponent={this.headerComponentRender}
                renderItem={this._renderList}
                sections={section}
                renderSectionHeader={({section})=>(
                        <View style={{flexDirection: 'row', width:'100%', justifyContent:'space-around', alignItems:'center', backgroundColor:'#1b9cfc'}}>
                           <Text style={styles.labelText}>{section.title}</Text>
                             <TouchableOpacity style={{width:'50%', alignItems:'flex-end'}}
                                               onPress={()=>this.props.navigation.navigate('Sections', { clicked: section})}>
                                <Text style={styles.labelText2}>View all</Text>
                                    </TouchableOpacity>
                        </View>
                          )}
                showsVerticalScrollIndicator={false}
                //renderSectionFooter={({section})=>this.isEmptyRender(section)}
                />
                       
        </View>
        
        <StatusBar barStyle='dark-content'/>
      </View>
      
      
    )
} else {
    return <AppLoading/>
  }
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      

    },
    HeaderView: {
        backgroundColor: '#fff',
        width: screenWidth,
        height: screenHeight,
        flexDirection:'column',
        //marginRight:30,
        //justifyContent:'center'
        
    },
    menuView: {
        width: screenWidth/5,
        height: screenHeight,
        backgroundColor: 'blue'
    },
    mainView: {
        //width: screenWidth,
        //height: screenHeight,
        //backgroundColor: '#fff'
    },
    headerFV: {
        flexDirection:'row',
        paddingTop: 15,
        width: '100%',
        height: '10%',
        //backgroundColor:'green',
        //alignItems:'flex-end'
        justifyContent:'space-around'

    },
    headerSV: {
        width: '70%',
        height: '10%',
        backgroundColor: '#f3f3f3',
        justifyContent:'space-between',
        borderTopLeftRadius:15,
        borderTopRightRadius: 15,
        flexDirection: 'row'

    },
    textInput: {
        width: '100%',
        height:60,
        backgroundColor: '#f3f3f3',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        padding: 10
    },
    headerText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black',
        paddingLeft: 10,
        fontFamily: 'Roboto',
        paddingTop: 20
    },
    catView: {
        height: '8%',
        width: '100%',
        backgroundColor:'silver',
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    labelView: {
        flexDirection:'row',
        width: '100%',
        height: '4%',
        backgroundColor:'#fff',
        justifyContent:'space-around',
        alignItems:'center'
    },
    labelText: {
        fontSize: 18,
        fontWeight: 'bold',
        width:'50%',
        paddingLeft: 15,
        fontFamily: 'Roboto',
        color: 'white'
        
    },
    labelText2: {
        fontSize: 13,
        fontWeight: 'bold',
        width:'50%',
        paddingRight: 15,
        textAlign:'right',
        color:'white',
        fontFamily: 'Roboto'
        
    },
    MPView: {
        height: 300,
        backgroundColor:'grey',
        width: '100%',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
    },
    MPCont: {
        width: '40%',
        height: '90%',
        borderRadius: 15,
        backgroundColor: '#fff',
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'center'
    },
    cartItem: {
        backgroundColor: '#f3f3f3',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems:'center',
        marginLeft:200,
        marginTop:10
        
    },
    slide1: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    slide2: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
    slide3: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: 'orange'
    },
    slideText: {
       fontFamily: 'Roboto',
        fontSize: 40,
        color: 'white'

    },
    sectionHeader: {
        padding: 5,
        fontSize: 20,
        color: 'white',
        backgroundColor: 'orange'
    }
  

})

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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
