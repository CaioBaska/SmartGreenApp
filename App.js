import React from 'react';

import { Login } from './src/screens/Login';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Monitor } from './src/screens/Monitor/';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName = 'Home'>
            <Stack.Screen 
                name = 'Home' 
                component = {Login}
                options={{
                    headerShown: false
                }}
            />
              <Stack.Screen 
                name = 'Monitor' 
                component = {Monitor}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    </NavigationContainer>
    );
}
