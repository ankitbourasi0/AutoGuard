import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper'; // Assuming you have a ScreenWrapper component
import { NavigationProps } from '../types/navigation';

interface Inspection {
  id: number;
  date: string;
  modelName: string;
  registrationNumber: string;
}

const InspectionHistoryScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [searchText, setSearchText] = useState<string>('');
  
  // Dummy inspection data
  const [inspections, setInspections] = useState<Inspection[]>([
    { id: 1, date: '03/19/24', modelName: 'Model Name', registrationNumber: 'ABC1234' },
    { id: 2, date: '03/19/24', modelName: 'Model Name', registrationNumber: 'XYZ5678' },
    { id: 3, date: '03/19/24', modelName: 'Model Name', registrationNumber: 'DEF9012' },
  ]);

  const filteredInspections = inspections.filter(
    (item) =>
      item.date.includes(searchText) ||
      item.modelName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.registrationNumber.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleViewPress = (inspectionId: number) => {
    // Navigation to a detailed view screen could happen here
    navigation.navigate('NewVehicleInspection');
  };

  return (
    <ScreenWrapper>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("VehicleInspection")} style={styles.backButton}>
          <Icon name="arrow-back-outline" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Inspection History</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search date, car model, registration..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Inspection List */}
      <FlatList
        data={filteredInspections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.inspectionCard}>
            <Text style={styles.inspectionText}>Inspection Date: {item.date}</Text>
            <Text style={styles.inspectionText}>Model Name: {item.modelName}</Text>
            <Text style={styles.inspectionText}>Registration Number: {item.registrationNumber}</Text>
            <TouchableOpacity
              style={styles.viewButton}
              onPress={() => handleViewPress(item.id)}
            >
              <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContent}
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
    backgroundColor: '#3E3E3E',
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    borderRadius: 8,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderColor: '#CCC',
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  searchButton: {
    marginLeft: 10,
  },
  inspectionCard: {
    backgroundColor: '#6E6E6E',
    borderRadius: 8,
    padding: 20,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  inspectionText: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 5,
  },
  viewButton: {
    backgroundColor: '#3E3E3E',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
  },
  viewButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 100, // To ensure space for the SOS button
  },
  sosContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  sosButton: {
    backgroundColor: 'red',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 50,
  },
  sosButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default InspectionHistoryScreen;
