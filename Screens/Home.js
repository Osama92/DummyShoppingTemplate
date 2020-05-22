import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, ImageBackground, TouchableOpacity, Platform, StatusBar, ScrollView, FlatList, Image, ActivityIndicator, SectionList, KeyboardAvoidingView} from 'react-native';
import * as Font from 'expo-font'
import {AppLoading} from 'expo'
import {products} from '../Data'
import Swiper from 'react-native-swiper'
import MyCart from '../Components/MyCart'
import {connect} from 'react-redux'


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
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Oils' , { viewClicked: item})}}>
            <Image source={item.image}
                   style={{width: 90, height: 90, resizeMode: 'cover', justifyContent:'center'}}/>
                   <Text style={{width:'100%', fontWeight:'700',textAlign:'center', color:'black'}}>{item.name}</Text>
                   <Text style={{width:'100%', fontWeight:'700',textAlign:'center',color:'black'}}>{item.price}</Text>
                   
            </TouchableOpacity>

        </View>
    )

   headerComponentRender = () => (
    <View style={{flexDirection: 'column', paddingTop: 10}}>
        <View style={styles.MPView}>
            
            <Swiper showsPagination={true} autoplay={true} dotColor='black' activeDotColor='white' autoplayTimeout={5}>
                <ImageBackground source={require('../assets/images/mamador.jpg')}
                                 resizeMode='cover'
                                 style={styles.slide1}>
                    <Text style={styles.slideText}>Hello1</Text>
                </ImageBackground>
                <ImageBackground source={require('../assets/images/Kings2.png')}
                                  resizeMode='contain'
                                 style={styles.slide1}>
                    <Text style={styles.slideText}>Hello 2</Text>
                </ImageBackground>
                <ImageBackground source={require('../assets/images/indomie3.jpg')}
                                  resizeMode='contain'
                                 style={styles.slide1}>
                    <Text style={styles.slideText}>Hello 3</Text>
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
                <View style={{flex:1, alignItems:'center',justifyContent:'center', marginTop: 50}}>
                <Text style={{color: 'blue'}}>Cannot find your item</Text>
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
        {title:'Popular', data: this.state.products},
        {title:'showcase', data: this.state.products}
                                                        

    ]
    if (this.state.fontsLoaded) {
    return (
        
      <View style={styles.container}>
          {this.state.isLoading? (<View style={{...StyleSheet.absoluteFill, alignItems:'center', justifyContent:'center'}}>
                <ActivityIndicator size='large' color='blue'/>
            </View>) : null}
           
        <View style={styles.HeaderView}>
            <View style={styles.headerFV}>
                <View style={styles.cartItem}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Cart')}>
                        <MyCart count={this.props.cartItems.length}/>
                        </TouchableOpacity>
                 
                </View>
             
            </View>

            <View style={styles.headerSV}>
                <Text style={styles.headerText}>Hello There!</Text>
            </View>
            <TextInput style={styles.textInput}
                       placeholder='What are you looking for?'
                       placeholderTextColor='grey'
                       onChangeText={(value)=>this.searchProducts(value)}/>
                      
                            
                       {/* <SearchableDropdown  onTextChange={(value)=>this.searchProducts(value)}
                                            onItemSelect={item=> this.props.addItemToCart(item)}
                                            //containerStyle={{backgroundColor:'blue'}}
                                            itemStyle={{padding: 10, marginTop: 2, backgroundColor:'#f1f1f1'}}
                                            itemsContainerStyle={{maxHeight: 300,}}
                                            items = {products}
                                            itemTextStyle={{fontFamily: 'Roboto', fontSize: 15}}
                                            defaultIndex={0}
                                            placeholder='Search items here'
                                            placeholderTextColor = 'grey'
                                            //resetValue={true}
                                            textInputStyle={styles.textInput}
                                            
                                            /> */}

                        <SectionList 
                                            ListHeaderComponent={this.headerComponentRender}
                                            renderItem={this._renderList}
                                            sections={section}
                                            renderSectionHeader={({section})=>(
                                                    <View style={{flexDirection: 'row', width:'100%', justifyContent:'space-around', alignItems:'center', backgroundColor:'#1b9cfc'}}>
                                                        <Text style={styles.labelText}>{section.title}</Text>
                                                            <TouchableOpacity style={{width:'50%', alignItems:'flex-end'}}>
                                                                <Text style={styles.labelText2}>View all</Text>
                                                            </TouchableOpacity>
                                                     </View>
                                                    )}
                                            showsVerticalScrollIndicator={false}
                                           renderSectionFooter={({section})=>this.isEmptyRender(section)}
                                            
                                
                                />
                       
        </View>
       

        {/* <CatMenu/> */}
   
         {/* <ScrollView>
        <View style={styles.MPView}>
            
                <Swiper showsPagination={true} autoplay={true} dotColor='black' activeDotColor='white' autoplayTimeout={5} bounces={true}>
                    <ImageBackground source={require('../assets/images/image1.jpg')}
                                     style={styles.slide1}>
                        <Text style={styles.slideText}>Hello1</Text>
                    </ImageBackground>
                    <ImageBackground source={require('../assets/images/image2.jpg')}
                                     style={styles.slide1}>
                        <Text style={styles.slideText}>Hello 2</Text>
                    </ImageBackground>
                    <ImageBackground source={require('../assets/images/image3.jpg')}
                                     style={styles.slide1}>
                        <Text style={styles.slideText}>Hello 3</Text>
                    </ImageBackground>
                </Swiper>
                
                </View>
         
           
            <View style={styles.labelView}>
                <Text style={styles.labelText}>Most Popular</Text>
                <TouchableOpacity style={{width: '50%', alignItems:'flex-end'}}>
                    <Text style={styles.labelText2}>View all</Text>
                </TouchableOpacity>
                
            </View>
           
    
        <View style={{flex: 1, height:'100%', width:'100%', paddingTop:10, backgroundColor: 'white'}}>
            {this.state.isLoading? (<View style={{...StyleSheet.absoluteFill, alignItems:'center', justifyContent:'center'}}>
                <ActivityIndicator size='large' color='blue'/>
            </View>) : null}
            <FlatList
                
                data={this.state.products}
                renderItem={this.renderItem}
                ListEmptyComponent={()=>
                    <View style={{flex:1, alignItems:'center',justifyContent:'center', marginTop: 50}}>
                        <Text style={{color: 'blue'}}>Cannot find your item</Text>
                        </View>}
                numColumns={3}/>
                
        </View>
        <View style={styles.labelView}>
                <Text style={styles.labelText}>Most Popular</Text>
                <TouchableOpacity style={{width: '50%', alignItems:'flex-end'}}>
                    <Text style={styles.labelText2}>View all</Text>
                </TouchableOpacity>
                
            </View>
            
        </ScrollView> */}


       
        


        
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
        padding: 5,
        //justifyContent:'space-around'
        
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
        paddingTop: 15,
        width: '100%',
        height: '10%',
        //backgroundColor:'green',
        alignItems:'flex-end'

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
        alignItems:'center'
        
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
