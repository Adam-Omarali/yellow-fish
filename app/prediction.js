import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import { Camera } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, LogBox, Platform, StyleSheet, View, Text } from 'react-native';
import { Link } from 'expo-router'

const TensorCamera = cameraWithTensors(Camera);

export default function App() {
  const [model, setModel] = useState();

 useEffect(() => {
   console.log(model)
 }, [model])
 

  function handleCameraStream(images) {
    const loop = async () => {
      const nextImageTensor = images.next().value;

      if (!model) throw new Error('no model');
      if (!nextImageTensor) throw new Error('no next image tensor');

      model
        .detect(nextImageTensor)
        .then((predictions) => {
            console.log(predictions)
        })
        .catch((err) => {
          console.log(err);
        });

      requestAnimationFrame(loop);
    };
    loop();
  }

  let textureDims;
  Platform.OS === 'ios'
    ? (textureDims = { height: 1920, width: 1080 })
    : (textureDims = { height: 1200, width: 1600 });

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await tf.ready();

      setModel(await cocoSsd.load());

      // coco = AsyncStorage.getItem('coco');
      // console.log(coco)
      // if(coco == undefined){
      //   let mod = await cocoSsd.load()
      //   console.log(mod)
      //   AsyncStorage.setItem('coco', JSON.stringify(mod));
      // }
      // else{
      //   setModel(JSON.parse(coco))
      // }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {model ?       
      <TensorCamera
        // Standard Camera props
        style={styles.camera}
        type={Camera.Constants.Type.back}
        // Tensor related props
        cameraTextureHeight={textureDims.height}
        cameraTextureWidth={textureDims.width}
        resizeHeight={200}
        resizeWidth={152}
        resizeDepth={3}
        onReady={handleCameraStream}
        autorender={true}
        useCustomShadersToResize={false}
      />: 
      <Text>{model}</Text>
      }
      

      <Link href="/home">Home</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  canvas: {
    position: 'absolute',
    zIndex: 1000000,
    width: '100%',
    height: '100%',
  },
});