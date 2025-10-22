import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const API_BASE_URL = "https://iecwebapi2024.azurewebsites.net/api";
const API_BASE_URL = "http://10.61.66.76:5000/blooddonation";
const createAxiosInstance = async () => {
  let sessionId = '';
  try {
    const userData = await AsyncStorage.getItem('IECUser');
    if (userData) {
      const parsedUser = JSON.parse(userData); // ✅ Parse JSON
      sessionId = parsedUser?.token?.token || ''; // ✅ Safely access token
    }
  } catch (error) {
    // console.error("Error retrieving IECUser from AsyncStorage:", error);
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

// ✅ GET Template (returns Blob)
export const getTemplate = async (endpoint) => {
  const axiosInstance = await createAxiosInstance();

  try {
    const response = await axiosInstance.get(endpoint, { responseType: 'blob' });
    return response;
  } catch (error) {
    throw error.response?.data || error.message;
  }
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

export const putToAPI = async (endpoint, data) => {
  const axiosInstance = await createAxiosInstance();
  try {
    const response = await axiosInstance.put(endpoint, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
