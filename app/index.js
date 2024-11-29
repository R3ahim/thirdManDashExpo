import { View, Text, Button, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import { useNavigation } from '@react-navigation/native';

import { auth } from '../firebase'


import { useAuthState } from 'react-firebase-hooks/auth';













const url = 'https://server.deltakebab.com'


import { getAuth, createusersWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';

const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {


  return (
    <View style={styles.authContainer}>
       <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>

       <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#3498db" />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </Text>
      </View>
    </View>
  );
}
const AuthenticatedScreen = () => {
  return (
    <View style={styles.authContainer}>
     
   <Link href={'(drawer)/(tabs)/feed'} asChild>
        <Button title='dashbaord' />
      </Link>
      
      
    </View>
  );
};



export default function Page() {

 
  const [user, loading] = useAuthState(auth);



  



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setusers] = useState(null); // Track users authentication state
  const [isLogin, setIsLogin] = useState(true);



    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (users) => {
      setusers(users);
     if(users){

     }
    });


    return () => unsubscribe();
  }, [auth]);

  
  const handleAuthentication = async () => {
    try {
      if (users) {
        // If users is already authenticated, log out
        console.log('users logged out successfully!');
        await signOut(auth);
      } else {
        // Sign in or sign up
        if (isLogin) {
          // Sign in
          await signInWithEmailAndPassword(auth, email, password);
          console.log('users signed in successfully!');
        } else {
          // Sign up
          await createusersWithEmailAndPassword(auth, email, password);
          console.log('users created successfully!');
        //  navigation.navigate('(drawer)/(tabs)/feed')

        }
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };
 
  if(users){
  
  }
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
   {user ? (
        // Show users's email if users is authenticated
        <AuthenticatedScreen  />
      ) : (
        // Show sign-in or sign-up form if users is not authenticated
        <AuthScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
      )} 
   
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});