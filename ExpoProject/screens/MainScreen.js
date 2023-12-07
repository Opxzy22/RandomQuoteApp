import React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RandomQuotesScreen from './RandomQuotesScreen';
import MotivationScreen from './MotivationScreen';
import JokesScreen from './JokesScreen'

// Create Stack Navigator for Motivational Quotes screen
const Stack = createStackNavigator();

// Component for the Motivational Quotes screen within the Stack Navigator
const QuotesStackScreens = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="RandomQuotes"
      component={RandomQuotesScreen}
      options={{
        headerShown: false,
        headerTitle: 'Random Quotes',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: 'red',
        headerLeft: () => (
          <Text style={styles.backButton} onPress={() => navigation.navigate('Main')}>
            Back
          </Text>
        ),
      }}
    />
    <Stack.Screen
        name="Motivation"
        component={MotivationScreen}
        options={{
        headerShown: false
        }}>

    </Stack.Screen>
    <Stack.Screen
        name="Jokes"
        component={JokesScreen}
        options={{
        headerShown: false
        }}>

    </Stack.Screen>
  </Stack.Navigator>
);

// Main Screen component
const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text onPress={() => navigation.navigate('RandomQuotes')} style={styles.text}>
        Random quotes🌟{'              '}
        <Text onPress={() => navigation.navigate('Jokes')}>Jokes 🤣</Text>
      </Text>
      <Text onPress={() => navigation.navigate('Motivation')} style={styles.Text}>
        Motivational quotes 💪
      </Text>
    </View>
  );
};

// Custom Tab Bar component


// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// App component
const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
      >
        <Tab.Screen
          name="home"
          component={MainScreen}
          options={{ 
            tabBarStyle: {
              backgroundColor: 'black',
            },
            tabBarLabelStyle: {
              color: 'white',
              fontWeight: 'bold'
            }
           }}
        />
        <Tab.Screen
          name="Motivation"
          component={QuotesStackScreens} options={{
            tabBarStyle: {
              backgroundColor: 'black',
            },
            tabBarLabelStyle: {
              color: 'white',
              fontWeight: 'bold'
            }
          }}
        />
        <Tab.Screen
          name='RandomQuotes'
          component={QuotesStackScreens}
          options={{ 
            tabBarStyle: {
              backgroundColor: 'black',
            },
            tabBarLabelStyle: {
              color: 'white',
              fontWeight: 'bold'
            }
          }}
        />
        <Tab.Screen
          name='Jokes'
          component={JokesScreen}
          options={{ 
            tabBarStyle: {
              backgroundColor: 'black',
            },
            tabBarLabelStyle: {
              color: 'white',
              fontWeight: 'bold'
            }
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 'auto',
    backgroundColor: 'pink', 
  },
  text: {
    color: 'blue', 
    fontSize: 16,
    fontWeight: 'bold', 
  },
  tabBarItem: {
    flex: 1,
    textAlign: 'center',
    padding: 14,
    color: 'white',
  },
  backButton: {
    color: 'blue',
    marginLeft: 4,
    fontSize: 16,
  },
  Text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 22
  },
});

export default App;
