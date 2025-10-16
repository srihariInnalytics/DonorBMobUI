//navigation path set
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screen/login/Login';
import HomeScreen from '../screen/Home/Home';
import Profile from '../screen/Profile/Profile'
import Dummy from '../screen/Dummy/Dummy'
import Signin from '../screen/Signin/Signin'

const Stack = createStackNavigator();

const AppNav = () => {

  return (
    <Stack.Navigator initialRouteName='Signin'>

      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Signin"
        component={Signin}
      />


      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: 'Profile' }}
      />

      <Stack.Screen
        name="Dummy"
        component={Dummy}
      />

    </Stack.Navigator>

  );
};

export default AppNav;
