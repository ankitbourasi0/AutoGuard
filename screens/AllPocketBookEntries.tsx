import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '../components/ScreenWrapper'; // Assuming you have this wrapper for consistent styling
import { NavigationProps } from '../types/navigation';

interface Entry {
  id: number;
  subject: string;
  time: string;
  location: string;
  date: string;
}

const AllPocketBookEntries: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [searchQuery, setSearchQuery] = useState('');
  
  const data: Entry[] = [
    { id: 1, subject: 'New Observation', time: '09:30', location: '1234 Waterfront Ave, Pretoria', date: '03/19/24' },
    { id: 2, subject: 'New Observation', time: '09:30', location: '1234 Waterfront Ave, Pretoria', date: '03/19/24' },
    // Add more dummy entries as needed
  ];

  const filteredData = data.filter(entry =>
    entry.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.date.includes(searchQuery)
  );

  const handleViewEntry = (entryId: number) => {
    // Navigate to entry details or handle viewing an entry
    navigation.navigate('NewCrimeSceneBookEntry')
    console.log(`View Entry ID: ${entryId}`);
  };

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("PocketBookMain")} style={styles.backButton}>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>New Observation Book Entry</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search entry number/date/location..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.entryCard}>
            <Text style={styles.entryText}>Entry - {item.date}</Text>
            <Text style={styles.entryText}>Subject: {item.subject}</Text>
            <Text style={styles.entryText}>Time: {item.time}</Text>
            <Text style={styles.entryText}>Location: {item.location}</Text>
            <TouchableOpacity style={styles.viewButton} onPress={() => handleViewEntry(item.id)}>
              <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
    alignSelf: 'center',
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
  entryCard: {
    backgroundColor: '#B9B5A7',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    width: '90%',
    alignSelf: 'center',
  },
  entryText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  viewButton: {
    backgroundColor: '#3E3E3E',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  viewButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AllPocketBookEntries;
