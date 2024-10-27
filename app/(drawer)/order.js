import { View, Text, Button ,StyleSheet,Pressable, FlatList,ActivityIndicator, ScrollView,} from 'react-native'
import React, { useState ,useEffect} from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import axios from 'axios';

const url = 'https://reserver-vu5s.onrender.com'

// example of notifacation
import * as Notifications from 'expo-notifications';

export default function Page() {
  const [visble,setVisible] = useState(false)

    
    const [orderse,setOrders] = useState([]);
    const fetchAllOrders = async ()=>{
     
      const response = await axios.get(url + '/api/order/list')
      
      if (response.data.success) {
        setOrders(response.data.data);
        // console.log(response.data.data)
        
      }
      else{
        toast.error("Erorr")
      }
    }
    const statusHandler = async(event,orderId) =>{
      const response = await axios.post(url+"/api/order/status",{
        orderId,
        status:event.target.value
      })
      if (response.data.success) {
        await fetchAllOrders();
        
      }
    }
  
    useEffect(()=>{
      fetchAllOrders();
    },[])

    // console.log(orderse)
  
  
    
    const [SelectedIdData,setSelectedIdData] = useState({})


    
    const handleModale = (id) =>{
      setVisible(true)
      const datas = orderse?.find(order =>order._id ===id);
      setSelectedIdData(datas)
      // console.log(datas)
    }
    // ?notifcation

    useEffect(() => {
      (async () => {
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== 'granted') {
          await Notifications.requestPermissionsAsync();
        }
      })();
    }, []);
  
      // Configure notification presentation
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldPlaySound: true,   // Set to true to play sound

    }),
  
  });


    const hanldeAlert= async()=>{
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Delta kebab',
          body: 'A New Order is coming',
          sound: true,
          
        },
        trigger: null,  // Immediate notification
      });
    }

    const hanldeModaleOff = (id)=>{
      console.log('dlivery done')
      setVisible(false)
    }
    
    const getFilteredExtras = (itemsData) => {
      return itemsData.items?.map((item) => {
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
    

  return (
    <View  style={{flex:1}}>

        <View style={styles.headerBtn}>
      
<TouchableOpacity style={styles.button}  onPress={hanldeAlert}>
      <Text style={styles.text}>Pending and Accepted</Text>
    </TouchableOpacity>
<Pressable style={styles.button} >
      <Text style={styles.text}>Ready and Canceled</Text>
    </Pressable>

        </View>

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
  
  <ReactNativeModal
  isVisible={visble}
  onBackButtonPress={()=>setVisible(false)}
  onBackdropPress={()=>setVisible(false)}
  style={styles.modal}
  animationIn={'zoomInDown'}
  >

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
      <TouchableOpacity style={styles.modalBtn}  onPress={()=>hanldeModaleOff(SelectedIdData._id)}>
      <Text style={{color:'white',fontSize:20}}>Submit</Text>
    </TouchableOpacity>
    </View>

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
    modalBtn:{
      padding:10,
      marginHorizontal:'auto',
      // marginVertical:,
      backgroundColor:'tomato',
      textAlign:'center',
      marginTop:20,
      borderRadius:20,
      
    }
  });