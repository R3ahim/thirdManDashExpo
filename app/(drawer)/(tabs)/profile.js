import { View, Text, Button ,StyleSheet,Pressable, FlatList,ActivityIndicator, ScrollView, Alert,} from 'react-native'
import React, { useState ,useEffect} from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import axios from 'axios';



const url = 'https://server.deltakebab.com'

// example of notifacation
import * as Notifications from 'expo-notifications';




export default function Page({selectedDevice}) {
  const [visble,setVisible] = useState(false)
  const [selectedTime, setSelectedTime] = useState(null);

  const [orderser, setOrders] = useState([]);



  const fetchAllOrders = async () => {
      try {
          const response = await axios.get(`${url}/api/order/today`);
          if (response.data.success) {
              setOrders(response.data.data);
          } else {
              Alert.alert("Error", "Failed to fetch orders");
          }
      } catch (error) {
          console.error(error);
          Alert.alert("Error", "Failed to fetch orders");
      }
  };
  const orderse = orderser.filter(order=>order.status ==='done')



    

    // console.log(orderse)
  
  

    
    const [SelectedIdData,setSelectedIdData] = useState({})


    
    const handleModale = (id) =>{
      setVisible(true)
      const datas = orderse?.find(order =>order._id ===id);
      setSelectedIdData(datas)

      // console.log(datas)
    }


      // Configure notification presentation
  const hanldeModaleOff = id =>{
    setVisible(false)
  }

    useEffect(() => {
      const interval = setInterval(() => {
        fetchAllOrders();
      }, 5000); // 5 seconds
  
      return () => clearInterval(interval); // Cleanup on component unmount
    }, []);
    
    const getFilteredExtras = (itemsData) => {
      return itemsData?.items?.map((item) => {
        const filteredExtra = item?.extra?.filter((extra) => extra.quanity > 0);
        const filteredExtraSauce = item?.extraSauce?.filter((extraSauce) => extraSauce.quanity > 0);
        
        return {
          name: item.name,
          extra: filteredExtra,
          extraSauce: filteredExtraSauce,
        };
      });
    };
    
    const result = getFilteredExtras(SelectedIdData);
    // console.log(result);
 

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000 * 60); // Update every minute
  
      return () => clearInterval(timer);
    }, [100]);
  
    const calculateTimeDifference = (targetTime) => {
      const [targetHours, targetMinutes] = targetTime.split(':').map(Number);
  
      // Set the target time based on today's date and the given hours and minutes
      const targetDate = new Date();
      targetDate.setHours(targetHours, targetMinutes, 0, 0);
  
      // Calculate the difference in minutes
      const difference = (targetDate - currentTime) / (1000 * 60);
      return difference > 0 ? Math.floor(difference) : 0; // Show 0 if time has passed
    };
  

  return (
    <View  style={{flex:1}}>

   

<ScrollView>



<FlatList  data={orderse} renderItem={(element,index) =>{return(<Pressable onPress={()=>handleModale(element.item._id)}  style={styles.flatBtn}>
<View style={styles.flatMain}>

<View style={styles.flatFirst}>
  {/* first part */}
  <View style={styles.flatOne}>
  <MaterialCommunityIcons name="dolby" size={36} color="black" />
    <Text>{index}</Text>

  </View>
  <View>
    <Text style={styles.flatHeadText}>{element.item.address.firstName}</Text>
    <Text> {element.item.items.map((item, index) => {
                const isLastItem = index === element.item.items.length - 1;
                return  item.sizeId + " "  + item.name + " X " + item.quantity + (isLastItem ? "" : ", ");
              })}</Text>
              <Text></Text>
              <Text>{element.item.method}</Text>
              <Text>{element.item.paymentImple}</Text>
              <Text style={{fontSize:17,}}> available time: {calculateTimeDifference(element.item.remTime)}</Text>

  </View>
</View>


{/* seocnd chapter */}
<View>
  <Text>{element.item.amount}</Text>
  <Text>{element.item.amount}</Text>
  {/* <Text>{element.item.payment === false?'Not Paid':'Not Paid'}</Text> */}
  <Text>
       {element.item.payment ? <Text style={{ color: "green" }}> Paid</Text> : <Text style={{ color: "red" }}>Not Paid</Text>}
  </Text>
</View>


  </View>
  

  
  
  </Pressable>)}}/>
  </ScrollView>

  <ReactNativeModal
  isVisible={visble}
  onBackButtonPress={()=>setVisible(false)}
  onBackdropPress={()=>setVisible(false)}
  style={styles.modal}
  animationIn={'zoomInDown'}
  >
<ScrollView>
    <View style={styles.modalView}>
      <Text style={styles.modalTitle}>Order Conformation</Text>
      {/* Price Will */}
      <View> 
    <Text style={styles.modalText}>Full Amount</Text>
    <Text style={styles.modalTitle}>{SelectedIdData.amount} PLN</Text>

    <View style={styles.modalInfo}> 
       <View>
        <Text>User Id</Text>
        <Text>Transiction Type</Text>
        <Text>Status</Text>
        <Text>Payment</Text>
        <Text>Datae</Text>
       </View>
       <View>
       <Text >#125ssce</Text>
        <Text>Delivery</Text>
        <Text>Paid</Text>
        <Text>Online</Text>
        <Text>27101991</Text>
        
       </View>
       
    </View>
    
    <Text style={{marginTop:10,fontSize:20}}>User Info</Text>
    <View style={styles.modalInfo}> 
       <View>
        <Text>Name</Text>
        <Text>Address</Text>
        <Text>Phone</Text>
        <Text>Postal Code</Text>
        <Text>email</Text>
       </View>
       <View>
       <Text >{SelectedIdData.address?.firstName}</Text>
        <Text>{SelectedIdData.address?.address}</Text>
        <Text>{SelectedIdData.address?.phone}</Text>
        <Text>{SelectedIdData.address?.postalCode}</Text>
        <Text>{SelectedIdData.address?.email}</Text> 
       </View>

       
    </View>
    <View style={styles.modalInfo}> 
      
       <View>
       <FlatList  data={SelectedIdData.items} renderItem={(element,index) =>{return(
    <View>
      <Text style={{fontSize:17}}>Product Name</Text>
      <Text style={{fontSize:14}}> {element.item.sizeId}  {" "}  {element.item.name} X {element.item.quantity} + {element.item.meatId} + {element.item.sauceId}</Text>
      <View></View>
      <Text style={{fontSize:17}}>Extra Meat and Sacue</Text>
      <FlatList  data={result} renderItem={(element,index) =>{return(
            <View> 
            <Text>{element.item.extra.map((item, index) => {
              return item.name
            })}</Text>
            <Text>{element.item.extraSauce.map((item, index) => {
              return item.name
            })}</Text>
            </View>

      )}}/>
          
  
     </View>
)}}/>
       </View>

       
    </View>
      </View>
      {/* modal end */}
 <View style={styles.modalBtnControle}>
 <TouchableOpacity style={styles.modalBtn}  onPress={()=>hanldeModaleOff(SelectedIdData._id,SelectedIdData.address.email,selectedTime,SelectedIdData.address?.firstName)}>
      <Text style={{color:'white',fontSize:20}}>Ok</Text>
    </TouchableOpacity>
 </View>
    </View>

    </ScrollView>
      </ReactNativeModal>
    </View>
  )
}


