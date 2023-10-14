import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { Image } from 'expo-image';
import fish from './Lexigo.png'

export default function Home() {

    useEffect(() => {
        async function load(){
            tf.ready();
            console.log('ready')
        }
        load()
    }, [])

  return (
    <View style={styles.container}>
      <Text>Yellow Fish</Text>
      <Image source={fish} style={{width: 100, height: 100}}/>
      <Link href="/translate">Translate</Link>
      <Link href="/prediction">Prediction</Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
