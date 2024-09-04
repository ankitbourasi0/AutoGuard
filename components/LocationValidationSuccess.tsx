import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

const LocationValidationSuccess: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verifying</Text>
      <View style={styles.box}>
        <Image
          source={require('../assets/location-success.png')} // Replace with your success icon
          style={styles.successIcon}
        />
        <Text style={styles.message}>Coordinates validated, login to continue</Text>
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
  successIcon: {
    width: 50,
    height: 50,
    marginBottom: 15,
  },
  message: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default LocationValidationSuccess;
