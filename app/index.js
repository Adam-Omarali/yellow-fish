
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, TouchableOpacity, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import fish from '../assets/Background-Logo-Transparent.png'
import bg from '../assets/BackgroundGradient.png'
import ViewPropTypes from 'deprecated-react-native-prop-types';
import ellipseIcon from '../assets/EllipseMain.png'

export const SLIDER_WIDTH = Dimensions.get('window').width + 30;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const data = [
  { id: 1, name: 'React JS', text: 'Walk, Scan, and Immerse Yourself in Different Languages.' },
  { id: 2, name: 'JavaScript', text: 'Compete Against your friends to become the best Language Learner!' },
  { id: 3, name: 'Node JS', text: 'Learning Languages on the Move in an Interactive Environment.' },
];


const renderItem = ({ item }) => {
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

export default function Home() {
  return (

    <View style={styles.container}>

      <Image
        source={bg}
        alt="Logo"
        style={styles.backgroundImg}
      />
      <Text style={styles.title}>Lexigo</Text>
      <Image
        source={fish}
        alt="Logo"
        style={styles.headerImg}
      />

      <Text style={styles.subtitle}>WELCOME</Text>

      <Carousel style={styles.transparentBg}
        data={data}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
      />
      <Image
        source={ellipseIcon}
        alt="Logo"
        style={styles.headerImgv2}
        contentFit='contain'
      />
      <TouchableOpacity style={styles.button}>
        <Link style={styles.btnText} href="/login">
          <Text>Get Started</Text>
        </Link>
      </TouchableOpacity>


    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 15,
  },

  title: {
    fontSize: 50,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
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
    textShadowOffset: { width: -0.5, height: 0.5 },
    textShadowRadius: 3
  },

  headerImg: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    paddingTop: 100,
    marginBottom: 7,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  headerImgv2: {
    position: 'absolute',
    width: 80,
    height: 80,
    alignSelf: 'center',
    paddingTop: 100,
    marginTop: 450,
    marginBottom: 7,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  backgroundImg: {
    position: 'absolute',
    width: 390,
    height: 844,
    alignSelf: 'center',
    paddingTop: 100,
    marginBottom: 7,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  button: {
    backgroundColor: '#E8DA00',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 120,

  },

  btnText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },

  transparentBg: {

  },

});
