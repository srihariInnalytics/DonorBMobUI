//navigation path set
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screen/login/Login';
import HomeScreen from '../screen/Home/Home';
import Profile from '../screen/Profile/Profile'
import Dummy from '../screen/Dummy/Dummy'
import Signin from '../screen/Signin/Signin'
import PackingList from '../screen/PackingList/PackingList'
const Stack = createStackNavigator();

const AppNav = ({ initialNav = "Signin" }) => {
  return (
    <Stack.Navigator initialRouteName={initialNav}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
      <Stack.Screen name="Dummy" component={Dummy} />
      <Stack.Screen name="PackingList" component={PackingList} />
    </Stack.Navigator>
  );
};


export default AppNav;
