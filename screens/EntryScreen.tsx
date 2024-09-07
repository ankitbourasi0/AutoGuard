// src/screens/EntryScreen.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '../components/ScreenWrapper';
import { NavigationProps } from '../types/navigation';

const EntryScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("GuardActivity")}>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Entry</Text>
   {/* Placeholder for alignment */}
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.button}  onPress={()=>navigation.navigate("PocketBookMain")}>
          <Text style={styles.buttonText}>Pocket Book</Text>
          <Text style={styles.buttonSubText}>New Pocket Book entry/ View all entries</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}  onPress={()=>navigation.navigate("ObservationBookMain")}>
          <Text style={styles.buttonText}>Observation Book</Text>
          <Text style={styles.buttonSubText}>New OB entry/ View all entries</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}  onPress={()=>navigation.navigate("CrimeSceneMain")}>
          <Text style={styles.buttonText}>Crime Scene Book</Text>
          <Text style={styles.buttonSubText}>New CS entry/ View all entries</Text>
        </TouchableOpacity>
      </View>
      
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#3E3E3E',
    padding: 15,
    marginVertical: 10,
    width: '90%',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  buttonSubText: {
    fontSize: 12,
    color: '#CFCFCF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#3E3E3E',
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  sosButton: {
    alignItems: 'center',
    backgroundColor: '#FF4C4C',
    padding: 10,
    borderRadius: 50,
    marginHorizontal: 10,
    width: 60,
    height: 60,
    justifyContent: 'center',
  },
  footerButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
  sosButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default EntryScreen;
