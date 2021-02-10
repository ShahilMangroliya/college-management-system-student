import React ,{Component} from 'react'
import { Text ,View,TouchableOpacity,Dimensions,TextInput,Modal, ImageBackground,Linking} from 'react-native'
// import { Text ,View,TouchableOpacity,Dimensions,Alert,Button,ActivityIndicator,ScrollView,TextInput,Image,Modal, ImageBackground,FlatList,Linking} from 'react-native'
const {width,height} = Dimensions.get('window')
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// var data = require('./data/data.json');
import firebase from 'firebase'
// import YoutubePlayer from "react-native-youtube-iframe";
// import YoutubePlayer from "react-native-youtube-iframe";
// var data;

    // const playerRef = useRef();
export default class OnlineLink extends Component{
    state={
        name:this.props.route.params.name,
        // email:'',
        subName:this.props.route.params.subName,
        plus:false,
        link:'',
        topic:'',
        data:'https://classroom.google.com/u/1/h',
        youtube:false,
        id:'',
        isFetching:false,
        remove:false,
        // loading:''

    }
    //  playerRef = useRef();
   async componentDidMount(){

    await this.fetchData()
    // await this.fetchData()
    }

   async fetchData(){
       try {
           

    await firebase.database().ref("classes" +'/'+ this.state.subName+'/'+'OnlineLink/')
    .on("value",datasnap=>{
        console.log(datasnap.val());
        if(datasnap.val())
        this.setState({data:datasnap.val().link})

    })
} catch (error) {
           this.setState({data:'https://classroom.google.com/u/1/h'})
}
    
    console.log('this.state.data'+this.state.data);
    }

    



    render(){
        return(
            <View style={{}}>
                    <ImageBackground
                    source={
                        require('../images/homeback.jpg')}
                        style={{flex:1,height:height,width:width,marginBottom:0,resizeMode: 'cover'}}/>
                    <View style={{flexDirection:'row',marginTop:20,marginBottom:20}}>
                        <TouchableOpacity style={{position:'absolute'}} onPress={()=>{this.props.navigation.goBack()}}>
                            <MaterialIcons name='arrow-back' style={{color:'white',marginTop:10,marginLeft:10}} size={35} />
                        </TouchableOpacity>
            {/* <Text style={{color:'#4285F4',fontSize:20,margin:10,fontWeight:'bold',fontFamily:'',alignSelf:'center'}}>PROFILE</Text> */}
                        <Text style={{color:'#4285F4',fontWeight:'bold',marginLeft:width/7,fontFamily:'',fontSize:width/13}}>Online Lecture Link</Text>

                    </View>
                    <View style={{marginTop:20}} />
                    <TouchableOpacity onPress={()=>{Linking.openURL(this.state.data)}}>
                    <View style={{width:width-60,alignSelf:'center',justifyContent:'center',alignItems:'center',borderRadius:30,height:60,backgroundColor:'#F9C04D'}} >
                        <Text style={{fontSize:25,fontWeight:'bold',fontFamily:''}}>JOIN CLASS</Text>
                    </View>
                    </TouchableOpacity>
                    <View style={{marginTop:20}} />

            </View>
        );
    }
}