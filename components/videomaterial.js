import React ,{Component} from 'react'
import { Text ,View,TouchableOpacity,Dimensions,TouchableWithoutFeedback,KeyboardAvoidingView,Keyboard,Alert,ActivityIndicator,ScrollView,TextInput,Image,Modal, ImageBackground,FlatList,Linking} from 'react-native'
// import { Text ,View,TouchableOpacity,Dimensions,Alert,Button,ActivityIndicator,ScrollView,TextInput,Image,Modal, ImageBackground,FlatList,Linking} from 'react-native'
const {width,height} = Dimensions.get('window')
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
// var data = require('./data/data.json');
import firebase from 'firebase'
// import YoutubePlayer from "react-native-youtube-iframe";
import YoutubePlayer from "react-native-youtube-iframe";
// var data;

    // const playerRef = useRef();
    var x
var time,date
export default class VideoMaterial extends Component{
    state={
        name:this.props.route.params.name,
        // email:'',
        subName:this.props.route.params.subName,
        plus:false,
        link:'',
        topic:'',
        data:[],
        youtube:false,
        id:'',
        isFetching:false,
        remove:false,
        // loading:''

    }
    //  playerRef = useRef();
   async componentDidMount(){
    date =new Date()
    time =date.getTime()
    await this.fetchData()
    // await this.fetchData()

    }


   async fetchData(){
    this.setState({isFetching:true})

        var data=[]
       await firebase.database().ref("classes" +'/'+ this.state.subName+'/'+'videoData/')
        .on("value",datasnap=>{
            // console.log(datasnap.val());
            for( var i in datasnap.val()){
                // console.log(datasnap.val()[i]);
                data.push({
                    "topic": datasnap.val()[i].topic,
                    "videoId": datasnap.val()[i].videoId,
                    'id'    :i
                })
            }

        

            
        })
        this.setState({data:[]})
        this.setState({data:data.reverse()})
        this.setState({isFetching:false})
        console.log(this.state.data);
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
                        <Text style={{color:'#4285F4',fontWeight:'bold',marginLeft:width/5,fontFamily:'',fontSize:width/13}}>Videos</Text>
                        {/* <Text style={{color:'red',fontWeight:'bold',marginLeft:width/5,fontFamily:'',fontSize:18}}>REMOVE</Text> */}
                        {/* <Text */}
                    </View>

                    {/* <FlatList */}
                    <FlatList
                            style={{elevation:2,height:height-230}}                  
                            onRefresh={()=>{this.fetchData()}}
                            refreshing={this.state.isFetching}
                                data={this.state.data}
                                // horizontal
                                // inverted
                                // keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) => (
                                <View style={{marginTop:0,marginBottom:0,borderBottomWidth:0.5,padding:5,justifyContent:'center',borderBottomColor:'white'}}>
                                
                                <TouchableOpacity onPress={()=>{this.setState({youtube:true,id:item.videoId})}}>
                                    <View style={{flexDirection:'row',width:width-20,alignSelf:'center'}} >
                                    <Image
                                        style={{height:50,width:50,alignSelf:'center'}}
                                        source={{uri: 'https://img.youtube.com/vi/'+item.videoId+'/0.jpg'}}
                                        />
                                    <Text style={{color:'white',margin:10,width:width-70,fontSize:18}}> {item.topic}</Text>
                                    </View>
                                </TouchableOpacity>
                                </View>
                                )}
                            />



                    <Modal animationType='none' transparent={true} visible={this.state.youtube} onRequestClose={() => {this.setState({youtube:false})}}>
                        <View style={{height:height/3}} />

                            <YoutubePlayer
                                getVolume
                                height={height/3}
                                play={true}
                                videoId={this.state.id}
                                onChangeState={(data)=>console.log(data)}
                                />
                                <Text onPress={()=>this.setState({youtube:false})} style={{color:'#F9C04D',alignSelf:'center',fontSize:20}} >Click To Exit</Text>
                    </Modal>
            </View>
        );
    }
}