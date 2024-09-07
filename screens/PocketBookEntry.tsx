import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '../components/ScreenWrapper'; // Assuming you have this wrapper for consistent styling
import { NavigationProps } from '../types/navigation';

const NewPocketBookEntry: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  
  const [name, setName] = useState('');
  const [idNo, setIdNo] = useState('');
  const [companyNo, setCompanyNo] = useState('');
  const [psira, setPsira] = useState('');
  const [branch, setBranch] = useState('');
  const [region, setRegion] = useState('');

  const handleContinue = () => {
    // Handle the submit action here, like navigating to another screen or saving data.
    console.log({ name, idNo, companyNo, psira, branch, region });
    navigation.navigate('AllPocketBookEntries');
    // navigate to next screen with navigation
  };

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("PocketBookMain")} style={styles.backButton}>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Pocket Book Information</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formCard}>
          <Text style={styles.formLabel}>Fill in the following pocket book information:</Text>

          <TextInput
            style={styles.inputField}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.inputField}
            placeholder="ID No."
            value={idNo}
            onChangeText={setIdNo}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Company No."
            value={companyNo}
            onChangeText={setCompanyNo}
          />
          <TextInput
            style={styles.inputField}
            placeholder="PSIRA"
            value={psira}
            onChangeText={setPsira}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Branch"
            value={branch}
            onChangeText={setBranch}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Region"
            value={region}
            onChangeText={setRegion}
          />

          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  container: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  formCard: {
    backgroundColor: '#B9B5A7',
    borderRadius: 8,
    padding: 20,
    width: '90%',
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputField: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: '#3E3E3E',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewPocketBookEntry;
