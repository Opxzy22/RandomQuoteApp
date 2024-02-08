import React, { useState } from "react";
import { Text, TextInput, View, Button, StyleSheet, StatusBar, Alert } from 'react-native';
import axios from 'axios';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from '../screens/RegistrationScreen';
import MainScreen from "./MainScreen";
import Toast from 'react-native-toast-message';
import ChangePasswordScreen from "./ChangePasswordScreen";

// Base URL for API requests
const base_url = 'http://172.20.10.3:8000/api/';

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

const Stack = createStackNavigator();

// LoginScreen component
export const LoginScreen = ({ navigation }) => {
  // State variables for username, password, and error
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Function to handle login
  const handleLogin = async () => {
    try {
      if (!username || !password) {
        setError('please enter both username and password');
        Alert.alert('please enter username and password');
        return;
      }
       // Make a POST request to the login endpoint
    const response = await axios.post(
      `${base_url}login/`,
      { username, password },
      { headers: { 'content-type': 'application/json' } }
    );
      console.log('Login Successful', response.data);

      // Navigate to the 'home' screen upon successful login
      navigation.navigate('home');
    } catch (error) {
      // Log and set an error message if login fails
      console.error('Login failed', error);
      setError('Login failed. Please check your credentials');
    }
  };

  // JSX structure for the LoginScreen
  return (
    <View style={styles.container}>
      {/* Display error message */}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
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
      <Text style={styles.signupText}>
        forgotten password?{' '}
        <Text style={styles.signupLink} onPress={() => navigation.navigate('changePassword')}>
          change password
        </Text>
      </Text>
      <StatusBar barStyle="light-content" backgroundColor="black" />
    </View>
  );
};

// Styles for the LoginScreen component
const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: 'silver',
    borderColor: 'white',
    borderWidth: 0,
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black'
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
    color: 'black'
  },
  signupLink: {
    color: 'black',
    textAlign: 'right',
    marginTop: 20,
  },
});

// RegistrationStack component
const RegistrationStack = () => (
    <Stack.Navigator>
        <Stack.Screen name='Login' component={LoginScreen} options={{
            headerStyle: {
                backgroundColor: 'lightgreen',
                borderWidth: 0,
                borderColor: 'black',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
                fontSize: 36,
                fontWeight: 'bold',
                
                
            }
        }} />
        <Stack.Screen name='Registration' component={RegistrationScreen} options={{
            
            headerStyle: {
                backgroundColor: 'lightgreen',
                borderWidth: 0,
                borderColor: 'black',

            },
            headerTintColor: 'black',
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
       
     <Stack.Screen name='changePassword' component={ChangePasswordScreen} options={{
            
            headerStyle: {
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'black',

            },
            headerTintColor: 'black',
            headerTitleStyle: {
                fontSize: 30,
                fontWeight: 'bold',
            }
        }} />
    </Stack.Navigator>
);

export default RegistrationStack;
