import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, Image } from "react-native";
import { Button, Input, Icon } from "react-native-elements";
import Toast from "react-native-toast-message";
import { useAuth } from "../../auth/AuthContext";
import { colors } from "../../component/config/config";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { postToAPI } from "../../apicall/apicall";


const LoginScreen = () => {
  const navigation = useNavigation(); // Initialize navigation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { login } = useAuth();
  const handleLogin = async () => {

    setLoading(true);

    try {
      const data = { dummykey: "dummyvalue" }
      // login(data); // use auth (for authentication)
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } catch (error) {
      //.log("ERROR" , error)
      Toast.show({
        type: "error",
        text1: "Login Failed",
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      <LinearGradient colors={["#FFFFFF", "#E8E8E8"]} style={StyleSheet.absoluteFillObject} />
      <StatusBar backgroundColor="#070508" barStyle="light-content" />
      <View style={styles.content}>
        <Image source={require('../../assets/iec_logo.png')} style={styles.logo} />

        <Input
          placeholder="Username"
          leftIcon={{ type: "font-awesome", name: "user", color: "black" }}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />

        <Input
          placeholder="Password"
          leftIcon={{ type: "font-awesome", name: "lock", color: "black" }}
          rightIcon={
            <Icon
              name={passwordVisible ? "eye" : "eye-slash"}
              type="font-awesome"
              color="#D32F2F"
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />

        <Button
          title="Login"
          icon={{
            name: "sign-in",
            type: "font-awesome",
            size: 20,
            color: "white",
          }}
          iconRight
          buttonStyle={styles.loginButton}
          onPress={handleLogin}
          loading={loading}
          loadingProps={{ size: "small", color: "#fff" }}
        />

        <Toast />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    alignSelf: "center",
    color: "red",
    marginBottom: 20,
  },
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#D32F2F",
    borderRadius: 5,
    marginVertical: 20,
    paddingVertical: 10,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    resizeMode: 'contain',
    justifyContent: "center",
  },
});

export default LoginScreen;
