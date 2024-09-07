import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper'; // Assuming you have a common screen wrapper
import { NavigationProps } from '../types/navigation';

const NewVehicleInspection: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [make, setMake] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [regNo, setRegNo] = useState<string>('');
  const [diesel, setDiesel] = useState<string>('');
  const [kmReading, setKmReading] = useState<string>('');
  const [branch, setBranch] = useState<string>('');
  const [licenseExpDate, setLicenseExpDate] = useState<string>('');
  const [selectedFaults, setSelectedFaults] = useState<{ [key: string]: boolean }>({});

  // Handle selecting fault on the vehicle diagram
  const toggleFault = (key: string) => {
    setSelectedFaults((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("VehicleInspection")} style={styles.backButton}>
            <Icon name="arrow-back-outline" size={24}  />
          </TouchableOpacity>
          <Text style={styles.title}>Vehicle Inspection</Text>
        </View>

        {/* Vehicle Information Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Vehicle Information</Text>
          <TextInput style={styles.input} placeholder="Make" value={make} onChangeText={setMake} />
          <TextInput style={styles.input} placeholder="Model" value={model} onChangeText={setModel} />
          <TextInput style={styles.input} placeholder="Reg No" value={regNo} onChangeText={setRegNo} />
          <TextInput style={styles.input} placeholder="Diesel" value={diesel} onChangeText={setDiesel} />
          <TextInput style={styles.input} placeholder="KM Reading" value={kmReading} onChangeText={setKmReading} />
          <TextInput style={styles.input} placeholder="Region/Branch" value={branch} onChangeText={setBranch} />
          <TextInput style={styles.input} placeholder="License Exp Date" value={licenseExpDate} onChangeText={setLicenseExpDate} />
        </View>

        {/* Vehicle Diagram for Faults */}
        <View style={styles.diagramSection}>
          <Text style={styles.cardTitle}>Highlight the faulty part on the diagram</Text>
          <View style={styles.diagram}>
            {/* Assume a diagram and allow highlighting */}
            <TouchableOpacity style={selectedFaults['front'] ? styles.faultHighlighted : styles.fault} onPress={() => toggleFault('front')} />
            {/* Add more fault points */}
          </View>
        </View>

        {/* Section Navigation Buttons */}
        <View style={styles.sectionNav}>
          <Text style={styles.sectionNavTitle}>Take me to this section</Text>
          <View style={styles.sectionButtonsContainer}>
            <TouchableOpacity style={styles.sectionButton}><Text style={styles.sectionButtonText}>Driver Qualifications</Text></TouchableOpacity>
            <TouchableOpacity style={styles.sectionButton}><Text style={styles.sectionButtonText}>Engine Compartment</Text></TouchableOpacity>
            <TouchableOpacity style={styles.sectionButton}><Text style={styles.sectionButtonText}>Tyre Condition</Text></TouchableOpacity>
            {/* Add more sections */}
          </View>
        </View>

        {/* Driver Qualifications Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Driver Qualifications</Text>
          <TextInput style={styles.input} placeholder="Driver's License" />
          {/* Add Yes/No button for PrDP and other qualifications */}
          <View style={styles.yesNoRow}>
            <TouchableOpacity style={styles.yesButton}><Text style={styles.yesNoText}>Y</Text></TouchableOpacity>
            <TouchableOpacity style={styles.noButton}><Text style={styles.yesNoText}>N</Text></TouchableOpacity>
          </View>
        </View>

        {/* Other Inspection Sections */}
        {/* Similar to Driver Qualifications - you would replicate for each section as shown in the images */}

        {/* Submit Section */}
        <View style={styles.submitSection}>
          <Text>My attached signature to this form confirms that I take full responsibility/liability for this vehicle.</Text>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

     
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 100, // Ensure space for the SOS button
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    marginBottom: 20,
   
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
   
    textAlign: 'center',
    flex: 1,
  },
  card: {
    backgroundColor: '#C4C4C4',
    borderRadius: 8,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  diagramSection: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  diagram: {
    height: 200,
    backgroundColor: '#E0E0E0',
    // Styles for diagram positioning
  },
  fault: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF0000',
  },
  faultHighlighted: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#00FF00',
  },
  sectionNav: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionNavTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sectionButton: {
    backgroundColor: '#4A4A4A',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: '48%',
    alignItems: 'center',
  },
  sectionButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  yesNoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  yesButton: {
    backgroundColor: '#28A745',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  noButton: {
    backgroundColor: '#DC3545',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  yesNoText: {
    color: '#FFF',
    fontSize: 16,
  },
  submitSection: {
    marginHorizontal: 20,
    marginBottom: 50,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#3E3E3E',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
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
})

export default NewVehicleInspection;
