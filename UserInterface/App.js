import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import RegistrationScreen from '../screens/RegistrationScreen';
import LoginScreen from '../screens/LoginScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const RegistrationStack = () => (
  <Stack.Navigator>
    <Stack.Screen name='Login' component={LoginScreen} />
    <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'gold' }}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name='Home'
            component={RegistrationStack}
            options={{
              tabBarLabel: () => null,
              tabBarStyle: {
                backgroundColor: 'black',
              },
              tabBarItemStyle: {
                padding: 200,
              },
              tabBarLabelStyle: {
                color: 'white',
              },
            }}
          />
          {/* Add more tabs/screens if needed */}
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
