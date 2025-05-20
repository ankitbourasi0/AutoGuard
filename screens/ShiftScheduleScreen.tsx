import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../types/navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '../components/ScreenWrapper';
import { useAuthStore } from '../states';
import { format, addDays, startOfWeek, endOfWeek, addWeeks } from 'date-fns';

export interface ShiftItem {
  shift_type: string;
  shift_fk: number;
  staff_fk: number;
  staff_name: string;
  staff_surname: string;
  shift_name: string;
  shift_location: string;
  start_time: string;
  end_time: string;
  estimated_time_of_completion: string | null;
  leeway_time: string | null;
  status: string;
}

export interface ShiftGroup {
  shift_date: string;
  shift_label: string;
  shifts: ShiftItem[];
}

interface WeekRange {
  label: string;
  fromDate: string;
  toDate: string;
}

const ShiftList: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const user = useAuthStore();
  const [shifts, setShifts] = useState<ShiftGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedWeek, setSelectedWeek] = useState<WeekRange | null>(null);
  const [weekRanges, setWeekRanges] = useState<WeekRange[]>([]);

  const API_URL = 'https://autoguardapi.leogroup.tech/api/Shift/get-recurring-shifts';

  useEffect(() => {
    generateWeekRanges();
  }, []);

  useEffect(() => {
    if (selectedWeek) {
      fetchShifts(selectedWeek.fromDate, selectedWeek.toDate);
    }
  }, [selectedWeek]);

  const generateWeekRanges = () => {
    const baseDate = new Date();
    const weeks: WeekRange[] = [];
    for (let i = -2; i <= 2; i++) {
      const start = startOfWeek(addWeeks(baseDate, i), { weekStartsOn: 1 });
      const end = endOfWeek(addWeeks(baseDate, i), { weekStartsOn: 1 });
      weeks.push({
        label: `${format(start, 'dd MMM')} - ${format(end, 'dd MMM')}`,
        fromDate: start.toISOString(),
        toDate: end.toISOString(),
      });
    }
    setWeekRanges(weeks);
    setSelectedWeek(weeks[2]); // current week
  };

  const fetchShifts = async (fromDate: string, toDate: string) => {
    try {
      setLoading(true);
      const payload = {
        staffFk: 108 ,
        fromDate,
        toDate,
      };
      const response = await axios.post<ShiftGroup[]>(API_URL, payload);
      setShifts(response.data);
    } catch (error) {
      console.error('❌ Error fetching shifts:', error);
      Alert.alert('Error', 'Failed to load shifts.');
    } finally {
      setLoading(false);
    }
  };

  const renderShiftItem = (shift: ShiftItem, shiftDate: string) => {
    const displayStatus = shift.status.toLowerCase();

    let statusStyle;
    let statusText;
    if (displayStatus === 'started') {
      statusStyle = styles.startBtn;
      statusText = 'Start';
    } else if (displayStatus === 'completed') {
      statusStyle = styles.completedBtn;
      statusText = 'Completed';
    } else {
      statusStyle = styles.notStartedBtn;
      statusText = 'Not Started';
    }

    return (
      <View key={shift.shift_fk} style={styles.card}>
        <Text style={styles.shiftName}>{shift.shift_name}</Text>
        <Text style={styles.timeText}>
          {shift.start_time} - {shift.end_time}
        </Text>
        <TouchableOpacity
          style={[styles.statusButton, statusStyle]}
          onPress={() =>
            navigation.navigate('ShiftStartScreen', {
              date: shiftDate,
              shift: shift,
            })
          }
        >
          <Text style={styles.statusText}>{statusText}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderShiftGroup = ({ item }: { item: ShiftGroup }) => (
    <View key={item.shift_date} style={styles.groupContainer}>
      <Text style={styles.dateHeader}>{item.shift_label}</Text>
      {item.shifts.map((shift) => renderShiftItem(shift, item.shift_date))}
    </View>
  );

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Shifts</Text>
      </View>

      <View style={styles.weekChipWrapper}>
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <View style={styles.weekChipRow}>
      {weekRanges.map((week, idx) => (
        <TouchableOpacity
          key={idx}
          style={[
            styles.weekChip,
            selectedWeek?.label === week.label && styles.weekChipSelected,
          ]}
          onPress={() => setSelectedWeek(week)}
        >
          <Text
            style={[
              styles.weekChipText,
              selectedWeek?.label === week.label && styles.weekChipTextSelected,
            ]}
          >
            {week.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </ScrollView>
</View>


      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={shifts}
          renderItem={renderShiftGroup}
          keyExtractor={(item, index) => `${item.shift_date}-${index}`}
        />
      )}
    </ScreenWrapper>
  );
};

export default ShiftList;

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
  
  weekChipWrapper: {
    marginTop: 10,
    marginBottom: 8,
  },
  
  weekChipRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  
  weekChip: {
    backgroundColor: '#D3D3D3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
  },
  
  weekChipSelected: {
    backgroundColor: '#000',
  },
  
  weekChipText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  
  weekChipTextSelected: {
    color: '#fff',
  },
  
    
  dateHeader: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 8,
    paddingHorizontal: 15,
    fontWeight: 'bold',
    fontSize: 16,
  },
  groupContainer: {
    marginBottom: 12,
  },
  card: {
    padding: 15,
    backgroundColor: '#f4f4f4',
    marginBottom: 10,
  },
  shiftName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  timeText: {
    marginBottom: 8,
    fontSize: 14,
  },
  statusButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  startBtn: {
    backgroundColor: '#4CAF50',
  },
  completedBtn: {
    backgroundColor: '#000',
  },
  notStartedBtn: {
    backgroundColor: '#999',
  },
});
