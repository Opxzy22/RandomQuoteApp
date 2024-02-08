import React, { useState } from "react";
import { TextInput, View, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';

const ChangePasswordScreen = () => {
  const [email, setEmail] = useState('');  // Change to email state
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [loading, setLoading] = useState(false);

  const changePassword = async () => {
    try {
      setLoading(true);

      // Use the email state in the request
      const response = await axios.post('http://172.20.10.3:8000/api/reset-password/', {
        email: email,  // Use the email state here
        new_password1: newPassword1,
        new_password2: newPassword2,
      });

      console.log('Password change successful:', response.data);

      Alert.alert('Success', 'Password changed successfully');
    } catch (error) {
      // Handle errors as before
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Email'
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"  // Set the keyboard type to email address
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={newPassword1}
        onChangeText={(text) => setNewPassword1(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        secureTextEntry
        value={newPassword2}
        onChangeText={(text) => setNewPassword2(text)}
      />
      <Button title="Change Password" onPress={changePassword} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default ChangePasswordScreen;
