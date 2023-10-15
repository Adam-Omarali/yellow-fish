import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // In a real application, you would validate the username and password against a backend.
    // For this example, we'll simply check for a specific username and password.
    if (username === 'user' && password === 'password') {
      // Redirect to another screen on successful login.
      navigation.navigate('Home');
    } else {
      alert('Login failed. Check your credentials.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

export default Login;
