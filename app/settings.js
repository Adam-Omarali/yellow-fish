
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, TouchableOpacity, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import fish from '../assets/Background-Logo-Transparent.png'
import barrowIcon from '../assets/backArrow.png'


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
      <View style={styles.buttonContainer}>
        <Link href="/home">
          <Image
            source={barrowIcon} // Replace with the actual sourwce of your image
            style={styles.headerImgTwo}
            contentFit='contain'
          />
        </Link>
      </View>
      <Text style={styles.title}>My Settings</Text>
      

      <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
        <View style={styles.buttonOne}>
        <Text style={styles.subtitle}>What Language Do You Want To Learn?</Text>
          
          
          <Link style={styles.btnText} href="/home">
            <TouchableOpacity style={styles.buttonTwo} href="/home">
            <Link href="/home">
            <Text>English</Text>
            </Link>
            </TouchableOpacity>
          </Link>
        

          <Link style={styles.btnText} href="/home">
            <TouchableOpacity style={styles.buttonTwo} href="/home">
            <Link href="/home">
            <Text>French</Text>
            </Link>
            </TouchableOpacity>
          </Link>

  
          <Link style={styles.btnText} href="/home">
            <TouchableOpacity style={styles.buttonTwo} href="/home">
            <Link href="/home">
            <Text>Spanish</Text>
            </Link>
            </TouchableOpacity>
          </Link>


  
        </View>
      </View>
      

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
        marginTop: 5,
  },

  subtitle: {
    marginTop: 10,
    paddingBottom: 2,
    fontSize: 25,
    fontWeight: 'thin',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 3,
    textAlign: 'center',
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
    height: 375,
    width: 335,
    backgroundColor: '#E8DA00',
    borderRadius: 10,
    marginTop: 20,
    flex: 'center',
    
  },

  buttonTwo: {
    backgroundColor: '#fff',
    height: 50,
    width: 300,
    marginVertical: 10,
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 25,
    marginLeft: 10,
    
  },

  btnText: {
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 11,
    marginVertical: 10,
  },

  buttonContainer: {
    alignSelf: 'left',
  },

  transparentBg: {
    
  },

});
