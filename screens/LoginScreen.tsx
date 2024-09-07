import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import  useAuthStore  from '../states/authStore';
import { loginToBackend } from '../services/authServices';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../types/navigation';
import { CommonActions } from '@react-navigation/native';
import useAuthStore from '../states/authStore';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuthStore();
  const navigation = useNavigation<NavigationProps>()


  const handleLogin = async () => {
    try {
      const token = await loginToBackend(username, password);
      login(token); // Set authenticated state and store token
  
      // Reset the stack and remove the login screen
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }], // Replace this with your authenticated screen
        })
      );
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };
//   const { isAuthenticated } = useAuthStore();
  
//   useEffect(() => {
//     if (isAuthenticated) {
//       // Navigate to Home if already authenticated
//       navigation.navigate('HomeScreen');
//     }
//   }, [isAuthenticated]);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to continue</Text>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        placeholderTextColor="#8E8E8E"
      />
      
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholderTextColor="#8E8E8E"
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
          <Icon name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="#8E8E8E" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>AUTO GUARD</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    color: '#8E8E8E',
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderColor: '#8E8E8E',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#FFF',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#8E8E8E',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  passwordInput: {
    flex: 1,
    height: 50,
  },
  eyeIcon: {
    padding: 5,
  },
  forgotPasswordText: {
    textAlign: 'right',
    color: '#8E8E8E',
    marginBottom: 30,
  },
  loginButton: {
    height: 50,
    backgroundColor: '#3E3E3E',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#3E3E3E',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default LoginScreen;
