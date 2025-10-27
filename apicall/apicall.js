import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const API_BASE_URL = "http://192.168.0.130:5000/blooddonation"; //mesh 2
const API_BASE_URL = "http://10.210.244.76:5000/blooddonation"; //mine
const createAxiosInstance = async () => {
  let sessionId = '';
  try {
    const userData = await AsyncStorage.getItem('BloodToken');
    if (userData) {
      const parsedUser = JSON.parse(userData); // ✅ Parse JSON
      sessionId = parsedUser?.token?.token || ''; // ✅ Safely access token
    }
  } catch (error) {
    // console.error("Error retrieving BloodToken from AsyncStorage:", error);
  }

  const headers = {
    "accept": "*/*",
    "SessionId": sessionId,
    // "SessionId":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IlN1cml5YSBQcmFrYXNoIFMiLCJuYmYiOjE3NDgyMzQzMDgsImV4cCI6MTc0ODIzNjEwOCwiaWF0IjoxNzQ4MjM0MzA4fQ.99hWtEfkWJY6uTf1Dff0BGj7iIM9Xv2mvsM_rX6a4uk"

  };

  // console.log("🔹 Headers being sent:", headers); // ✅ Log Headers

  return axios.create({
    baseURL: API_BASE_URL,
    headers
  });
};


// ✅ GET from API (returns JSON)
export const getFromAPI = async (endpoint) => {
  const axiosInstance = await createAxiosInstance();
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ✅ POST to API
export const postToAPI = async (endpoint, data) => {
  const axiosInstance = await createAxiosInstance();
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
