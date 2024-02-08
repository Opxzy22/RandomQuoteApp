import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import RegistrationScreen from '../screens/RegistrationScreen';
import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const RegistrationStack = () => (
  <Stack.Navigator>
    <Stack.Screen name='Login' component={LoginScreen} />
    <Stack.Screen name='home' component={MainScreen} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'blue' }}>
      <NavigationContainer independent={true}>
        <Tab.Navigator>
          <Tab.Screen
            name='login'
            component={LoginScreen}
            options={{
              headerShown: false,
              tabBarLabel: () => null, // Hide the label
              tabBarIcon: () => null,
             
              tabBarStyle: {
                backgroundColor: 'silver',
              },
              tabBarItemStyle: {
                padding: 200, // 
              },
              tabBarLabelStyle: {
                color: 'black',
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
