import React ,{Component} from 'react'
import { Text ,View,TouchableOpacity,Dimensions,Alert,ActivityIndicator,ScrollView,TextInput,Image,Modal, ImageBackground,FlatList,Linking} from 'react-native'
const {width,height} = Dimensions.get('window')
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
// var data = require('./data/data.json');
import firebase from 'firebase'

// var data;



export default class HomeData extends Component{
    state={
        loading:true,
        data:'',
        date:'',
        // edit:false,
        // link:'',
        // topic:'',
        // detail:''

    }
   async componentDidMount(){
        // console.log(this.props.route.params.item);
        await this.setState({loading:false,data:this.props.route.params.item})
        console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n',this.state.data);
        // console.log(this.validURL(this.state.data.link));
        this.setState({date:new Date(parseInt(this.state.data.time))})
        // this.validURL(this.state.data.link)
    }
    

    render(){
        return(
            <View style={{}}>
                    <ImageBackground
                    source={
                        require('../images/homeback.jpg')}
                        style={{flex:1,height:height,width:width,marginBottom:0,resizeMode: 'cover'}}/>
                    <View style={{flexDirection:'row',marginTop:20,marginBottom:20}}>
                        <TouchableOpacity style={{position:'absolute'}} onPress={()=>{this.props.navigation.replace('HOME')}}>
                            <MaterialIcons name='arrow-back' style={{color:'white',marginTop:10,marginLeft:10}} size={35} />
                        </TouchableOpacity>
            {/* <Text style={{color:'#4285F4',fontSize:20,margin:10,fontWeight:'bold',fontFamily:'',alignSelf:'center'}}>PROFILE</Text> */}
                        <Text style={{color:'#4285F4',fontWeight:'bold',marginLeft:width/5,fontFamily:'',fontSize:35}}>Dashboard Data</Text>
                    </View>

                                   <View style={{marginBottom:-10}} />
                    {/* <Text style={{color:'#4285F4',alignSelf:'center',fontWeight:'bold',margin:20,fontFamily:'',fontSize:30}}>Dashboard Data</Text> */}
                    <View style={{flexDirection:'column',margin:10}}>
                    {/* <View style={{flexDirection:'row'}}> */}
                    <Text style={{color:'#F9C04D',fontWeight:'bold',fontFamily:'',fontSize:20}}>Topic:- </Text>
                    <Text style={{color:'white',fontSize:18}}>{this.state.data.topic}</Text>
                    </View>
                    <View style={{flexDirection:'column',margin:10}}>
                    {/* <View style={{flexDirection:'row'}}> */}
                    <Text style={{color:'#F9C04D',fontWeight:'bold',fontFamily:'',fontSize:20}}>Link: </Text>
                    <TouchableOpacity onPress={()=>Linking.openURL(this.state.data.link)}>
                    <Text style={{color:'white',fontSize:18}}>{this.state.data.link}</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'column',margin:10}}>
                    <Text style={{color:'#F9C04D',fontWeight:'bold',fontFamily:'',fontSize:20}}>Details: </Text>
                    <Text style={{color:'white',fontSize:18}}>{this.state.data.detail}</Text>
                    </View>
                    <View style={{flexDirection:'row',margin:10}}>
                    {/* <View style={{flexDirection:'row'}}> */}
                    <Text style={{color:'white',fontWeight:'bold',fontFamily:'',fontSize:20}}>By </Text>
                    <Text style={{color:'white',fontSize:18}}>{this.state.data.name}</Text>
                    </View>
                    <View style={{flexDirection:'row',margin:10}}>
                    {/* <View style={{flexDirection:'row'}}> */}
                    <Text style={{color:'white',fontWeight:'bold',fontFamily:'',fontSize:20}}>At</Text>
                    <Text style={{color:'white',fontSize:15,marginTop:5}}>: {this.state.date.toString()}</Text>
                    </View>
                            {/* {this.state.loading?<ActivityIndicator/>: */}
                            
                           
            </View>
        );
    }
}