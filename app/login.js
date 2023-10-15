import React, { useState } from 'react';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import fish from '../assets/LogoTransparent.png'

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (text) => {
    setName(text);
  };
  
  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };  

  return (
    <View style={styles.container}>

      <Image
        source={fish}
        alt="Logo"
        style={styles.headerImg}
      />

      <Text style={styles.title}>Let's get started.</Text>

    <View style={styles.container}>
    <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={handleNameChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button}>
        <Link style={styles.buttonText} href="/settings">
          <Text>Sign Up!</Text>
        </Link>
      </TouchableOpacity>

      <Text style={styles.body}>
        Already signed up? <Text style={styles.bodyLogIn}>Log in.</Text>
      </Text>
    </View>

</View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -20,
    backgroundColor: 'rgba(255,255,255,0)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36, 
    fontWeight: 'bold',
    color: '#000',
  },
  body: {
    fontSize: 14, 
    fontWeight: 'bold',
    color: '#d9d9d9',
    marginTop: 40,
  },
  bodyLogIn: {
    fontSize: 14, 
    fontWeight: 'bold',
    color: '#e8da00',
    marginTop: 40,
  },
  backgroundImg: {
    position: 'absolute',
    width: 390,
    height: 844,
    alignSelf: 'center',
    paddingTop: 100,
    marginBottom: 7,
     shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 2,
  },
  headerImg: {
    width: 203,
    height: 162,
    alignSelf: 'center',
    marginVertical: 60,
  },
  input: {
    width: 300,
    height: 60,
    borderWidth: 1,
    borderColor: '#d9d9d9', // Border color (gray)
    backgroundColor: '#f6f6f6',
    fontSize: 18,
    borderRadius: 20, // Rounded corners
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#E8DA00',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 24, 
    fontWeight: 'bold',
    color: 'white',
  },

});