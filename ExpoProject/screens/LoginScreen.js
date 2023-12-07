import React, { useState } from "react";
import { Text, TextInput, View, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from '../screens/RegistrationScreen';
import MainScreen from "./MainScreen";
import RandomQuotesScreen from "./JokesScreen";
import MotivationScreen from './MotivationScreen';

// Base URL for API requests
const base_url = 'http://127.0.0.1:8000/api/';

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

const Stack = createStackNavigator();

// LoginScreen component
const LoginScreen = ({ navigation }) => {
  // State variables for username, password, and error
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Function to handle login
  const handleLogin = async () => {
    try {
      // Make a POST request to the login endpoint
      const response = await axios.post(`${base_url}login/`, { username, password },
       { header: {'content-type': 'application/json'} });
      console.log('Login Successful', response.data);

      // Navigate to the 'home' screen upon successful login
      navigation.navigate('home');
    } catch (error) {
      // Log and set an error message if login fails
      console.error('Login failed', error.message);
      setError('Login failed. Please check your credentials');
    }
  };

  // JSX structure for the LoginScreen
  return (
    <View style={styles.container}>
      {/* Username input */}
      <Text style={styles.label}>Username</Text>
      <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="input username" />

      {/* Password input */}
      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="input password" secureTextEntry />

      {/* Login button */}
      <Button title='Login' onPress={handleLogin} />

      {/* Signup link */}
      <Text style={styles.signupText}>
        Don't have an account?{' '}
        <Text style={styles.signupLink} onPress={() => navigation.navigate('Registration')}>
          Sign up
        </Text>
      </Text>
    </View>
  );
};

// Styles for the LoginScreen component
const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 0,
    flex: 50,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white'
  },
  input: {
    height: 40,
    borderColor: 'green',
    borderWidth: 1,
    marginBottom: 3,
    paddingHorizontal: 10,
    backgroundColor: 'white'
  },
  signupText: {
    marginTop: 20,
    textAlign: 'center',
    color: 'white'
  },
  signupLink: {
    color: 'white',
  },
});

// RegistrationStack component
const RegistrationStack = () => (
    <Stack.Navigator>
        <Stack.Screen name='Login' component={LoginScreen} options={{
            headerStyle: {
                backgroundColor: 'black',
                borderWidth: 0,
                borderColor: 'white',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                fontSize: 36,
                fontWeight: 'bold',
                
                
            }
        }} />
        <Stack.Screen name='Registration' component={RegistrationScreen} options={{
            
            headerStyle: {
                backgroundColor: 'black',
                borderWidth: 1,
                borderColor: 'silver',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                fontSize: 30,
                fontWeight: 'bold',
            }
        }} />
        <Stack.Screen
            name='home'
            component={MainScreen}
            options={{
            headerShown: false
        }} />
    </Stack.Navigator>
);

export default RegistrationStack;
