import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { useAuthStore } from '../states/index';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const [forgetEmail, setforgetEmail] = useState("")
  const [modalVisible, setModalVisible] = useState(false);
  // Get login and requestPasswordReset from auth store
  const { login, requestPasswordReset } = useAuthStore();

  // Handle login process
  const handleLogin = async () => {
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }
    try {
      await login(username, password);
      // Reset the stack and navigate to the Home screen after successful login
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }], // Replace with the appropriate screen for authenticated users
        })
      );
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  // Handle forgot password logic
  const handleForgotPassword = async () => {
    if (!forgetEmail) {
      Alert.alert('Empty', 'Please enter your email first.');
      return;
    }
    try {
      await requestPasswordReset(forgetEmail);
      setforgetEmail("");
      Alert.alert('Success', 'Admin will contact you shortly.');
      setModalVisible(false); 
      
    } catch (error) {
      Alert.alert('Error', 'Failed to request password reset. Please try again later.');
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      {/* Display error if exists */}
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

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      {/* Forgot Password Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Reset Password</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter your email"
              value={forgetEmail}
              onChangeText={setforgetEmail}
              keyboardType="email-address"
              placeholderTextColor="#8E8E8E"
            />
            <TouchableOpacity onPress={handleForgotPassword} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Send Reset Link</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Trigger login on button press */}
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
  // Modal Styles
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalInput: {
    height: 50,
    borderColor: '#8E8E8E',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#FFF',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#3E3E3E',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
  },
  closeButtonText: {
    color: '#3E3E3E',
    fontSize: 16,
  },
  }
);

export default LoginScreen;
