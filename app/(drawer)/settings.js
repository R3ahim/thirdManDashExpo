import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image,  Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
const url = 'https://reserver-vu5s.onrender.com'

export default function Page() {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
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

  const statusHandler = async (status, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status,
      });
      if (response.data.success) {
        fetchAllOrders();
      } else {
        Alert.alert("Error", "Failed to update status");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <View style={styles.container}>
    <Text style={styles.heading}>Order Page</Text>
    <FlatList
      data={orders}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item: order }) => (
        <View style={styles.orderItem}>
     <Text>ThisIcon</Text>
          <View style={styles.orderDetails}>
            <Text style={styles.orderItemFood}>
              {order.items.map((item, index) => {
                const isLastItem = index === order.items.length - 1;
                return item.name + " x " + item.quantity + (isLastItem ? "" : ", ");
              })}
            </Text>
            <Text style={styles.orderItemName}>
              {order.address.firstName + " " + order.address.lastName}
            </Text>
            <View style={styles.orderItemAddress}>
              <Text>{order.date}</Text>
              <Text>{order.address.method}</Text>
              <Text>{order.address.address + ","}</Text>
              <Text>
                {order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.postCode}
              </Text>
            </View>
            <Text style={styles.orderItemPhone}>{order.address.phone}</Text>
            <Text>
              Status: {order.payment ? <Text style={{ color: "green" }}> Paid</Text> : <Text style={{ color: "red" }}>Not Paid</Text>}
            </Text>
          </View>
          <Text>Items: {order.items.length}</Text>
          <Text>PLN {order.amount}</Text>
          {/* <Picker
            selectedValue={order.status}
            style={styles.picker}
            onValueChange={(value) => statusHandler(value, order._id)}
          >
          </Picker> */}
          <Button title="Delete" onPress={() => Alert.alert("Delete", "Delete function here")} />
        </View>
      )}
    />
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  padding: 20,
  backgroundColor: "#fff",
},
heading: {
  fontSize: 24,
  fontWeight: "bold",
  marginBottom: 20,
},
orderItem: {
  padding: 15,
  borderWidth: 1,
  borderColor: "#ddd",
  borderRadius: 8,
  marginBottom: 10,
  flexDirection: "row",
  alignItems: "center",
},
image: {
  width: 50,
  height: 50,
  marginRight: 10,
},
orderDetails: {
  flex: 1,
},
orderItemFood: {
  fontSize: 16,
  marginBottom: 5,
},
orderItemName: {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 5,
},
orderItemAddress: {
  marginBottom: 5,
},
orderItemPhone: {
  color: "#555",
  marginBottom: 5,
},
picker: {
  height: 50,
  width: 150,
},
});
  