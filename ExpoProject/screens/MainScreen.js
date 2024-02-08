import React, { useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, Button, Modal } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RandomQuotesScreen from './RandomQuotesScreen';
import MotivationScreen from './MotivationScreen';
import JokesScreen from './JokesScreen';
import RiddlesScreen from './Riddles';
import LoginScreen from './LoginScreen';
import HamburgerMenu from './HamburgerMenuScreen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create Stack Navigator for Motivational Quotes screen
const Stack = createStackNavigator();

const base_url = 'http://172.20.10.3:8000/api/';

const LoginStack = () => (
  <NavigationContainer independent={true}>
    <Stack.Navigator>
      <Stack.Screen name='main' component={MainScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='motivation' component={MotivationScreen} />
      <Stack.Screen name='randomquotes' component={RandomQuotesScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

// Main Screen component
const MainScreen = () => {
  const navigation = useNavigation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const getStoredToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      return token;
    } catch (error) {
      console.error('Error retrieving authentication token:', error);
      return null;
    }
  };

  const handleLogout = async () => {
    try {
      const token = getStoredToken();

      if (!token) {
        console.log('no token found');
        return;
      }
      const response = await axios.post('http://172.20.10.3:8000/api/logout/', {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('logout successful', response.data);
      
      navigation.navigate('Login');
    }
    catch(error) {
      console.error('failed to logout', error.response.status, error.response.data)
    }
  };

  return (
    <ImageBackground source={require('../Images/image.jpg')} style={styles.background}>
      <View style={styles.container}>

        <View style={styles.menu}>
          <HamburgerMenu onPress={openMenu} style={styles.hamburgerIcon} />
        </View>

        <Modal visible={isMenuOpen} transparent animationType="slide" style={{ flex: 1 }}>
          <View style={styles.menuItems}>
            <Button title="Logout" onPress={handleLogout} style={styles.menuText} />
            <Button title='close' onPress={closeMenu} style={styles.menuText} />
          </View>
        </Modal>

        <Text onPress={() => navigation.navigate('Random')} style={styles.text}>
          Random quotes 🌟{'                  '}
          <Text onPress={() => navigation.navigate('Jokes')}>Jokes 🤣</Text>
        </Text>

        <Text onPress={() => navigation.navigate('Motivation')} style={styles.Text}>
          Motivational quotes 💪{'          '}
          <Text onPress={() => navigation.navigate('Riddles')} style={styles.text}>
            Riddles
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// App component
const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
      <Tab.Screen
          name="Home"
          component={MainScreen} options={{
            activeTintColor: 'green',  // Set the color for the active tab
            inactiveTintColor: 'white',  // Set the color for inactive tabs
            tabBarIcon: () => null,
            headerStyle: {
              backgroundColor: 'silver',
              borderBottomColor: 'silver',
              borderBottomWidth: 1,
              height: 35
            },
            headerTintColor: 'black',
            tabBarStyle: {
              backgroundColor: 'silver',
              height: 45
            },
            headerTitleStyle: {
              fontSize: 25,
            },
            tabBarLabelStyle: {
              fontWeight: 'bold',
              color: 'black',
              fontSize: 13,
              marginBottom: -11,
            },
            tabBarLabelPosition: 'center',
          }}
        />
        
        <Tab.Screen
          name='Random'
          component={RandomQuotesScreen}
          options={{ 
            activeTintColor: 'white',
            tabBarIcon: () => null,
            tabBarStyle: {
              backgroundColor: 'silver',
              height: 45
            },
            tabBarLabelStyle: {
              fontWeight: 'bold',
              color: 'black',
              fontSize: 13,
              marginBottom: -11
            },
            headerStyle: {
              backgroundColor: 'silver',
              borderColor: 'black',
              height: 35
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 25,
            },
            headerTintColor: 'black',
            headerTitleAlign: 'center',
          }}
        />
        <Tab.Screen
          name="Motivation"
          component={MotivationScreen} options={{
          activeTintColor: 'green',  // Set the color for the active tab
            tabBarIcon: () => null,
            headerStyle: {
              backgroundColor: 'silver',
              borderColor: 'black',
              height: 35
            },
            headerTintColor: 'black',
            tabBarStyle: {
              backgroundColor: 'silver',
              height: 45
            },
            tabBarLabelStyle: {
              fontWeight: 'bold',
              color: 'black',
              fontSize: 13,
              marginBottom: -11
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 25,
            }
          }}
        />
        <Tab.Screen
          name='Jokes'
          component={JokesScreen}
          options={{ 
            activeTintColor: 'black',   
            tabBarIcon: () => null,
            tabBarStyle: {
              backgroundColor: 'silver',
              height: 45
            },
            tabBarLabelStyle: {
              fontWeight: 'bold',
              color: 'black',
              fontSize: 13,
              marginBottom: -11
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 25,
            },
            headerTintColor: 'black',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'silver',
              borderColor: 'silver',
              height: 35
            }
          }}
        />
       <Tab.Screen
          name='Riddles'
          component={RiddlesScreen}
          options={{ 
            activeTintColor: 'black',   
            tabBarIcon: () => null,
            tabBarStyle: {
              backgroundColor: 'silver',
              height: 45
            },
            tabBarLabelStyle: {
              fontWeight: 'bold',
              color: 'black',
              fontSize: 13,
              marginBottom: -11
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 25,
            },
            headerTintColor: 'black',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'silver',
              borderColor: 'silver',
              height: 35
            }
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'contain'
  },
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: 'rgba(0, 64, 0, 0.7)',
  },
  text: {
    color: 'gold',
    fontSize: 16,
    fontWeight: 'bold',
  },
  Text: {
    color: 'gold',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 22
  },
  menu: {
    position: 'absolute',
    zIndex: 1,
    top: -6,
    right: -2
  },

  menuItems: {
    flex: 1,
    justifyContent: 'left',
    alignItems: 'top',
    backgroundColor: 'black',
    marginTop: 60,
  },
  
});
export default App;
