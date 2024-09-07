// src/screens/GuardActivityScreen.tsx

import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '../components/ScreenWrapper';
import { NavigationProps } from '../types/navigation';

const GuardActivityScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();


  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Guard Activity</Text>
        {/* <View style={{ width: 24 }} /> Placeholder for alignment */}
      </View>
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#AAA"
          />
          <TouchableOpacity style={styles.searchButton}>
            <Icon name="search-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("ShiftScheduleScreen")}>
          <Text style={styles.buttonText}>Shift</Text>
          <Text style={styles.buttonSubText}>Start your shift from a central point</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}  onPress={()=>navigation.navigate("Entry")}>
          <Text style={styles.buttonText}>Shift Entry</Text>
          <Text style={styles.buttonSubText}>Make an OB, CS, or pocketbook entry</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}  onPress={()=>navigation.navigate("VehicleInspection")}>
          <Text style={styles.buttonText}>Vehicle Inspections</Text>
          <Text style={styles.buttonSubText}>New inspection or view inspection history</Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#AAA',
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: '#000',
  },
  searchButton: {
    padding: 10,
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#3E3E3E',
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
  sosButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default GuardActivityScreen;
