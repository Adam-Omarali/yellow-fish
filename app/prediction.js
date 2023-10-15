import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  LogBox,
  Platform,
  StyleSheet,
  View,
  Text,
} from "react-native";
import Canvas from "react-native-canvas";
import { Link } from "expo-router";
import { translate } from "./translate";

const TensorCamera = cameraWithTensors(Camera);

const { width, height } = Dimensions.get("window");

export default function App() {
  const [model, setModel] = useState();
  let context = useRef();
  const canvasRef = useRef();
  const [predictions, setPredicitions] = useState([]);

  useEffect(() => {
    console.log(model);
  }, [model]);

  function handleCameraStream(images) {
    const loop = async () => {
      const nextImageTensor = images.next().value;

      if (!model) throw new Error("no model");
      if (!nextImageTensor) throw new Error("no next image tensor");

      model
        .detect(nextImageTensor)
        .then((predictions) => {
          setPredicitions(predictions);
        })
        .catch((err) => {
          console.log(err);
        });

      requestAnimationFrame(loop);
    };
    setInterval(() => {
      loop();
    }, 1000);
  }

  // function drawRectangle(
  //   predictions, // cocoSsd.DetectedObject[],
  //   nextImageTensor
  // ) {
  //   if (!context.current || !canvas.current) {
  //     console.log('no context or canvas');
  //     return;
  //   }

  //   // to match the size of the camera preview
  //   const scaleWidth = width / nextImageTensor.shape[1];
  //   const scaleHeight = height / nextImageTensor.shape[0];

  //   const flipHorizontal = Platform.OS === 'ios' ? false : true;

  //   // We will clear the previous prediction
  //   context.current.clearRect(0, 0, width, height);

  //   // Draw the rectangle for each prediction
  //   for (const prediction of predictions) {
  //     const [x, y, width, height] = prediction.bbox;

  //     // Scale the coordinates based on the ratios calculated
  //     const boundingBoxX = flipHorizontal
  //       ? canvasRef.current.width - x * scaleWidth - width * scaleWidth
  //       : x * scaleWidth;
  //     const boundingBoxY = y * scaleHeight;

  //     // Draw the bounding box.
  //     context.current.strokeRect(
  //       boundingBoxX,
  //       boundingBoxY,
  //       width * scaleWidth,
  //       height * scaleHeight
  //     );
  //     // Draw the label
  //     context.current.fillText(
  //       prediction.class,
  //       boundingBoxX - 5,
  //       boundingBoxY - 5
  //     );
  //   }
  // }

  function handleCanvas(can) {
    if (can) {
      can.width = width;
      can.height = height;
      const ctx = can.getContext("2d");
      ctx.strokeStyle = "red";
      ctx.fillStyle = "red";
      // if(predictions.length > 0){
      //   ctx.clearRect(0, 0, 350, 700);
      // }
      // else{
      //   ctx.fillRect(0, 0, 350, 700);
      // }
      for (let prediction in predictions) {
        if (prediction.hasOwnProperty("bbox")) {
          const [x, y, width, height] = prediction.bbox;
          // ctx.fillRect(x, y, width, height);
          ctx.fillRect(0, 0, 350, 700);
        }
      }
    }
  }

  let textureDims;
  Platform.OS === "ios"
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
      {model ? (
        <View>
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
          />
          {/* <Canvas style={styles.canvas} ref={handleCanvas} /> */}
          <View>
            {predictions.map((prediction) => {
              if (prediction.hasOwnProperty("class")) {
                return (
                  <Text>{JSON.stringify(translate(prediction.class))}</Text>
                );
              }
            })}
          </View>
        </View>
      ) : (
        <Text>{model}</Text>
      )}
      <Canvas style={styles.canvas} ref={handleCanvas} />
      <Link href="/home">Home</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  camera: {
    width: "90%",
    height: "90%",
  },
  canvas: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    zindex: 10,
    width: "100%",
    height: "100%",
    borderWidth: 1,
  },
});
