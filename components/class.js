import React ,{Component} from 'react'
import { Text ,View,TouchableOpacity,Dimensions,ActivityIndicator,Image,ImageBackground,FlatList,Modal,Alert,TextInput} from 'react-native'
const {width,height} = Dimensions.get('window')
import Entypo from 'react-native-vector-icons/Entypo'
// import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from 'firebase'

var x
var data=[]
export default class Class extends Component{
    state={
        plus:false,
        subName:'',
        name:'',
        email:'',
        subData:[],
        isFetching:false,
        isLoading:false,
        facultyName:'',
        enrollment:'',
        dt :[],
        phone:'',

    }
    signOut = () => {
        firebase.auth().signOut().then(() => {
          this.props.navigation.replace('Login')
        })
        .catch(error => this.setState({ errorMessage: error.message }))
      }

      async componentDidMount(){
          x = await firebase.auth().currentUser.uid
        //   x = await 
         await firebase.database().ref("users").on("value",datasnap=>{
            this.setState({name:datasnap.val()[x].name,email:datasnap.val()[x].email,enrollment:datasnap.val()[x].enrollment,phone:datasnap.val()[x].phone})
        })
        this.fetchData()
        this.fetchClass()
// var dt=[]






        // this.fetchData()
        // console.log();
      }
      
      joinClass = async (data) => {
        console.log(data);
        ////////////////////////////

          this.setState({isLoading:true})
          var alreadyExists=false
        try {
          await firebase.firestore().collection('classes')
          .doc(this.state.email)
          .get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
          //   console.log(docSnapshot.data()['subjects']);
            for(var i in docSnapshot.data()['subjects']){
            //  console.log(docSnapshot.data()['subjects'][i]);
            if(docSnapshot.data()['subjects'][i].subName==data.class&&docSnapshot.data()['subjects'][i].teacher==data.fname)
              alreadyExists=true
            }
          }
        })
        if (alreadyExists) {
          Alert.alert('You Already Joined Class.')
          this.setState({isLoading:false})
            
        }
          else {

        await firebase.database().ref("classes" +'/'+ data.class +'/Attendance/'+data.fname+'/'+this.state.enrollment).set({
          data:{
            "email": this.state.email,
            "enrollment": this.state.enrollment,
            "name": this.state.name,
            "phone": this.state.phone
          }
        })
        await firebase.firestore().collection('classes')
        .doc(this.state.email)
        .get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
              firebase.firestore().collection('classes')
              .doc(this.state.email)
              .update({
                  subjects: firebase.firestore.FieldValue.arrayUnion({subName:data.class,teacher:data.fname})
              })
          }
          else{
              firebase.firestore().collection('classes')
          .doc(this.state.email)
          .set({
              subjects:[{subName:data.class,teacher:data.fname}]
              })
          }
        })

        Alert.alert('You joined class'  )
        }
          this.setState({isLoading:false})
          // this.setState({isSearchFound:false})
        // this.setState({isSearchData:false})
        // this.fetchData()
        //////////////////////////////////////////////////
        } catch (error) {
          console.log(error);
        }

        // }





