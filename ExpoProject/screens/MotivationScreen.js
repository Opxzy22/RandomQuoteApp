import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const MotivationScreen = ({ navigation }) => {
  const [quote, setQuote] = useState('');

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://zenquotes.io/api/quotes');
      const data = response.data[0];
      setQuote(data.content);
    } catch (error) {
      console.error('Failed to fetch quote', error);
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
    marginBottom: 20,
    color: 'white',
  },
});

export default MotivationScreen;
