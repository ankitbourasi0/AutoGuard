import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import ScreenWrapper from '../components/ScreenWrapper';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../types/navigation';

interface Payslip {
  id: string;
  dateRange: string;
}

const PayslipsScreen: React.FC = () => {

  const navigation = useNavigation<NavigationProps>()
  const [isDateSelected, setIsDateSelected] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [showFromDatePicker, setShowFromDatePicker] = useState<boolean>(false);
  const [showToDatePicker, setShowToDatePicker] = useState<boolean>(false);

  const [payslips] = useState<Payslip[]>([
    { id: '1', dateRange: 'Apr 29 - May 3' },
    { id: '2', dateRange: 'May 6 - May 12' },
  ]);

  const handleDateSelection = (): void => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date | undefined): void => {
    if (showFromDatePicker) {
      setShowFromDatePicker(false);
      setFromDate(selectedDate || fromDate);
    } else if (showToDatePicker) {
      setShowToDatePicker(false);
      setToDate(selectedDate || toDate);
    }
  };

  const handleContinue = (): void => {
    setIsDateSelected(true);
    setShowDatePicker(false);
  };

  return (
    <ScreenWrapper>
        <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("ViewMenu")}>
                    <Icon name="arrow-back-outline" size={24} color="#000" />
                </TouchableOpacity>
              
            </View>
      <View style={styles.container}>
        <Text style={styles.title}>Payslips</Text>
        {!isDateSelected ? (
          <>
            <Text style={styles.subtitle}>Select A Date</Text>
            <TouchableOpacity style={styles.selectButton} onPress={handleDateSelection}>
              <Text style={styles.selectButtonText}>Select</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.subtitle}>Selected Date Range</Text>
            <View style={styles.selectedDateContainer}>
              <Text style={styles.dateText}>
                {fromDate ? fromDate.toDateString() : 'From date'} - {toDate ? toDate.toDateString() : 'To date'}
              </Text>
              <TouchableOpacity style={styles.updateButton} onPress={handleDateSelection}>
                <Text style={styles.updateButtonText}>Update Date</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.payslipContainer}>
              {payslips.map((payslip) => (
                <TouchableOpacity key={payslip.id} style={styles.payslipCard}>
                  <Icon name="document-outline" size={24} color="#000" />
                  <Text style={styles.payslipText}>{payslip.dateRange}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </View>

      <Modal visible={showDatePicker} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.datePickerContainer}>
              <TouchableOpacity onPress={() => setShowFromDatePicker(true)} style={styles.dateInput}>
                <Icon name="calendar-outline" size={20} color="#000" />
                <Text style={styles.dateText}>
                  {fromDate ? fromDate.toDateString() : 'From date'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowToDatePicker(true)} style={styles.dateInput}>
                <Icon name="calendar-outline" size={20} color="#000" />
                <Text style={styles.dateText}>
                  {toDate ? toDate.toDateString() : 'To date'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowDatePicker(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {showFromDatePicker && (
        <DateTimePicker
          value={fromDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {showToDatePicker && (
        <DateTimePicker
          value={toDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
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

  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  selectButton: {
    backgroundColor: '#3E3E3E',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  selectButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
  selectedDateContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },
  updateButton: {
    backgroundColor: '#FF9800',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  updateButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
  payslipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 20,
  },
  payslipCard: {
    backgroundColor: '#D3D3D3',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
  },
  payslipText: {
    fontSize: 14,
    color: '#000',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#6E6E6E',
    borderRadius: 8,
    padding: 20,
    width: '80%',
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    width: '48%',
  },
//   dateText: {
//     marginLeft: 10,
//     fontSize: 16,
//     color: '#000',
//   },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#D9534F',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cancelButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: '#5CB85C',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default PayslipsScreen;
