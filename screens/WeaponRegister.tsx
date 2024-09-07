import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const WeaponsRegisterScreen: React.FC = () => {
  const navigation = useNavigation();
  const [caliber, setCaliber] = useState('');
  const [magazineCount, setMagazineCount] = useState('');
  const [ammoLoaded, setAmmoLoaded] = useState('');
  const [dateReceived, setDateReceived] = useState('');

  const handleRequest = () => {
    // Handle weapon request logic here
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Weapons Register</Text>
      </View>

      <View style={styles.weaponInfo}>
        <Text style={styles.weaponName}>Name</Text>
        <Text style={styles.serialNumber}>Serial Number</Text>
        
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Caliber</Text>
            <TextInput
              style={styles.input}
              value={caliber}
              onChangeText={setCaliber}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Magazine Count</Text>
            <TextInput
              style={styles.input}
              value={magazineCount}
              onChangeText={setMagazineCount}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Ammunition Loaded</Text>
            <TextInput
              style={styles.input}
              value={ammoLoaded}
              onChangeText={setAmmoLoaded}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Latest Ammo Count</Text>
            <Text style={styles.inputDisabled}>-</Text>
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date Received</Text>
            <TextInput
              style={styles.input}
              value={dateReceived}
              onChangeText={setDateReceived}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date Returned</Text>
            <Text style={styles.inputDisabled}>-</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.requestButton} onPress={handleRequest}>
          <Text style={styles.requestButtonText}>Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (styles similar to the ShiftDetailsScreen, adjusted for this screen's layout)
  container: {
    flex: 1,
    backgroundColor: '#2c2c2c',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1c1c1c',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    marginLeft: 16,
  },
  shiftInfo: {
    backgroundColor: '#3c3c3c',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  shiftName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    color: 'white',
    marginLeft: 8,
  },
  timeline: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 16,
  },
  timelineStep: {
    backgroundColor: '#4c4c4c',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  activeStep: {
    backgroundColor: '#007AFF',
  },
  stepText: {
    color: 'white',
    textAlign: 'center',
  },
  sosButton: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    backgroundColor: 'red',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosText: {
    color: 'white',
    fontWeight: 'bold',
  },
});