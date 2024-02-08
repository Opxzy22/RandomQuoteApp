import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import MainScreen from "./MainScreen";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const RandomQuotesScreen = ({ navigation }) => {
  const [quote, setQuote] = useState('');

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://api.quotable.io/quotes/random');
      const data = response.data[0];
      setQuote(data.content);
    } catch (error) {
      console.error('Error fetching quote', error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleReload = () => {
    fetchQuote();
  };

  return (
    <View style={styles.container}>
       <TouchableOpacity
        style={styles.customButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.quoteText}>{quote}</Text>
      <Button title='Reload' onPress={handleReload} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    backgroundColor: 'black',
  },
  quoteText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 50,
    color: 'white',
  },
  customButton: {
    position: 'absolute', // Position the button absolutely
    top: 5, 
    left: 5, 
    backgroundColor: '#007bff',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const RegistrationStack = () => (
  <Stack.Navigator>
    <Stack.Screen
            name='home'
            component={MainScreen}
            options={{
            headerShown: false
        }} />
    </Stack.Navigator>
);

export default RandomQuotesScreen;
