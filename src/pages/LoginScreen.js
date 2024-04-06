import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onPressLogin = () => {
    if (username === "Username" && password === "1234") {
      navigation.navigate("Image AI");
    } else {
      // Hatalı giriş mesajı
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('/Users/halil/Desktop/ImageAI-App/assets/loginimage.png')}
        style={styles.image}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Enter the User Name"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Enter the Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity onPress={onPressLogin} style={styles.button}>
        <Text style={{ color: "white" }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a6cfe3",
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    bottom:50,
  },
  textInput: {
    height: 40,
    width: "100%",
    borderColor: "#1579eb",
    borderWidth: 3,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor:"white",
  },
  button: {
    backgroundColor: "#1579eb",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 48,
    marginTop: 10,
  },
});

export default LoginScreen;
