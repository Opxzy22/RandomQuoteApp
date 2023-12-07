import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';

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
      {/* Display the current quote */}
      <Text style={styles.quoteText}>{quote}</Text>

      {/* Reload button to fetch a new quote */}
      <Button title='Reload' onPress={handleReload} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'black',
  },
  quoteText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
});

export default RandomQuotesScreen;
