import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '../components/ScreenWrapper'; // Assuming you have this wrapper for consistent styling
import { NavigationProps } from '../types/navigation';
import { pocketBookApi } from '../services/pocketbook';
import { useUser } from '../hooks/userUser';
import { Image } from 'react-native';
import axios from 'axios';

import DateTimePicker from '@react-native-community/datetimepicker';

import { getCurrentLocation } from '../utils/getCurrentLocation';
const NewObservationBookEntry: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const user = useUser()

  const [refNumber, setRefNumber] = useState('');
  const [subject, setSubject] = useState('');
  const [entryTime, setEntryTime] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [location, setLocation] = useState('');
  const [observation, setObservation] = useState('');
  const [media, setMedia] = useState<string[]>([
    'https://via.placeholder.com/60',
    'https://via.placeholder.com/60',
    'https://via.placeholder.com/60'
  ]);


  const handleSave = async () => {
    if (!user || !user.staff_fk) {
      console.log("🔁 User not ready yet:", user);
      return;
    }
    
    const currentLocation = await getCurrentLocation();

    if (!currentLocation) {
      Alert.alert('Location Error', 'Unable to fetch current Location.');
     
    }
    const gpsLocation = `${currentLocation?.latitude},${currentLocation?.longitude}`;
    const requestData = {
      refNumber,
      subject,
      time: entryTime || "00:00:00",
      location,
      gpsLocation: gpsLocation || "",
      comment: observation,
      attachmentUrl: '',
      staffFk: user.staff_fk,
      modifiedBy: user.username || 'anonymous',
    };

    try {
      console.log("📤 Creating pocket book:", requestData);
      const res = await axios.post(
        `https://autoguardapi.leogroup.tech/api/ObRecords/create-ob-record`,
        requestData
      );

    
      if (res.status === 200) {
        Alert.alert('Success', 'Pocket Book entry created successfully!');
        setRefNumber('');
        setSubject('');
        setEntryTime('');
        setLocation('');
        setObservation('');
        navigation.navigate('AllObservationBooksEntries');
      }
    } catch (error: any) {
      const errorMessage =
      error.response?.data?.Error || // specific error returned by backend
      error.response?.data?.message || // fallback to message
      error.message || // general axios error
      'Unknown error occurred';
  
      console.error("❌ Error creating pocket book:", errorMessage);
      Alert.alert('Error', `Failed to create pocket book entry. ${error.response?.data?.Error}`);
      setRefNumber('');
      setSubject('');
      setEntryTime('');
      setLocation('');
      setObservation('');
    
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("PocketBookMain")} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Observation Book Entry</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Ref Number</Text>
        <TextInput style={styles.input} value={refNumber} onChangeText={setRefNumber} />

        <Text style={styles.label}>Subject</Text>
        <TextInput style={styles.input} value={subject} onChangeText={setSubject} />

        <Text style={styles.label}>Entry Time</Text>

        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input}>
          <Text >{entryTime || 'Select Time'}</Text>
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            mode="time"
            value={new Date()}
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              setShowTimePicker(false);
              if (selectedDate) {
                const hours = selectedDate.getHours().toString().padStart(2, '0');
                const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
                const formatted = `${hours}:${minutes}:00`;
                setEntryTime(formatted);
              }
            }}
          />
        )}

        <Text style={styles.label}>Location</Text>
        <TextInput style={styles.input} value={location} onChangeText={setLocation} />

        <Text style={styles.label}>Observation</Text>
        <View style={styles.observationContainer}>
          <TextInput
            style={styles.observationInput}
            value={observation}
            onChangeText={setObservation}
            multiline
            textAlignVertical="top"
          />
          <TouchableOpacity style={styles.cameraIcon}>
            <Icon name="camera-outline" size={24} color="#555" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Media</Text>
        <ScrollView horizontal style={styles.mediaContainer}>
          {media.map((uri, idx) => (
            <Image key={idx} source={{ uri }} style={styles.mediaItem} />
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 50,
    backgroundColor: '#e5e5e5',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#e5e5e5',
  },
  backButton: {
    paddingRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  form: {
    backgroundColor: '#B9B5A7',
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
  },
  label: {
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 15,
    color: '#222',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
  },
  observationContainer: {
    position: 'relative',
  },
  observationInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    height: 100,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  mediaContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  mediaItem: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#ccc',
  },
  saveButton: {
    backgroundColor: '#3E3E3E',
    marginTop: 30,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewObservationBookEntry;
