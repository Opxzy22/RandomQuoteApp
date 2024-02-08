import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define handleLogout outside of logout
export const handleLogout = async (navigation) => {
  try {
    const token = await getStoredToken();

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

    navigation.navigate('login');
  } catch (error) {
    console.error('failed to logout', error.response.status, error.response.data);
  }
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
      },
    }} />
  </Stack.Navigator>
);

export default RegistrationStack;
