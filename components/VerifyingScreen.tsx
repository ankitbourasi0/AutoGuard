import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const VerifyingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verifying</Text>
      <View style={styles.box}>
        <ActivityIndicator size="large" color="#333" />
        <Text style={styles.message}>Please wait for office location validation</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  box: {
    width: '80%',
    padding: 20,
    backgroundColor: '#d9d9d9',
    borderRadius: 10,
    alignItems: 'center',
  },
  message: {
    marginTop: 15,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default VerifyingScreen;
