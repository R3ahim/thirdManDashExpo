import { View, Text, Button } from 'react-native'
import React from 'react'
import {Link, useRouter} from 'expo-router';

export default function Page() {
  const router = useRouter();
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
     
      <Button onPress={() => router.back()} title='Go Back' />
    </View>
  )
}