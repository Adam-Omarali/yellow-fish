import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Platform, StyleSheet, View, Text } from "react-native";
import Canvas from "react-native-canvas";
import { Link } from "expo-router";

const TensorCamera = cameraWithTensors(Camera);

const { width, height } = Dimensions.get("window");

export default function App() {
  const [model, setModel] = useState();
  const canvasRef = useRef();
  const [predictions, setPredictions] = useState([]);
  const [wordBank, setWordBank] = useState(new Set());

  function handleCameraStream(images) {
    const loop = async () => {
      const nextImageTensor = images.next().value;

      if (!model) throw new Error("No model");
      if (!nextImageTensor) throw new Error("No next image tensor");

      model
        .detect(nextImageTensor)
        .then((newPredictions) => {
          // Filter and log unique object classes
          const newWords = new Set();
          newPredictions.forEach((prediction) => {
            if (prediction.hasOwnProperty("class")) {
              newWords.add(prediction.class);
            }
          });

          // Update the word bank with unique words
          setWordBank(
            (prevWordBank) => new Set([...prevWordBank, ...newWords])
          );

          setPredictions(newPredictions);
        })
        .catch((err) => {
          console.log(err);
        });

      requestAnimationFrame(loop);
    };
    loop();
  }

  function handleCanvas(can) {
    if (can) {
      can.width = width;
      can.height = height;
      const ctx = can.getContext("2d");
      ctx.strokeStyle = "red";
      ctx.fillStyle = "red";
      for (let prediction in predictions) {
        if (prediction.hasOwnProperty("bbox")) {
          const [x, y, width, height] = prediction.bbox;
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
    })();
  }, []);

  return (
    <View style={styles.container}>
      {model ? (
        <View>
          <TensorCamera
            style={styles.camera}
            type={Camera.Constants.Type.back}
            cameraTextureHeight={textureDims.height}
            cameraTextureWidth={textureDims.width}
            resizeHeight={200}
            resizeWidth={152}
            resizeDepth={3}
            onReady={handleCameraStream}
            autorender={true}
            useCustomShadersToResize={false}
          />
          <View>
            {predictions.map((prediction) => {
              if (prediction.hasOwnProperty("class")) {
                return <Text key={prediction.class}>{prediction.class}</Text>;
              }
            })}
          </View>
          <View>
            <Text>Word Bank:</Text>
            <Text>{Array.from(wordBank).join(", ")}</Text>
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
    width: "100%",
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
