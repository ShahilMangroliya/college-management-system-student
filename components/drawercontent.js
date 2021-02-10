import React,{useState} from 'react'
import {Text,View,} from 'react-native'
import {DrawerContentScrollView,DrawerItem,Image,Drawer,createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer'
// import {Avatar} from 'react-native-paper'
import Animated from 'react-native-reanimated'
// import { Header } from 'react-native/Libraries/NewAppScreen'
import firebase from 'firebase'
// import { State } from 'react-native-gesture-handler'
// import Entypo from 'react-native-vector-icons/Entypo'
// import FontAwsonm5 from 'react-native-vector-icons/FontAwesome5'
const drawer  = createDrawerNavigator()
var x;
export function CustomDrawerContent({progress,...props}){
    
    // var    email =''
    const [email,changeEmail] = useState('hi')
    const [name,changeName]  = useState('hi')
    // const [image,changeImage] =useState('')
    // firebase.auth().onAuthStateChanged((user) => {
    //     console.log(user.providerData[0].displayName),changeImage(user.providerData[0].photoURL),changeName(user.providerData[0].displayName),changeEmail(user.providerData[0].email)})
    // console.log(email)

    // const translateX = Animated.interpolate(progress,{
    //     inputRange: [0,1],
    //     outputRange: [-100,0]
    // })

    x =  firebase.auth().currentUser.uid
    // this.setState({currentuser:x})
    // console.log(x,'done')

    firebase.database().ref("users").on("value",datasnap=>{
      console.log(datasnap.val()[x]);
    //   email=datasnap.val()[x].email
    //   name=datasnap.val()[x].name
      console.log(changeEmail(datasnap.val()[x].email),changeName(datasnap.val()[x].name));
  })




// function CustomDrawerContent(props){
  return (
   <DrawerContentScrollView {...props} style={{backgroundColor:'#000'}}>
            {/* <Animated.View style={{transform:[{translateX}]}}> */}
       <View style={{height: 170, backgroundColor: '#0C0C0C', alignItems: 'center', justifyContent: 'center'}}>
         <Image source={require('../images/updates1.png')} style={{height: 120, width:200}}/>
  <Text style={{color:'#fff',fontSize:12}}>{name}</Text>
 <Text style={{color:'#fff',fontSize:12}}>{email}</Text>
       </View>
     <DrawerItemList {...props} />

    {/* </Animated.View> */}
   </DrawerContentScrollView>
 );
}

