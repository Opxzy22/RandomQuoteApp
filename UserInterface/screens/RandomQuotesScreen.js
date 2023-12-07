import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const RandomQuotesScreen = () => {
  const navigation = useNavigation();
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://api.quotable.io/quotes/random');
      const data = response.data;
      setQuote(data.content);
      setError(null); // Reset error state if successful
    } catch (error) {
      console.error('Error fetching quote', error);
      setError('Error fetching quote. Please try again.');
    } finally {
      setLoading(false);
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
      {/* Display the current quote, error message, or loading indicator */}
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <Text style={styles.quoteText}>{quote}</Text>
      )}

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
  loadingText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 20,
  },
});

export default RandomQuotesScreen;
