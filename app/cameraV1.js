import { Camera, CameraType } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import * as tf from "@tensorflow/tfjs";
import { decodeJpeg } from "@tensorflow/tfjs-react-native";
import * as cocossd from "@tensorflow-models/coco-ssd";

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [pickedImage, setPickedImage] = useState("");

  const cameraRef = useRef();

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  function getFrame() {
    setInterval(async () => {
      let res = await cameraRef.current.takePictureAsync();
    }, 5000);
  }

  async function takePicture() {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const pickedImage = await cameraRef.current.takePictureAsync(options);

      setPickedImage(pickedImage.uri);
    }
  }

  // const classifyUsingMobilenet = async () => {
  //   try {
  //     // Load mobilenet
  //     await tf.ready();
  //     const model = await mobilenet.load();
  //     setIsTfReady(true);
  //     console.log("starting inference with picked image: " + pickedImage)

  //     // Convert image to tensor
  //     const imgB64 = await FileSystem.readAsStringAsync(pickedImage, {
  //       encoding: FileSystem.EncodingType.Base64,
  //     });
  //     const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
  //     const raw = new Uint8Array(imgBuffer)
  //     const imageTensor = decodeJpeg(raw);
  //     // Classify the tensor and show the result
  //     const prediction = await model.classify(imageTensor);
  //     if (prediction && prediction.length > 0) {
  //       setResult(
  //         `${prediction[0].className}(${prediction[0].probability.toFixed(3)})`
  //       );
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        onCameraReady={getFrame}
        ref={cameraRef}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button1} onPress={takePicture}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>

        <Image
          source={{ uri: pickedImage }}
          style={{ width: 200, height: 200, margin: 40 }}
        />
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  button1: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "right",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
