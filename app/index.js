import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { Image } from 'expo-image';
import fish from './Lexigo.png'
import Canvas from 'react-native-canvas';

export default function Home() {

    useEffect(() => {
        async function load(){
            tf.ready();
            console.log('ready')
        }
        load()
    }, [])

    function handleCanvas(canvas){
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'red';
      ctx.fillRect(0, 0, 0, 0);
    }

  return (
    <View style={styles.container}>
      <Text>Yellow Fish</Text>
      <Image source={fish} style={{width: 100, height: 100}}/>
      <Link href="/translate">Translate</Link>
      <Link href="/prediction">Prediction</Link>
      {/* <Canvas style={{
          width: 350,
          height: 200,
          borderWidth: 1,
          borderColor: "red",
          position: "absolute"
        }}
        ref={handleCanvas}
        /> */}
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
