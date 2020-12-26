import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
    initialRouteName="Signin"
  >
    <Auth.Screen name="Signin" component={SignIn} />
    <Auth.Screen name="Signup" component={SignUp} />
  </Auth.Navigator>
);

export default AuthRoutes;
