import * as Location from 'expo-location';

// Function to request location permission
export const requestLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === 'granted';
};

// Function to get current location (latitude & longitude)
export const getCurrentLocation = async () => {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) {
    console.log("Location permission denied");
    return { latitude: null, longitude: null };
  }

  try {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Lowest,
      maximumAge: 30000,
      timeout: 3000
    });
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    console.error("Location Error:", error);
    return { latitude: null, longitude: null };
  }
};

// Function to get live time and date


// export const getCurrentISTTimestamp = () => {
//   const date = new Date();
//   const pad = (n) => (n < 10 ? '0' + n : n);
//   const padMs = (n) => (n < 10 ? '00' + n : n < 100 ? '0' + n : n);

//   return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
//          `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${padMs(date.getMilliseconds())}`;
// };   

export const getCurrentTimeAndDate = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 330); // IST offset

  const pad = (n) => (n < 10 ? '0' + n : n);
  const padMs = (n) => (n < 10 ? '00' + n : n < 100 ? '0' + n : n);

  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}.${padMs(now.getMilliseconds())}`;
};
