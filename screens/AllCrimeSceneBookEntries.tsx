import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '../components/ScreenWrapper';
import { NavigationProps } from '../types/navigation';

const AllCrimeSceneBookEntriesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  const entries = [
    { id: 1, subject: 'New Observation', time: '09:30', location: '1234 Waterfront Ave, Pretoria', date: '03/19/24' },
    { id: 2, subject: 'Another Observation', time: '14:30', location: '5678 Marine Dr, Durban', date: '03/20/24' },
    // Add more dummy data here
  ];

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.entryContainer}>
      <Text style={styles.entryText}>Entry - {item.date}</Text>
      <Text style={styles.entryDetails}>Subject: {item.subject}</Text>
      <Text style={styles.entryDetails}>Time: {item.time}</Text>
      <Text style={styles.entryDetails}>Location: {item.location}</Text>
      <TouchableOpacity style={styles.viewButton} onPress={() => navigation.navigate('NewCrimeSceneBookEntry')}>
        <Text style={styles.viewButtonText}>View</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Entry")}>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>New Crime Scene Book Entry</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search entry number/date/location..."
        />
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#F5F5F5',
  },
  searchButton: {
    paddingHorizontal: 10,
  },
  entryContainer: {
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#EAEAEA',
  },
  entryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  entryDetails: {
    fontSize: 14,
    marginTop: 5,
  },
  viewButton: {
    marginTop: 15,
    backgroundColor: '#4A4A4A',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AllCrimeSceneBookEntriesScreen;
