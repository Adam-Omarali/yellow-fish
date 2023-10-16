import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import { cameraWithTensors, toTexture } from "@tensorflow/tfjs-react-native";
import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  LogBox,
  Platform,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Canvas from "react-native-canvas";
import { Link } from "expo-router";
import { translate } from "./translate";
import OpenAI from "openai";

const TensorCamera = cameraWithTensors(Camera);

const { width, height } = Dimensions.get("window");

const openai = new OpenAI({
  apiKey: "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", // defaults to process.env["OPENAI_API_KEY"]
});

export default function App() {
  const [model, setModel] = useState();
  let context = useRef();
  const canvasRef = useRef();
  const [predictions, setPredicitions] = useState([]);
  const cameraRef = useRef();
  const [picture, setPicture] = useState(false);
  const [tensor, setTensor] = useState();
  const [predicted, setPredicted] = useState(false);
  const [translations, setTranslations] = useState([]);

  useEffect(() => {
    console.log(model);
  }, [model]);

  function handleCameraStream(images) {
    const loop = async () => {
      const nextImageTensor = images.next().value;
      setTensor(nextImageTensor);

      if (!model) throw new Error("no model");
      if (!nextImageTensor) throw new Error("no next image tensor");

      requestAnimationFrame(loop);
    };
    loop();
  }

  async function getQuestion(word) {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content:
            "I'm somebody trying to learn french. You are my helpful french teacher",
        },
        {
          role: "user",
          content: `What is an easy question you can ask me related to a ${word} in french? Only respond with the question and no other text`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    console.log(chatCompletion.choices);
  }

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

  async function predict() {
    if (!predicted) {
      const predictions = await model.detect(tensor);
      setPredicitions(predictions);

      const temp = [];
      for (let i = 0; i < predictions.length; i++) {
        let prediction = predictions[i];
        if (prediction.hasOwnProperty("class")) {
          let translated = await translate(prediction.class);
          temp.push(translated);
        }
      }
      setTranslations(temp);
      //   await getQuestion(predictions[0]);

      setPredicted(true);
    }

    //   setPicture(false);
  }

  useEffect(() => {
    if (picture) {
      if (cameraRef) {
        cameraRef.current.pausePreview();
      }
      predict();
    }
  }, [picture]);

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

  function takePicture() {
    if (!picture) {
      setPredicitions([]);
      setTranslations([]);
      setPredicted(false);
    }
    setPicture(!picture);
    console.log("taking pic: " + picture);
    // let pic = cameraRef.current.takePictureAsync();
  }

  return (
    <View>
      {model ? (
        <View>
          {!picture ? (
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
          ) : (
            <Camera
              style={styles.camera}
              type={Camera.Constants.Type.back}
              ref={cameraRef}
            ></Camera>
          )}

          {/* <Canvas style={styles.canvas} ref={handleCanvas} /> */}
          <View style={styles.container}>
            {picture ? (
              predicted ? (
                <View>
                  {predictions.map((prediction, i) => {
                    if (prediction.hasOwnProperty("class")) {
                      return (
                        //   <Text>{JSON.stringify(translate(prediction.class))}</Text>
                        <Text
                          style={{ color: "black", fontSize: 30 }}
                          key={prediction.class}
                        >
                          {prediction.class + ": " + translations[i]}
                        </Text>
                      );
                    }
                  })}
                </View>
              ) : (
                <Text>Loading...</Text>
              )
            ) : null}
            <View style={styles.buttonContainer}>
              <Pressable style={styles.button} onPress={takePicture}>
                <Text style={styles.text}>
                  {picture ? "Live Camera" : "Take Picture"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      ) : (
        <Text>{"Loading..."}</Text>
      )}
      {/* <Canvas style={styles.canvas} ref={handleCanvas} /> */}
      {/* <Link href="/home">Home</Link> */}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    paddingTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
