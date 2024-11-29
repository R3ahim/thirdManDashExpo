import { View, Text, StyleSheet, Image } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import React, { useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  Feather,
  AntDesign,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { router, usePathname } from "expo-router";

const CustomDrawerContent = (props) => {
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userInfoWrapper}>
        <Image
          source={{ uri: "https://restaumatic-production.imgix.net/uploads/restaurants/275281/logo/1689151634.png?auto=compress%2Cformat&crop=focalpoint&fit=clip&h=500&w=500" }}
          width={80}
          height={80}
          style={styles.userImg}
        />
        <View style={styles.userDetailsWrapper}>
          <Text style={styles.userName}>jodlowa 11a</Text>
          <Text style={styles.userEmail}>Deltakeb@gmail.com</Text>
        </View>
      </View>
      <DrawerItem
        icon={({ color, size }) => (
          <Feather
            name="list"
            size={size}
            color={pathname == "/feed" ? "#fff" : "#000"}
          />
        )}
        label={"Feed"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/feed" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/feed" ? "#333" : "#fff" }}
        onPress={() => {
          router.push("/(drawer)/(tabs)/feed");
        }}
      />
   
     
   
      {/* <DrawerItem
        icon={({ color, size }) => (
          <Ionicons
            name="order-outline"
            size={size}
            color={pathname == "/order" ? "#fff" : "#000"}
          />
        )}
        label={"Orders"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/order" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/order" ? "#333" : "#fff" }}
        onPress={() => {
          router.push("/order");
        }}
      /> */}
         <DrawerItem
        icon={({ color, size }) => (
          <MaterialIcons
            name="favorite-outline"
            size={size}
            color={pathname == "/history" ? "#fff" : "#000"}
          />
        )}
        label={"History"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/history" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/history" ? "#333" : "#fff" }}
        onPress={() => {
          router.push("/history");
        }}
      />
         {/* <DrawerItem
        icon={({ color, size }) => (
          <Ionicons
            name="settings-outline"
            size={size}
            color={pathname == "/settings" ? "#fff" : "#000"}
          />
        )}
        label={"Settings"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/settings" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/settings" ? "#333" : "#fff" }}
        onPress={() => {
          router.push("/settings");
        }}
      /> */}
   
    </DrawerContentScrollView>
  );
};

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{headerShown: false}}>
      <Drawer.Screen name="order" options={{headerShown: true}} />
      <Drawer.Screen name="history" options={{headerShown: true}} />
      <Drawer.Screen name="settings" options={{headerShown: true}} />
    </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  navItemLabel: {
    marginLeft: -20,
    fontSize: 18,
  },
  userInfoWrapper: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  userImg: {
    borderRadius: 40,
  },
  userDetailsWrapper: {
    marginTop: 25,
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize:16,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  }
});
