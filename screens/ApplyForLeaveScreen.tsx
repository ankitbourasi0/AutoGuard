import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import { NavigationProps } from '../types/navigation';

interface Leave {
  type: string;
  daysLeft: number;
  halfDay: boolean;
  periodOfDay: string;
  startDate: Date | null;
  endDate: Date | null;
  note: string;
  proofDocument: DocumentPicker.DocumentPickerAsset | null;
}

const ApplyForLeaveScreen: React.FC = () => {
  const [leaveType, setLeaveType] = useState<string>('');
  const [leaveNote, setLeaveNote] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [halfDay, setHalfDay] = useState<boolean>(false);
  const [periodOfDay, setPeriodOfDay] = useState<string>('AM');
  const [proofDocument, setProofDocument] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState<boolean>(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProps>();

  const handleDocumentUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync();
    if (result.canceled === false && result.assets && result.assets.length > 0) {
      setProofDocument(result.assets[0]);
    }
  };

  const handleApplyLeave = () => {
    setShowConfirmationModal(true);
  };

  const handleSubmitLeave = () => {
    // Close the modal
    setShowConfirmationModal(false);
  
    // Create serializable newLeave object
    const newLeave = {
      leaveType,
      startDate: startDate?.toISOString() || null,
      endDate: endDate?.toISOString() || null,
      status: 'Pending...',
    };
  
    // Add a short delay to ensure modal closes before navigation
    setTimeout(() => {
      navigation.navigate('MyLeaveScreen', { newLeave });
    }, 300);
  };
  
  

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("MyLeaveScreen",{})} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Apply For Leave</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.leaveFormCard}>
          <Text style={styles.leaveFormLabel}>Type Of Leave</Text>
          <TextInput
            style={styles.inputField}
            value={leaveType}
            onChangeText={setLeaveType}
            placeholder="Select Type of Leave"
          />

          <Text style={styles.leaveFormLabel}>
            Leave days left before application: - {leaveType === 'Sick' ? '21' : '10'} Days
          </Text>

          <View style={styles.row}>
            <TouchableOpacity
              style={halfDay ? styles.radioActive : styles.radioInactive}
              onPress={() => setHalfDay(!halfDay)}
            >
              <Text style={styles.radioText}>Half Day</Text>
            </TouchableOpacity>

            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={periodOfDay === 'AM' ? styles.radioActive : styles.radioInactive}
                onPress={() => setPeriodOfDay('AM')}
              >
                <Text style={styles.radioText}>AM</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={periodOfDay === 'PM' ? styles.radioActive : styles.radioInactive}
                onPress={() => setPeriodOfDay('PM')}
              >
                <Text style={styles.radioText}>PM</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.row}>
            <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.datePickerButton}>
              <Icon name="calendar-outline" size={24} color="#000" />
              <Text>{startDate ? startDate.toDateString() : 'Start Date'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.datePickerButton}>
              <Icon name="calendar-outline" size={24} color="#000" />
              <Text>{endDate ? endDate.toDateString() : 'End Date'}</Text>
            </TouchableOpacity>
          </View>

          {showStartDatePicker && (
            <DateTimePicker
              value={startDate || new Date()}
              mode="date"
              display="default"
              onChange={(_, date) => {
                setShowStartDatePicker(false);
                if (date) setStartDate(date);
              }}
            />
          )}

          {showEndDatePicker && (
            <DateTimePicker
              value={endDate || new Date()}
              mode="date"
              display="default"
              onChange={(_, date) => {
                setShowEndDatePicker(false);
                if (date) setEndDate(date);
              }}
            />
          )}

          <Text style={styles.leaveFormLabel}>Leave Note</Text>
          <TextInput
            style={styles.textArea}
            multiline={true}
            value={leaveNote}
            onChangeText={setLeaveNote}
            placeholder="Enter Leave Note"
          />

          <Text style={styles.leaveFormLabel}>Upload Proof Documentation</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={handleDocumentUpload}>
            <Icon name="document-outline" size={24} color="#000" />
            <Text>Upload Document/Image</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.applyButton} onPress={handleApplyLeave}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    {/* Confirmation Modal */}
<Modal
  transparent={true}
  visible={showConfirmationModal}
  animationType="fade"
  onRequestClose={() => setShowConfirmationModal(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Apply For Leave</Text>
      <Text>Are you sure you want to submit the leave request?</Text>
      <View style={styles.modalButtons}>
        <TouchableOpacity style={styles.modalCancelButton} onPress={() => setShowConfirmationModal(false)}>
          <Text style={styles.modalCancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalSubmitButton} onPress={handleSubmitLeave}>
          <Text style={styles.modalSubmitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  leaveFormCard: {
    backgroundColor: '#6E6E6E',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    width: '100%',
  },
  leaveFormLabel: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 10,
  },
  inputField: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  radioActive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    justifyContent: 'center',
  },
  radioInactive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    justifyContent: 'center',
    opacity: 0.5,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '48%',
  },
  radioText: {
    fontSize: 16,
    color: '#000',
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    width: '48%',
  },
  textArea: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    minHeight: 80,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  uploadButton: {
    backgroundColor: '#D3D3D3',
    padding: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  applyButton: {
    backgroundColor: '#3E3E3E',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  modalCancelButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  modalCancelButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  modalSubmitButton: {
    backgroundColor: '#3E3E3E',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  modalSubmitButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default ApplyForLeaveScreen;
