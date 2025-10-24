import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postToAPI } from '../apicall/apicall';
import { decodeToken } from '../apicall/jwtdecode';
import { navigate } from './NavigationService';

const AuthContext = createContext();

export const AuthProvider = ({ children,onForceReload }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('BloodToken');
        console.log("userData 1111111111" , userData)
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        //.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, []);


  

  const login = async (userData) => {
    //.log("USERDATA "   ,  userData)
    setUser(userData);
    await AsyncStorage.setItem('BloodToken', JSON.stringify(userData));
    if (onForceReload) {
      onForceReload(); // Simulate restart
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('BloodToken');
    console.log("Logout called")
  };


  const pinset = async (pin) => {
    await AsyncStorage.setItem('UserPin', pin);
    console.log("Pin set successfully",pin)
  };

  const resetPin = async () => {
    await AsyncStorage.removeItem('UserPin');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout,pinset,resetPin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
