
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import AppNav from "./navigation/AppNavigator"; // Main navigation for authenticated users
import { Provider as PaperProvider } from "react-native-paper";
import { ActivityIndicator, View, StatusBar, Text, Image, Appearance } from "react-native";
import { navigationRef } from "./auth/NavigationService"; // Navigation reference
import Toast from "react-native-toast-message";
import NetInfo from "@react-native-community/netinfo";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from "expo-linear-gradient";


Appearance.setColorScheme('light');
const NoInternetScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("./assets/internet.png")}
        style={{ width: 300, height: 300, }}
      />

      <Text style={{ fontSize: 18, color: "#333", marginTop: 20 }}>
        No Internet Connection
      </Text>
      <Text style={{ fontSize: 14, color: "#666", marginTop: 10, textAlign: "center", paddingHorizontal: 20 }}>
        Please check your connection and try again.
      </Text>
    </View>
  );
};

const AppContent = () => {
  const { user, loading } = useAuth();
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#137175" />
      </View>
    );
  }

  if (!isConnected) {
    return <NoInternetScreen />;
  }

  return (
    <>
      {/* Status bar customization */}
      <StatusBar backgroundColor="#D3D3D3" barStyle="light-content" />

      <NavigationContainer ref={navigationRef}>

        {/* {user && <AppNav />} this is for if use is avaliable ie token avaikable  allow him to get inside app */}
        {/* the below code navigates to Home when logged in */}
        <AppNav />
      </NavigationContainer>
    </>
  );
};

const App = () => {
  const [appReload, setAppReload] = useState(1);

  const handleForceReload = () => {
    setAppReload(prev => prev + 1); // Changing the key forces full app remount
  };

  return (
    <AuthProvider onForceReload={handleForceReload}>
      <PaperProvider>
        <AppContent key={appReload} />
        <Toast />
      </PaperProvider>
    </AuthProvider>
  );
};

export default App;