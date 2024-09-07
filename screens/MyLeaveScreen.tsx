import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NavigationProps, RootStackParamList } from '../types/navigation';  // Import your RootStackParamList
import ScreenWrapper from '../components/ScreenWrapper';

interface Leave {
    leaveType: string;
    startDate: string | null;
    endDate: string | null;
    status: string;
  }
type MyLeaveScreenRouteProp = RouteProp<RootStackParamList, 'MyLeaveScreen'>;

const MyLeaveScreen: React.FC = () => {
  const [pendingLeaves, setPendingLeaves] = useState<Leave[]>([]);
  const navigation = useNavigation<NavigationProps>();
  
  const route = useRoute<MyLeaveScreenRouteProp>();
  const newLeave = route.params?.newLeave;  // Ensure `newLeave` is optional

  useEffect(() => {
    if (newLeave) {
      const leaveWithDates = {
        ...newLeave,
        startDate: newLeave.startDate ,
        endDate: newLeave.endDate ,
      };
      setPendingLeaves([...pendingLeaves, leaveWithDates]);
    }
  }, [newLeave]);
  

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Apply For Leave</Text>

        <View style={styles.leaveBalanceCard}>
          <Text style={styles.leaveBalanceTitle}>Leave Balance</Text>
          <View style={styles.leaveBalanceRow}>
            <Text style={styles.leaveBalanceText}>Annual</Text>
            <Text style={styles.leaveBalanceText}>10 Days</Text>
          </View>
          <View style={styles.leaveBalanceRow}>
            <Text style={styles.leaveBalanceText}>Sick</Text>
            <Text style={styles.leaveBalanceText}>21 Days</Text>
          </View>
          <View style={styles.leaveBalanceRow}>
            <Text style={styles.leaveBalanceText}>Family Responsibility</Text>
            <Text style={styles.leaveBalanceText}>3 Days</Text>
          </View>
        </View>

        <View style={styles.pendingCard}>
          <Text style={styles.pendingTitle}>Leave Pending</Text>
          {pendingLeaves.length === 0 ? (
            <Text style={styles.noDataText}>No data...</Text>
          ) : (
            <FlatList
              data={pendingLeaves}
              renderItem={({ item }) => (
                <View style={styles.pendingLeaveItem}>
                  <Text style={styles.leaveTypeText}>{item.leaveType}</Text>
                  <Text>{`Date: ${item.startDate} - ${item.endDate}`}</Text>
                  <Text>{`Status: ${item.status}`}</Text>
                </View>
              )}
              keyExtractor={(_, index) => index.toString()}
            />
          )}
        </View>

        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => navigation.navigate('ApplyForLeave')}
        >
          <Text style={styles.applyButtonText}>Apply For Leave</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  leaveBalanceCard: {
    backgroundColor: '#6E6E6E',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    width: '100%',
  },
  leaveBalanceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  leaveBalanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  leaveBalanceText: {
    fontSize: 16,
    color: '#FFF',
  },
  pendingCard: {
    backgroundColor: '#D3D3D3',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    width: '100%',
  },
  pendingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  noDataText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  pendingLeaveItem: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  leaveTypeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  applyButton: {
    backgroundColor: '#3E3E3E',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginBottom: 20,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default MyLeaveScreen;
