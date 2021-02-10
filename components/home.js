
import React ,{Component,useState} from 'react'
import { Text ,View,TouchableOpacity,Dimensions,TextInput,ActivityIndicator,ScrollView,Image, ImageBackground,FlatList,Linking,Modal} from 'react-native'
const {width,height} = Dimensions.get('window')
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// var data = require('./data/data.json');
import firebase from 'firebase'

var today = new Date();
export default class Home extends Component{

    state={
        loading:true,
        data:[],
        // topic:'',
        // detail:'',
        // link:'',
        // plus:false,
        // name:'',
        isFetching:false,
    }




   async componentDidMount(){


        this.fetchData()

    }
    fetchData = async ()=>{
       var data=[]
       this.setState({isFetching:true})
        await firebase.firestore()
        .collection('Dashboard')
        .get()
        .then(snapshot => {
            snapshot.forEach(doc=>{
                data.push(doc.data())
            })
        })
        // .then(this.setState({plus:false}))
           .catch((error)=>console.log(error))
        //    this.setState({data:[]})
           this.setState({data:data.reverse()})
            this.setState({isFetching:false})
            // this.revererData(data)
    
    }





    signOut = () => {
        firebase.auth().signOut().then(() => {
          this.props.navigation.replace('Login')
        })
        .catch(error => this.setState({ errorMessage: error.message }))
      }



    render(){
        return(
            <View style={{flex:1}}>
                <View style={{backgroundColor:'#0C0C0C',flexDirection:'row',alignItems:'center',width:width,height:100}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()}>
                        <Entypo name='menu' style={{color:'white',margin:20,marginTop:20}} size={40} />
                    </TouchableOpacity>
                    <Image
                        source={
                        require('../images/home.png')}
                        style={{height: 110,marginLeft:25,width: 200,resizeMode: 'stretch',borderRadius:150}}/>
                        <TouchableOpacity onPress={()=>{this.signOut(),console.log('logout')}}>
                            <MaterialCommunityIcons name='logout' style={{color:'white',margin:20,marginLeft:50,marginTop:20}} size={40} />
                        </TouchableOpacity>
                </View>

                <View style={{marginBottom:100}}>
                    <ImageBackground
                    source={
                        require('../images/homeback.jpg')}
                        style={{flex:1,height:height-100,width:width,marginBottom:0,resizeMode: 'cover'}}/>
                    <Text style={{color:'#4285F4',alignSelf:'center',fontWeight:'bold',fontFamily:'',fontSize:35}}>Dashboard</Text>
                            
                            {/* {this.state.loading?<ActivityIndicator/>: */}
                            
                            <FlatList
                            style={{elevation:2,height:height-150,flexGrow:0}}                  
                            onRefresh={()=>{this.fetchData()}}
                            refreshing={this.state.isFetching}
                                data={this.state.data}
                                // horizontal
                                // inverted
                                // keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) => (
                                <View style={{marginTop:0,marginBottom:0,borderBottomWidth:0.5,padding:5,justifyContent:'center',borderBottomColor:'white'}}>
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate('HomeData',{item:item})}>
                                    <Text style={{color:'white',margin:10,alignSelf:'auto',fontWeight:'bold',fontFamily:'',fontSize:20}}>{item.topic}</Text>
                                </TouchableOpacity>
                                </View>
                                )}
                            />
                              
                            {/* } */}
                </View>
            </View>
        );
    }
}










