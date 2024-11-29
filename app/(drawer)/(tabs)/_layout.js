import { View, Text, Button, TouchableOpacity,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Tabs, router } from 'expo-router'
import { Feather, AntDesign } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

import { DrawerToggleButton } from '@react-navigation/drawer';
import { io } from 'socket.io-client';
import axios from 'axios';



import * as Notifications from 'expo-notifications';

const url = 'https://server.deltakebab.com'
const socket = io(url);


export default function _layout() {
  

 
  return (
   <Tabs screenOptions={{headerLeft: () => <DrawerToggleButton tintColor='#000' />}}>
    <Tabs.Screen name='feed' options={{
      tabBarIcon: ({color}) => (
        <Feather name="list" size={24} color={color} />
      ),
      tabBarLabel: 'Feed',
      // headerRight:() =><View style={styles.btnStyle}> <TouchableOpacity style={styles.buttoner}><Text style={{fontSize:20}}>{orderse.length}</Text> <Text style={{color:'blue',fontSize:17}}>Prepareing</Text></TouchableOpacity>   <TouchableOpacity style={styles.buttoner}><Text style={{fontSize:20}}>{orderse.length}</Text> <Text style={{color:'blue'}}>Delivering</Text></TouchableOpacity> </View>,
      // headerLeft: () => <Button onPress={() => router.push('feed/new')} title='Add Post' />,
      headerTitle:'Feed' 
    }} />
     <Tabs.Screen name='preparing' options={{
      tabBarIcon: ({color}) => (
<MaterialCommunityIcons name="coffee-maker" size={20} color="black" />
      ),
      tabBarLabel: 'Preparing',
      headerTitle: 'Preparing'
    }} />
    <Tabs.Screen name='delivering' options={{
      tabBarIcon: ({color}) => (
<MaterialCommunityIcons name="truck-delivery" size={24} color="black" />
      ),
      tabBarLabel: 'Delivering',
      headerTitle: 'Delivering'
    }} />
 
      <Tabs.Screen name='profile' options={{
      tabBarIcon: ({color}) => (
     <Ionicons name="checkmark-done-circle" size={24} color="black" />
      ),
      tabBarLabel: 'Done',
      headerTitle: 'Done'
    }} />
   </Tabs>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
 btnStyle:{
   display:'flex',
   flexDirection:'row',
   gap:10
 },
   buttoner:{
    display:'flex',
    alignItems:'center',
    justifyContent:"center",
    flexDirection:'column'
   }


  });
    