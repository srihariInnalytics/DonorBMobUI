// import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token) => {
  try {
    if (token) {
      const decoded = jwtDecode(token);
      return decoded;
    } else {
      //.error('No token found');
      return null;
    }
  } catch (error) {
    //.error('Invalid token:', error);
    return null;
  }
};