const styles = StyleSheet.create({
    headerBtn: {
        display:'flex', alignItems:"center", flexDirection:'row',gap:9,margin:10,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 4,
      paddingHorizontal: 14,
      borderRadius: 9,
      elevation: 3,
      backgroundColor: 'white',
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'black',
    },
    flatBtn:{
      backgroundColor:'white',

      padding:10,
      borderRadius:10,
      margin:10,


    },
    flatMain:{
      display:"flex",
      alignItems:"center",
      justifyContent:'space-between',
      flexDirection:'row',
      
      

    },
    flatFirst:{
      display:'flex',
      alignItems:"center",
      justifyContent:'center',
      flexDirection:'row',
      gap:10
    },
    flatHeadText:{
        fontSize:20
    },
    flatOne:{
       display:'flex',
       alignItems:'center',
       flexDirection:'column',
       justifyContent:'center',
      gap:2
    },
    // modal styleing

    modal:{
      justifyContent:'flex-end',
      margin:0
    },
    modalView:{
      backgroundColor:'white',
      height:800,
      borderRadius:20,
      borderTopRightRadius:40,
      borderTopLeftRadius:40,
      padding:20,
    },
    modalTitle:{
      fontSize:24,
      fontWeight:'bold',
      padding:5
    },
    modalText:{
     fontSize:15
    },

    modalInfo:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      gap:4,
      alignItems:'center',
      backgroundColor:'#e6e8e7',
      padding:15,
      fontSize:20,
     borderRadius:10,
     marginTop:3
    }
    ,
    modalBtnControle:{
      display:'flex',
      flexDirection:'row',
      alignContent:"center",
      justifyContent:'center',
      gap:10

    }
    ,
    modalBtn:{
      padding:20,
      marginVertical:'auto',
      marginTop:20,
      borderRadius:20,
      backgroundColor:'tomato'
      
    }
  });