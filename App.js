// import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View,Image,SafeAreaView,ScrollView,StatusBar } from 'react-native';
import Home from './components/home';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator,DrawerItem,DrawerContentScrollView,DrawerItemList} from '@react-navigation/drawer'
import Signup from './components/signup';
import About from './components/about';
import Profile from './components/profile';
import FacultyData from './components/fdata';
import { Component } from 'react';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Animated from 'react-native-reanimated';
import { Avatar,Title,} from 'react-native-paper'
import Login from './components/login';
import * as firebase from 'firebase'
import Attedance from './components/attedance';
import Faculty from './components/faculty';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import EditProfile from './components/editprofile';
import HomeData from './components/homedata';
import Class from './components/class';
import Inclass from './components/inclass';
import VideoMaterial from './components/videomaterial';
import PdfMaterial from './components/pdfmaterial';
import OnlineLink from './components/onlinelink';
// import {CustomDrawerContent} from './components/drawercontent'
var x;


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = { ********* };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// firebase.firestore();



// firebase.initializeApp


var email;
var name
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

 function CustomDrawerContent(props){
   try{
  x = firebase.auth().currentUser.uid
  // this.setState({currentuser:x})
  console.log(x,'done')

  firebase.database().ref("users").on("value",datasnap=>{
    console.log(datasnap.val()[x]);
    email=datasnap.val()[x].email
    name=datasnap.val()[x].name
    // console.log(changeEmail(datasnap.val()[x].email),changeName(datasnap.val()[x].name));
    // console.log()
})
   }
   catch(error){
     console.log(error);
     email=''
     name=''
   }

//   const [email,changeEmail] = useState('')
// const [name,changeName]  = useState('')
   return (
    <DrawerContentScrollView >
      <SafeAreaView style={{}}>
        <View style={{height: 190, backgroundColor: '#0C0C0C', alignItems: 'center', justifyContent: 'center'}}>
          <Image source={require('./images/updates1.png')} style={{height: 150, width:150}}/>
   <Text style={{color:'#fff',fontSize:15}}>{name}</Text>
  <Text style={{color:'#fff',fontSize:12,marginBottom:20}}>{email}</Text>
        </View>
      <DrawerItemList {...props} />

    </SafeAreaView>
    </DrawerContentScrollView>
  );
}

function DrawerNavigator(){
  return(
 <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}
 drawerStyle={{backgroundColor:'#0C0C0C'}}
>
 <Drawer.Screen name='HOME' component={Home} 
 options={{
   drawerIcon:({focused,color,size}) => (
     <Entypo name='home' style={{color:color,fontSize:size}}/>
   )}}
 />

 <Drawer.Screen name='PROFILE' component={Profile} options={{
       drawerIcon:({focused,color,size}) => (
         <FontAwesome5 name='user-edit' style={{color:color,fontSize:size}}/>
       )
     }} />

 <Drawer.Screen name='FACULTY DETAILS' component={Faculty} options={{
       drawerIcon:({focused,color,size}) => (
         <MaterialCommunityIcons name='teach' style={{color:color,fontSize:size}}/>
       )
     }} />
 <Drawer.Screen name='CLASSES' component={Class} options={{
       drawerIcon:({focused,color,size}) => (
         <Feather name='activity' style={{color:color,fontSize:size}}/>
       )
     }} />
 <Drawer.Screen name='ABOUT US' component={About} options={{
       drawerIcon:({focused,color,size}) => (
         <Entypo name='info' style={{color:color,fontSize:size}}/>
       )
     }} />

</Drawer.Navigator>
  )
}

export default class App extends Component {

  constructor() {
    super();
    this.state={
  authenticated:false,
  loading:''
}
  }



  async componentDidMount(){
    if (firebase.apps.length === 0) {
     await firebase.initializeApp(firebaseConfig);
      // firebase.firestore();
      console.log('Initializing Firebase');
    }
    else{
      console.log('Initialized Firebase');
    }
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loading: false, authenticated: true });
      } else {
        this.setState({ loading: false, authenticated: false });
      }
    });
    console.log(this.state.authenticated)

  // console.log(Math.floor(Math.random() * 25) + 75);


  // try{

    }

  render(){
  return (
    <View style={{flex:1}}>
      <StatusBar networkActivityIndicatorVisible />
      {/* <StatusBar style="auto" /> */}
      
        {
          this.state.authenticated?
          <NavigationContainer theme={{colors:{...DefaultTheme.colors,text:'#fff'}}}>
          <Stack.Navigator>
            {/* <Stack.Screen name='Signup'  options={{headerShown:false}} component={Signup}  />  */}
            {/* <Stack.Screen name='Login'  options={{headerShown:false}} component={Login}  />  */}
            <Stack.Screen name='HOME'  options={{headerShown:false}} component={DrawerNavigator}  /> 
            <Stack.Screen name='Login'  options={{headerShown:false}} component={Login}  /> 
            <Stack.Screen name='PROFILE'  options={{headerShown:false}} component={Profile,DrawerNavigator}  /> 
      <Stack.Screen name='Edit Profile'  options={{headerShown:false}} component={EditProfile}  /> 
            <Stack.Screen name='HomeData' options={{headerShown:false}} component={HomeData} /> 
            <Stack.Screen name='FacultyData' options={{headerShown:false}} component={FacultyData} /> 
            <Stack.Screen name='Inclass'  options={{headerShown:false}} component={Inclass} /> 
            <Stack.Screen name='VideoMaterial'  options={{headerShown:false}} component={VideoMaterial} /> 
            <Stack.Screen name='PdfMaterial'  options={{headerShown:false}} component={PdfMaterial} /> 
            <Stack.Screen name='OnlineLink'  options={{headerShown:false}} component={OnlineLink} /> 
            <Stack.Screen name='Attedance'  options={{headerShown:false}} component={Attedance} /> 
          </Stack.Navigator>
          </NavigationContainer>
          
          
          :
          <NavigationContainer theme={{colors:{...DefaultTheme.colors,text:'#fff'}}}>
        
    <Stack.Navigator>
      <Stack.Screen name='Signup'  options={{headerShown:false}} component={Signup}  /> 
      <Stack.Screen name='Login'  options={{headerShown:false}} component={Login}  /> 
      <Stack.Screen name='HOME'  options={{headerShown:false}} component={DrawerNavigator}  /> 
            <Stack.Screen name='HomeData' options={{headerShown:false}} component={HomeData} /> 
      {/* <Stack.Screen name='Signup' component={Signup} />  */}
            <Stack.Screen name='PROFILE'  options={{headerShown:false}} component={Profile,DrawerNavigator}  /> 
      <Stack.Screen name='Edit Profile'  options={{headerShown:false}} component={EditProfile}  /> 
      <Stack.Screen name='FacultyData' options={{headerShown:false}} component={FacultyData} /> 
            <Stack.Screen name='Inclass'  options={{headerShown:false}} component={Inclass} /> 
            <Stack.Screen name='VideoMaterial'  options={{headerShown:false}} component={VideoMaterial} /> 
            <Stack.Screen name='PdfMaterial'  options={{headerShown:false}} component={PdfMaterial} /> 
            <Stack.Screen name='OnlineLink'  options={{headerShown:false}} component={OnlineLink} /> 
            <Stack.Screen name='Attedance'  options={{headerShown:false}} component={Attedance} /> 

            
    </Stack.Navigator>
      </NavigationContainer>
  }














    </View>
  );
}
}
