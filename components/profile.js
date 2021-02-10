import React ,{Component} from 'react'
import { Text ,View,TouchableOpacity,Keyboard,Dimensions,KeyboardAvoidingView,TouchableWithoutFeedback,Image,ImageBackground,TextInput} from 'react-native'
const {width,height} = Dimensions.get('window')
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as firebase from 'firebase'
// import { StackedBarChart } from 'react-native-svg-charts'

var x;
// var name;
// var phone
// var email
// var enrol

export default class Profile extends Component{
    signOut = () => {
        firebase.auth().signOut().then(() => {
          this.props.navigation.replace('Login')
        })
        .catch(error => this.setState({ errorMessage: error.message }))
      }
      state={
        name:'',
        phone:'',
        email:'',
        enrol:''
      }
      
      
     componentDidMount(){


         
      x = firebase.auth().currentUser.uid
      this.setState({currentuser:x})
      console.log(x,'done')
      firebase.database().ref("users").on("value",datasnap=>{
        console.log(datasnap.val()[x]);
        // email=datasnap.val()[x].email
        // name=datasnap.val()[x].name
        // phone=datasnap.val()[x].phone
        // email=datasnap.val()[x].email
        // enrol=datasnap.val()[x].enrollment
        this.setState({name:datasnap.val()[x].name})
        this.setState({phone:datasnap.val()[x].phone})
        this.setState({email:datasnap.val()[x].email})
        this.setState({enrol:datasnap.val()[x].enrollment})
    })
      }
    render(){

        return(
            <KeyboardAvoidingView style={{height:height}} 
            behavior={Platform.OS == "ios" ? "padding" : "height"}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
           
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
                <ImageBackground
                source={
                  require('../images/homeback.jpg')}
                        style={{flex:1,marginTop:100,height:height-100,width:width,resizeMode: 'cover',position:'absolute'}}/>
            {/* <Text style={{color:'#4285F4',fontSize:20,margin:10,fontWeight:'bold',fontFamily:'',alignSelf:'center'}}>PROFILE</Text> */}
            <Text style={{color:'#4285F4',alignSelf:'center',fontWeight:'bold',fontFamily:'',fontSize:35}}>Profile</Text>

                        <View style={{margin:10,marginTop:40,borderRadius:30,borderWidth:4,borderColor:'white',justifyContent:'center',width:width-20,height:60,elevation:5}}>
                          <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'white',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60,elevation:6}}>
                            <FontAwesome name='user' style={{color:'white',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                          </View>
                        <Text style={{position:'absolute',fontSize:15,width:width-100,alignSelf:'flex-end',color:'white',opacity:0.80,}}>{this.state.name}</Text>
                            {/* placeholder='Enter Name'
                            keyboardType=''
                            placeholderTextColor="white"
                            defaultValue={this.state.name}
                          
                            // secureTextEntry={true}
                            // returnKeyLabel = {"next"}
                            // value={this.state.email}
                            onChangeText={(text) => this.setState({name:text})}
                            // onChangeText={(text)=>console.log(text)} */}
                            
                        </View>
                        <View style={{margin:10,marginTop:10,borderRadius:30,borderWidth:4,borderColor:'white',justifyContent:'center',width:width-20,height:60,elevation:5}}>
                          <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'white',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60,elevation:6}}>
                            <FontAwesome name='phone' style={{color:'white',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                          </View>
                        <Text style={{position:'absolute',fontSize:15,width:width-100,alignSelf:'flex-end',color:'white',opacity:0.80,}}>{this.state.phone}</Text>
                            {/* placeholder='Enter Phone No.'
                            keyboardType='phone-pad'
                            maxLength={10}
                            // secureTextEntry={true}
                            placeholderTextColor="white"
                            defaultValue={this.state.phone}
                          
                            // secureTextEntry={true}
                            // returnKeyLabel = {"next"}
                            // value={this.state.email}
                            onChangeText={(text) => this.setState({phone:text})}
                            // onChangeText={(text)=>console.log(text)} */}
                            
                        </View>
                        <View style={{margin:10,marginTop:10,borderRadius:30,borderWidth:4,borderColor:'white',justifyContent:'center',width:width-20,height:60,elevation:5}}>
                          <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'white',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60,elevation:6}}>
                            <Entypo name='mail' style={{color:'white',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                          </View>
                <Text style={{position:'absolute',fontSize:15,width:width-100,alignSelf:'flex-end',color:'white',opacity:0.8,}}>{this.state.email}</Text>


                            
                        </View>
                        <View style={{margin:10,marginTop:10,borderRadius:30,borderWidth:4,borderColor:'white',justifyContent:'center',width:width-20,height:60,elevation:5}}>
                          <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'white',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60,elevation:6}}>
                            <Entypo name='flow-branch' style={{color:'white',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                          </View>
                        <Text style={{position:'absolute',fontSize:18,width:width-100,alignSelf:'flex-end',color:'white',opacity:0.80,}}>{this.state.enrol}</Text>
                            {/* placeholder='Enter Enrollment No.'
                            maxLength={12}
                            keyboardType='number-pad'
                            // secureTextEntry={true}
                            placeholderTextColor="white"
                            defaultValue={this.state.enrol}
                          
                            // secureTextEntry={true}
                            // returnKeyLabel = {"next"}
                            // value={this.state.email}
                            onChangeText={(text) => this.setState({enrol:text})}
                            // onChangeText={(text)=>console.log(text)} */}
                            
                        </View>
                        {/* <View style={{marginBottom:20,marginTop:20,alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Edit Profile')}>
                        <View style={{backgroundColor:'#F9C04D',margin:10,justifyContent:'center',borderRadius:28,marginTop:10,height:55,width:200}}>
                            <Text style={{alignSelf:'center',fontSize:20,fontWeight:'bold',fontFamily:''}}>Edit Profile</Text>  
                        </View>
                        </TouchableOpacity>
                        </View> */}
                        <View style={{alignItems:'center',marginTop:50,justifyContent:'center'}}>
                        <Text style={{fontSize:17,marginBottom:10,color:'#A1A1A8'}}>Want to edit profile?</Text>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Edit Profile')}}>
                        <View style={{borderWidth:4,borderColor:'#A1A1A8',justifyContent:'center',borderRadius:25,width:250,alignItems:'center',height:50,elevation:6}}>
                          <Text style={{fontSize:20,fontWeight:'bold',fontFamily:'',color:'#A1A1A8'}}>Edit Profile</Text>
                        </View>
                        </TouchableOpacity>
                        </View>

            </View>        
         </TouchableWithoutFeedback>
         </KeyboardAvoidingView>

        );
    }
}