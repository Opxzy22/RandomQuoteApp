import React, { useState } from "react";
import { Text, TextInput, View, Button, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import LoginScreen from '../screens/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';
// Base URL for API requests
const base_url = 'http://127.0.0.1:8000/api/';

const stack = createStackNavigator();

// RegistrationScreen component for user registration
const RegistrationScreen = ({ navigation }) => {
    // State variables for user input and error handling
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    // Function to handle user registration
    const handleRegistration = async () => {
        try {
            // Make a POST request to the registration endpoint
            const response = await axios.post(`${base_url}register/`, { username, email, password });
            console.log('Registration successful:', response.data);
            // Navigate to the login screen or any other screen as needed
            navigation.navigate('Login');
        } catch (error) {
            // Handle different types of errors during registration
            console.error('Registration failed', error);

            if (error.response) {
                // Handle server response error
                console.error('Server responded with status:', error.response.status);
                console.error('Response data:', error.response.data);

                setError('Registration failed. Server error. Please try again later.');
            } else if (error.request) {
                // Handle no response error
                console.error('No response received from the server');
                setError('Registration failed. No response received from the server. Please try again later.');
            } else {
                // Handle other request setup errors
                console.error('Error setting up the request:', error.message);
                setError('Registration failed. Please check your internet connection and try again.');
            }
        }
    };

    // JSX structure for the RegistrationScreen component
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                {/* Username input */}
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    placeholder="type username"
                    onChangeText={setUsername}
                />

                {/* Email input */}
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    placeholder="type email"
                />

                {/* Password input */}
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="type password"
                    secureTextEntry
                />

                {/* Display error message if present */}
                {error && <Text>{error}</Text>}

                {/* Registration button */}
                <View style={styles.buttonContainer}>
                    <Button title="Register" onPress={handleRegistration} style={styles.button} />
                    <Text style={styles.signinText}>
                    Already have an account?{' '}
                    <Text style={styles.signinText} onPress={() => navigation.navigate('Login')}>
                        Sign in
                    </Text>
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

// Styles for the RegistrationScreen component
const styles = StyleSheet.create({
    container: {
        flex: 2,
        padding: 20,
        backgroundColor: 'white',
        borderColor: 'silver',
        borderWidth: 1,
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: 'blue',
    },
    input: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupLink: {
        color: 'white',
    },
    button: {
        backgroundColor: 'blue',
    }
});

const LoginStack = () => (
    <Stack.navigator>
        <Stack.screen name='Login' component={LoginScreen} />
    </Stack.navigator>
);

export default RegistrationScreen;
