import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';

const Stack = createStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="home" component={MainScreen} />
    </Stack.Navigator>
  );
};

export default LoginStack;