/////////////////////

      }

      fetchData = async () => {
          this.setState({isFetching:true})
          var data=[]
        var k=0
       await firebase.firestore().collection('classes')
        .doc(this.state.email)
        .get()
          .then((docSnapshot) => {
            //   console.log(docSnapshot.data());
              for (var i in docSnapshot.data()){
                 for (var j in  docSnapshot.data()[i]){
                //  console.log(j);
                data.push({
                  'id': k.toString(),
                  'subName':docSnapshot.data()[i][j].subName,
                  'teacher':docSnapshot.data()[i][j].teacher

                })

              k+=1
              }
            }

          })
        // .then()
        this.setState({subData:data})
          // console.log(this.state.subData);
        this.setState({plus:false,isFetching:false})

      }

      fetchClass = async () =>{
        var cnt =0
        var dt=[]
        await firebase.firestore().collection('TotalClasses')
        .get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              // console.log(doc.id, " => ", doc.data());
              for (var i in doc.data()['fname']){
                // console.log(i);
                for ( var j in doc.data()['fname'][i] ){
                  // console.log(doc.data()['fname'][i][j]);
                  dt.push({
                    'id'    : cnt,
                    'class' : doc.id,
                    'fname' : doc.data()['fname'][i][j]
                  })
                  cnt +=1
                }
              }
          });
      });
      this.setState({dt:dt})
      console.log(this.state.dt);
      this.setState({isFetching:false})

      }



    render(){
        return(
            <View style={{flex:1}}>
                {this.state.isLoading &&
                <View style={{height:height,width:width,opacity:1,opacity:0.8,backgroundColor: 'rgba(52, 52, 52, 0.8)',position:'absolute',elevation:7}}> 
                        <View style={{    position: 'absolute',elevation:6,
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center'}}>
                          <ActivityIndicator size='large' color="white"/>
                        </View>
                        </View>

                }
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
                  style={{flex:1,marginTop:100,height:height-100,width:width,resizeMode: 'cover',position:'absolute'}}
                  />
                <Text style={{color:'#4285F4',alignSelf:'center',margin:10,fontWeight:'bold',fontFamily:'',fontSize:35}}>CLASSES</Text>
             <View style={{alignItems:'center',flex:1}}>

                            <FlatList
                            style={{elevation:2,height:height-150}}                  
                            onRefresh={()=>{this.fetchData()}}
                            refreshing={this.state.isFetching}
                                data={this.state.subData}
                                // horizontal
                                // inverted
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => (
                                <View style={{marginTop:0,marginBottom:0,borderBottomWidth:0.5,padding:5,justifyContent:'center',borderBottomColor:'white'}}>
                                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Inclass',{subName:item.subName,teacher:item.teacher})}}>
                                    
                                <View style={{flexDirection:'row'}} >
                                    <Text style={{color:'#F9C04D',margin:5,fontWeight:'bold',fontFamily:'',fontSize:20}}>Class:      </Text>
                                    <Text style={{color:'white',width:width-60,margin:5,alignSelf:'auto',fontWeight:'bold',fontFamily:'',fontSize:20}}>{item.subName}</Text>
                                </View>
                                <View style={{flexDirection:'row'}} >
                                    <Text style={{color:'#F9C04D',margin:5,fontWeight:'bold',fontFamily:'',fontSize:20}}>Teacher: </Text>
                                    <Text style={{color:'white',width:width-60,margin:5,alignSelf:'auto',fontWeight:'bold',fontFamily:'',fontSize:20}}>{item.teacher}</Text>
                                </View>
                                    
                                    {/* <Text style={{color:'white',width:width-60,margin:10,alignSelf:'auto',fontWeight:'bold',fontFamily:'',fontSize:20}}>{item.subName}</Text> */}
                                </TouchableOpacity>
                                </View>
                                )}
                            />





             </View>



             <Modal animationType='slide' transparent={true} visible={this.state.plus} onRequestClose={() => {this.setState({plus:false})}}>
             <View style={{height:height,width:width}} >
                    {this.state.isLoading &&
                            <View style={{height:height,width:width,opacity:1,opacity:0.8,backgroundColor: 'rgba(52, 52, 52, 0.8)',position:'absolute',elevation:7}}> 
                                <View style={{    position: 'absolute',elevation:6,
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                    alignItems: 'center',
                                    justifyContent: 'center'}}>
                                    <ActivityIndicator size='large' color="white"/>
                                </View>
                            </View>

                            }
                            <ImageBackground
                            source={
                            require('../images/homeback.jpg')}
                            style={{flex:1,height:height,width:width,position:'absolute',marginBottom:0,resizeMode: 'cover'}}/> 
                            <View style={{flexDirection:'row'}} >
                              <TouchableOpacity style={{marginTop:20}} onPress={()=>{console.log('X'),this.setState({plus:false})}}>
                               <MaterialIcons name='arrow-back' style={{color:'white',marginLeft:10}} size={40} />
                              </TouchableOpacity>
                        <Text style={{color:'#4285F4',fontWeight:'bold',marginLeft:width/5,fontFamily:'',marginTop:20,fontSize:width/13}}>Join Class</Text>
                              {/* <Text>Join Class</Text> */}
                            </View>
                            <FlatList
                            style={{elevation:2,paddingBottom:150,flexGrow: 0,height:height-70}}                  
                            onRefresh={()=>{this.fetchClass()}}
                            refreshing={this.state.isFetching}
                                data={this.state.dt}
                                // horizontal
                                // inverted
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => (
                                <View style={{marginTop:0,marginBottom:0,borderBottomWidth:0.5,padding:5,justifyContent:'center',borderBottomColor:'white'}}>
                                <View style={{flexDirection:'row'}} >
                                    <Text style={{color:'#F9C04D',margin:5,fontWeight:'bold',fontFamily:'',fontSize:20}}>Class:      </Text>
                                    <Text style={{color:'white',width:width-60,margin:5,alignSelf:'auto',fontWeight:'bold',fontFamily:'',fontSize:20}}>{item.class}</Text>
                                </View>
                                <View style={{flexDirection:'row'}} >
                                    <Text style={{color:'#F9C04D',margin:5,fontWeight:'bold',fontFamily:'',fontSize:20}}>Teacher: </Text>
                                    <Text style={{color:'white',width:width-60,margin:5,alignSelf:'auto',fontWeight:'bold',fontFamily:'',fontSize:20}}>{item.fname}</Text>
                                </View>
                                <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>{this.joinClass(item)}}>
                                  <View style={{alignItems:'center',backgroundColor:'#F9C04D',height:30,justifyContent:'center',width:width/2.5,borderRadius:15,margin:5}} >
                                    <Text style={{fontSize:18,fontWeight:'bold',fontFamily:''}} >JOIN</Text>
                                  </View>
                                </TouchableOpacity>
                                </View>
                                )}
                            />
                            




                            
                    </View> 
             </Modal>
              <View style={{position:'absolute',marginLeft:width-70,marginTop:height-70}}>
                  <TouchableOpacity onPress={()=>{console.log('+'),this.setState({plus:true})}}>
                      <AntDesign name='pluscircle' style={{color:'#F9C04D'}} size={50} />
                  </TouchableOpacity>
              </View>
                                
            </View>
        );
    }
}