import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import upload from './upload.png';
import dropdown from './dropdown.png';



export default function Page() {
  const [clicked, setClicked] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeOptions, setTimeOptions] = useState([]);



  

  useEffect(() => {
    const currentTime = new Date();
    const options = [
      { label: '30 Minutes', value: addMinutes(currentTime, 30) },
      { label: '40 Minutes', value: addMinutes(currentTime, 40) },
      { label: '60 Minutes', value: addMinutes(currentTime, 60) },
    ];
    setTimeOptions(options);
  }, []);

  const addMinutes = (date, minutes) => {
    const result = new Date(date);
    result.setMinutes(result.getMinutes() + minutes);
    return result.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={{
          width: '90%',
          height: 50,
          borderRadius: 10,
          borderWidth: 0.5,
          alignSelf: 'center',
          marginTop: 100,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 15,
          paddingRight: 15,
        }}
        onPress={() => {
          setClicked(!clicked);
        }}>
        <Text style={{fontWeight:'600'}}>
          {selectedTime == '' ? 'Select Time' : selectedTime}
        </Text>
        {clicked ? (
          <Image
            source={dropdown}
            style={{width: 20, height: 20}}
          />
        ) : (
          <Image
            source={upload}
            style={{width: 20, height: 20}}
          />
        )}
      </TouchableOpacity>
      {clicked ? (
        <View
          style={{
            elevation: 5,
            marginTop: 20,
            height: 300,
            alignSelf: 'center',
            width: '90%',
            backgroundColor: '#fff',
            borderRadius: 10,
          }}>
         
         
        

          <FlatList
            data={timeOptions}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    width: '85%',
                    alignSelf: 'center',
                    height: 50,
                    justifyContent: 'center',
                    borderBottomWidth: 0.5,
                    borderColor: '#8e8e8e',
                  }}
                  onPress={() => {
                    setSelectedTime(item.value);
                    setClicked(!clicked);
                  
                    
                  }}>
                  <Text style={{fontWeight: '600'}}>{item.value}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}
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
  