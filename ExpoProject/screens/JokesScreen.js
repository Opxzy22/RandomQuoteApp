import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const JokesScreen = ({ navigation }) => {
    const [quote, setQuote] = useState('')

    const FetchQuote = async () => {
        try {
            const response = await axios.get('https://v2.jokeapi.dev/joke/Any?type=single')
            const data = response.data;
            setQuote(data.joke)
    }   catch(error) {
            console.error('error fetching joke', error)
    }
    };

    useEffect(() => {
        FetchQuote();
    }, [])

    const HandleReload = () => {
        FetchQuote();
    };

    return (
        <View style={Styles.container}>
            <Text style={Styles.quoteText}>{quote}</Text>
            <Button title='Reload' onPress={HandleReload} />
        </View>
    );
};

const Styles = StyleSheet.create({
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

    export default JokesScreen