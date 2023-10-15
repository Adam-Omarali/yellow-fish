
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, TouchableOpacity, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import fish from '../assets/Background-Logo-Transparent.png'
import stingIcon from '../assets/SettingsIcon.png'


const renderItem = ({item}) => {
  return (
    <View
      style={{
        padding: 20,
        alignItems: 'center',
        backgroundColor: 'transparent',
      }}>
      <Text style={styles.subtitletwo}>{item.text}</Text>
    </View>
  );
};

export default function Settings() {
  return (

          <View style={styles.container}>

      <Text style={styles.title}>My Settings</Text>
      

      <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
        <TouchableOpacity style={styles.buttonOne}>
          <Link style={styles.btnText} href="/camera">
            <Text>Learn</Text>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonTwo}>
          <Link style={styles.btnText} href="/login">
            <Text>1 v 1</Text>
          </Link>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Welcome, [NAME]!</Text>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 15,
  },

  title: {
        fontSize: 30, 
        fontWeight: 'bold',
        marginTop: 80,
  },

  subtitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 3
  },

  subtitletwo: {
    fontSize: 20,
    fontWeight: 'thin',
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
    marginBottom: 20,
    lineHeight: 30,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 3
  },

  headerImg: {
    
    width: 100,
    height: 100,
    marginTop: -25,
    marginRight: 30,
    
  },

  headerImgTwo: {
    
    width: 50,
    height: 50,
    marginLeft: 10,
    
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

  buttonOne: {
    backgroundColor: '#E8DA00',
    borderRadius: 10,
    marginTop: 20,
    paddingVertical: 40,
    paddingHorizontal: 20,
    
  },

  buttonTwo: {
    backgroundColor: '#E8DA00',
    marginTop: 20,
    borderRadius: 10,
    paddingVertical: 40,
    paddingHorizontal: 30,
  },

  btnText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },

  transparentBg: {
    
  },

});
