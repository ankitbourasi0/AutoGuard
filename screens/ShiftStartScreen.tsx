import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { NavigationProps, RootStackParamList } from '../types/navigation';

type ShiftStartScreenRouteProp = RouteProp<RootStackParamList, 'ShiftStartScreen'>;

type ShiftStartScreenProps = {
  route: ShiftStartScreenRouteProp;
};

const ShiftStartScreen: React.FC<ShiftStartScreenProps> = ({ route }) => {
  const navigation = useNavigation<NavigationProps>();
  const { date, shift } = route.params;

  const [currentStep, setCurrentStep] = useState<'weapon' | 'vehicle' | 'start'>('weapon');

  const handleStepCompletion = (step: 'weapon' | 'vehicle' | 'start') => {
    if (step === 'weapon') {
      setCurrentStep('vehicle');
      navigation.navigate('WeaponsRegister');
    } else if (step === 'vehicle') {
      setCurrentStep('start');
      navigation.navigate('VehicleInspection');
    } else {
        Alert.alert('✅ Shift Started', `Shift "${shift.shift_name}" started at ${shift.start_time}`);
        // Additional logic (API call to start shift) can go here
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shift - {date}</Text>
      </View>

      <View style={styles.shiftInfo}>
      <Text style={styles.shiftName}>{shift.shift_name}</Text>

        <View style={styles.infoRow}>
          <Ionicons name="location" size={16} color="white" />
          <Text style={styles.infoText}>{shift.shift_location}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="time" size={16} color="white" />
          <Text style={styles.infoText}>
  {shift.start_time} - {shift.end_time}
</Text>  
 </View>

        <View style={styles.infoRow}>
          <FontAwesome6 name="gun" size={16} color="white" />
          <Text style={styles.infoText}>Weapon check pending</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="car" size={16} color="white" />
          <Text style={styles.infoText}>Vehicle inspection pending</Text>
        </View>
      </View>

      <View style={styles.timeline}>
        <TouchableOpacity 
          style={[styles.timelineStep, currentStep === 'weapon' ? styles.activeStep : {}]}
          onPress={() => handleStepCompletion('weapon')}
        >
          <Text style={styles.stepText}>Request Weapon</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.timelineStep, currentStep === 'vehicle' ? styles.activeStep : {}]}
          onPress={() => handleStepCompletion('vehicle')}
        >
          <Text style={styles.stepText}>Vehicle Inspection</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.timelineStep, currentStep === 'start' ? styles.activeStep : {}]}
          onPress={() => handleStepCompletion('start')}
        >
          <Text style={styles.stepText}>Start Shift</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.sosButton}>
        <Text style={styles.sosText}>SOS</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShiftStartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c2c2c',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1c1c1c',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    marginLeft: 16,
  },
  shiftInfo: {
    backgroundColor: '#3c3c3c',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  shiftName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    color: 'white',
    marginLeft: 8,
  },
  timeline: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 16,
  },
  timelineStep: {
    backgroundColor: '#4c4c4c',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  activeStep: {
    backgroundColor: '#007AFF',
  },
  stepText: {
    color: 'white',
    textAlign: 'center',
  },
  sosButton: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    backgroundColor: 'red',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
