import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '../components/ScreenWrapper'; // Assuming you have this wrapper for consistent styling
import { NavigationProps } from '../types/navigation';
import axios from 'axios';
import {useAuthStore} from "../states/index";

import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
interface Entry {
  id: number;
  subject: string;
  time: string;
  location: string;
  date: string;
}

interface ObservationBookEntry{
  ob_record_fk: number,
  ref_number: string,
  subject: string,
  time: string,
  location: string,
  gps_location: string,
  comment: string,
  attachment_url: string,
  additional_comment: string
}

const AllObservationBookEntries: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [searchQuery, setSearchQuery] = useState('');
  const user = useAuthStore().user
  const [apiData, setApiData] = useState<ObservationBookEntry[]>([])
  useFocusEffect(
    useCallback(() => {
      if (!user || !user.staff_fk) {
        console.log("🔁 User not ready yet:", user);
        return;
      }
  
      console.log("➡️ Refetching Observation Books...");
  
      const getObservationBookByStaffId = async () => {
        try {
          const res = await axios.get(`https://autoguardapi.leogroup.tech/api/ObRecords/fetch-staff-ob-books?StaffFk=${user.staff_fk}`);
          const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
          console.log("✅ Parsed Observation Book data:", JSON.stringify(data, null, 2));
          setApiData(data);
        } catch (err) {
          console.error("❌ Error fetching observation books:", err);
        }
      };
  
      getObservationBookByStaffId();
    }, [user?.staff_fk])
  );
  
  
  const data: Entry[] = [
    { id: 1, subject: 'New Observation', time: '09:30', location: '1234 Waterfront Ave, Pretoria', date: '03/19/24' },
    { id: 2, subject: 'New Observation', time: '09:30', location: '1234 Waterfront Ave, Pretoria', date: '03/19/24' },
    // Add more dummy entries as needed
  ];

  const flattenedEntries: ObservationBookEntry[] = apiData.flatMap((group: any) => group.records || []);

  const filteredData = flattenedEntries.filter(entry =>
    entry.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.time?.includes(searchQuery)
  );

  const handleViewEntry = (entryId: number) => {
    // Navigate to entry details or handle viewing an entry
    navigation.navigate('NewCrimeSceneBookEntry')
    console.log(`View Entry ID: ${entryId}`);
  };

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("ObservationBookMain")} style={styles.backButton}>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>All Observation Books</Text>
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
  keyExtractor={(item) => item.ob_record_fk.toString()}
  renderItem={({ item }) => ( 
    <View style={styles.entryCard}>
      <Text style={styles.entryText}>Ref #: {item.ref_number}</Text>
      <Text style={styles.entryText}>Subject: {item.subject  || 'N/A'}</Text>
      <Text style={styles.entryText}>Time: {item.time || 'N/A'}</Text>
      <Text style={styles.entryText}>Location: {item.location || 'N/A'}</Text>
      <TouchableOpacity style={styles.viewButton} onPress={() => handleViewEntry(item.ob_record_fk)}>
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

export default AllObservationBookEntries;
