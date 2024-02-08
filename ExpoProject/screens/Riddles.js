import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const RiddlesScreen = ({ navigation }) => {
    const apiUrl = 'https://opentdb.com/api.php?amount=1&type=multiple&category=9';

    const [riddle, setRiddle] = useState(null);

    const fetchRiddle = async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.results.length > 0) {
                const fetchedRiddle = data.results[0];
                setRiddle(fetchedRiddle);
                console.log('Category:', fetchedRiddle.category);
                console.log('Question:', fetchedRiddle.question);
                console.log('Correct Answer:', fetchedRiddle.correct_answer);
            } else {
                console.log('No riddles found.');
            }
        } catch (error) {
            console.error('Error fetching riddle:', error);
        }
    };

    useEffect(() => {
        fetchRiddle();
    }, []);

    const handleReload = () => {
        fetchRiddle();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.customButton}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
                <View>
                    <Text style={styles.questionText}>Question: {riddle.question}</Text>
                    <Text style={styles.answerText}>Correct Answer: {riddle.correct_answer}</Text>
                </View>
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
    categoryText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
        color: 'white',
    },
    questionText: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
        color: 'white',
    },
    answerText: {
        fontSize: 14,
        textAlign: 'center',
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

export default RiddlesScreen;
