import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '../components/ScreenWrapper';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../types/navigation';

const CommonEntryForm: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  
  const [refNumber, setRefNumber] = useState('');
  const [subject, setSubject] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [observation, setObservation] = useState('');

  const handleSave = () => {
    // Handle saving logic here
    navigation.navigate('AllCrimeSceneBookEntries');
  };

  return (
    <ScreenWrapper>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("CrimeSceneMain")}>
            <Icon name="arrow-back-outline" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>New Crime Scene Book Entry</Text>
        </View>

        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Ref Number"
            value={refNumber}
            onChangeText={setRefNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="Subject"
            value={subject}
            onChangeText={setSubject}
          />
          <TextInput
            style={styles.input}
            placeholder="Time"
            value={time}
            onChangeText={setTime}
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />
          <TextInput
            style={[styles.input, styles.observationInput]}
            placeholder="Observation"
            value={observation}
            onChangeText={setObservation}
            multiline
          />

          <View style={styles.mediaContainer}>
            <Image source={{ uri: 'https://example.com/media1.png' }} style={styles.media} />
            <Image source={{ uri: 'https://example.com/media2.png' }} style={styles.media} />
            <Image source={{ uri: 'https://example.com/media3.png' }} style={styles.media} />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
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
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#F5F5F5',
  },
  observationInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  mediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  media: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: '#4A4A4A',
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

export default CommonEntryForm;
