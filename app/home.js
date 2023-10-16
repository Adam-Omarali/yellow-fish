import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link } from "expo-router";
import { Image } from "expo-image";
import fish from "../assets/Background-Logo-Transparent.png";
import stingIcon from "../assets/SettingsIcon.png";
import MainBgIcon from "../assets/MainBgImage.jpg";

const renderItem = ({ item }) => {
  return (
    <View
      style={{
        padding: 20,
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    >
      <Text style={styles.subtitletwo}>{item.text}</Text>
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 80,
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <View style={styles.buttonContainer}>
          <Link href="/login">
            <Image source={fish} alt="Logo" style={styles.headerImg} />
          </Link>
        </View>

        <View style={styles.buttonContainer}>
          <Link href="/settings">
            <Image
              source={stingIcon} // Replace with the actual sourwce of your image
              style={styles.headerImgTwo}
              contentFit="contain"
            />
          </Link>
        </View>
      </View>

      <Text style={styles.title}>Welcome, User!</Text>

      <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <TouchableOpacity style={styles.buttonOne}>
          <Link style={styles.btnText} href="/camera">
            <Text>Learn</Text>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonTwo}>
          <Link style={styles.btnText} href="/quiz">
            <Text>Quiz</Text>
          </Link>
        </TouchableOpacity>
      </View>

      <Image source={MainBgIcon} alt="Logo" style={styles.headerImgv3} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 15,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 80,
  },

  subtitle: {
    fontSize: 40,
    fontWeight: "thin",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3,
  },

  subtitletwo: {
    fontSize: 20,
    fontWeight: "thin",
    textAlign: "center",
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
    marginBottom: 20,
    lineHeight: 30,
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -0.5, height: 0.5 },
    textShadowRadius: 3,
  },

  headerImg: {
    width: 100,
    height: 100,
    marginTop: -25,
    marginRight: 35,
  },

  headerImgTwo: {
    width: 50,
    height: 50,
    marginTop: 55,
    marginLeft: 10,
  },

  headerImgv3: {
    width: 250,
    height: 250,
    marginTop: 50,
  },

  backgroundImg: {
    position: "absolute",
    width: 390,
    height: 844,
    alignSelf: "center",
    paddingTop: 100,
    marginBottom: 7,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  buttonOne: {
    backgroundColor: "#E8DA00",
    marginTop: 40,
    borderRadius: 10,
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 30,
    marginRight: 10,
  },

  buttonTwo: {
    backgroundColor: "#E8DA00",
    marginTop: 40,
    borderRadius: 10,
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 40,
    marginLeft: 10,
  },

  btnText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },

  transparentBg: {},
});
