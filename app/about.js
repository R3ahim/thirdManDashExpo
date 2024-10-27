import { View, Text, Button,StyleSheet, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import {useRouter} from 'expo-router';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const url = 'https://reserver-vu5s.onrender.com'
export default function About() {
  const router = useRouter();
  const [orders,setOrders] = useState([]);
  const fetchAllOrders = async ()=>{
   
    const response = await axios.get(url + '/api/order/list')
    
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data)
      
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
  console.log(orders)


  // Render each order
  const renderOrder = ({ item }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.orderTitle}>Order ID: {item._id}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Total Amount: ${item.amount}</Text>
      <Text>Date: {new Date(item.date).toLocaleString()}</Text>
      
      <Text style={styles.itemsHeader}>Items:</Text>
      <FlatList
        data={item.items}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}  // Use renderItem function for each item
      />
    </View>
  );

  // Render each item within an order
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <Text>Name: {item.name}</Text>
      <Text>Size: {item.sizeId} (${item.sizePrice})</Text>
      <Text>Quantity: {item.quantity}</Text>
      <Text>Meat: {item.meatId || 'None'}</Text>
      <Text>Sauce: {item.sauceId}</Text>
    </View>
  );


  return (
    <View >
      <Text style={{fontSize:18}}>About Page {orders.length}</Text>
      <Button onPress={() => router.back()} title='Go Back' />
    
      <FlatList  data={orders} renderItem={(element) =>{return(<Pressable style={styles.flatBtn}>
<View style={styles.flatMain}>
<View style={styles.flatFirst}>
  {/* first part */}
  <View style={styles.flatOne}>
  <MaterialCommunityIcons name="dolby" size={36} color="black" />
    <Text>12</Text>

  </View>
  <View>
    <Text style={styles.flatHeadText}>Order name</Text>
    <Text>orderType</Text>
    <Text>order Product name</Text>

  </View>
</View>

{/* seocnd chapter */}
<View>
  <Text>12:20</Text>
  <Text>order Price: 20</Text>
  <Text>online</Text>
</View>


  </View>
  

  
  
  </Pressable>)}}/>







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
  }
});