import axios from 'axios';
import { appendBaseUrl } from 'expo-router/build/fork/getPathFromState';
import React, {useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native'
const url = 'https://server.deltakebab.com/api/order/list';

export default function Page() {
  const [data, setData] = useState([]);
  // const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [filterOrder,setFilteredOrders] = useState(filteredData)

  const [filteredOrders, setFilteredOrders] = useState(data);
  const [filterMethod, setFilterMethod] = useState(''); // Track selected method
  const [dateFilter, setDateFilter] = useState('all'); // Track selected date filter








  useEffect(() => {
    // Fetch data from your API f
    axios.get(url)
      .then(response => {
        setData(response.data.data);  // Assuming the response structure is { data: { data: [...] } }
        // setFilteredData(response.data.data);  // Initially show all data
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
  
 


  const applyFilters = () => {
    let filtered = data;

    // Filter by method if selected
    if (filterMethod) {
      filtered = filtered.filter(order => order.method === filterMethod);
    }

    // Filter by date range if selected
    if (dateFilter !== 'all') {
      const today = new Date();
      
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.date);

        switch (dateFilter) {
          case 'today':
            return (
              orderDate.toDateString() === today.toDateString()
            );
          case 'yesterday':
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            return orderDate.toDateString() === yesterday.toDateString();
          case 'week':
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay()); // Saturday to Friday
            return (
              orderDate >= startOfWeek &&
              orderDate <= today
            );
          case 'month':
            return (
              orderDate.getMonth() === today.getMonth() &&
              orderDate.getFullYear() === today.getFullYear()
            );
          default:
            return true;
        }
      });
    }

    setFilteredOrders(filtered);
  };

  useEffect(() => {
    applyFilters();
    console.log(dateFilter)
  }, [filterMethod, dateFilter],10000);

  if (loading) {
    console.log('somehting')
  }
  const totalAmount = filteredOrders.reduce((sum, order) => sum + order.amount, 0);



  const renderItem = ({item,index})=>{
    return(
      <View style={styles.row}>
        <Text style={[styles.cell, {width:45}]}>{(index + 1).toString()}</Text>
        <Text style={[styles.cell, {width:150}]}>{new Date(item.date).toDateString()}</Text>
        <Text style={[styles.cell, {width:100}]}>{item.address.firstName}</Text>
        <Text style={[styles.cell, {width:100}]}>{item.method}</Text>
        <Text style={[styles.cell, {width:100}]}>{item.amount}Pln</Text>
        
      </View>
    )

  }

  return (
    <View  style={styles.container}>
      {/* <Button title={orderse.length}/> */}
      <View style={styles.headerBtn}>
      
      <TouchableOpacity style={styles.button}  onPress={() => { setDateFilter('all'); applyFilters(); }}>
            <Text style={[styles.text,dateFilter==='all'?{color:"blue"}:{color:"black"}]}>All</Text>
          </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => { setDateFilter('today'); applyFilters(); }} >
            <Text style={[styles.text,dateFilter==='today'?{color:"blue"}:{color:"black"}]}>Today</Text>
          </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => { setDateFilter('yesterday'); applyFilters(); }}  >
            <Text style={[styles.text,dateFilter==='yesterday'?{color:"blue"}:{color:"black"}]} >Yesterday</Text>
          </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => { setDateFilter('week'); applyFilters(); }} >
            <Text style={[styles.text,dateFilter==='week'?{color:"blue"}:{color:"black"}]}>Week</Text>
          </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => { setDateFilter('month'); applyFilters(); }}  >
            <Text style={[styles.text,dateFilter==='month'?{color:"blue"}:{color:"black"}]}>Month</Text>
          </TouchableOpacity>
 
      
              </View>
              {/* filter by bank */}
            <View style={styles.headerBtn}>
            <TouchableOpacity style={styles.button}  onPress={() => { setFilterMethod('Cash on Delivery');  }} >
            <Text style={[styles.text,filterMethod==='Cash on Delivery'?{color:"blue"}:{color:"black"}]}>Cash</Text>
          </TouchableOpacity>
      <TouchableOpacity style={styles.button}  onPress={() => { setFilterMethod('Online Payment'); }}>
            <Text style={[styles.text,filterMethod==='Online Payment'?{color:"blue"}:{color:"black"}]}>Bank</Text>
          </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => { setFilterMethod('Cash on Card');  }}  >
            <Text style={[styles.text,filterMethod==='Cash on Card'?{color:"blue"}:{color:"black"}]}>Card</Text>
          </TouchableOpacity>
              
            </View>



      <View style={styles.listContainer}>

        <View style={styles.header}>
          <Text style={[styles.headerText, {width:45}]}>Si.no</Text>
          <Text style={[styles.headerText, {width:40}]}>date</Text>
          <Text style={[styles.headerText, {width:120}]}>Name</Text>
          <Text style={[styles.headerText, {width:120}]}>Payment</Text>
          <Text style={[styles.headerText, {width:50}]}>Total</Text>


        </View>
        <FlatList 
        
        data={filteredOrders}
        renderItem={renderItem}
        keyExtractor={(item,index)=>index.toString()}
        
        />


      </View>

      <View style={{display:'flex',flexDirection:'column'}}>
        <Text style={styles.btm_btn}>Number of Orders : <Text style={styles.btm_text}>{filteredOrders.length}</Text></Text>
        <Text style={styles.btm_btn}>Total Amount :  <Text style={styles.btm_text}>{totalAmount}</Text> PLN</Text>
      </View>

 

    </View>
  )
}

const styles = StyleSheet.create({
 
  container:{
    flex:1,
    backgroundColor:'#fff',
    paddingVertical:30,
    paddingHorizontal:20,
  }
  ,
  listContainer:{
    flex:1
  },
  header:{
    flexDirection:'row',
    paddingVertical:10,
    borderBottomWidth:1,
    borderBottomColor:"#e1e1e1"
    
  },
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
  headerText:{
  
    fontSize:15,
    flex:1,
  },
  row:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginVertical:8,
    elevation:1,
    borderRadius:3,
    paddingVertical:10,
    backgroundColor:"#fff",
    paddingHorizontal:6
  },
  cell:{
    fontSize:14,
    flex:1
  },
  btm_btn:{
     color:'black',
     fontSize:15,
     fontWeight:'bold'

  },
  btm_text:{
     fontSize:19,
     fontWeight:'condensedBold'
  }
    
})