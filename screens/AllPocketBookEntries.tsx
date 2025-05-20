import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import moment from 'moment';

import ScreenWrapper from '../components/ScreenWrapper';
import { useAuthStore } from '../states/index';
import { NavigationProps } from '../types/navigation';

interface PocketBookEntry {
  pocket_book_fk: number;
  ref_number: string;
  subject: string;
  entry_time: string;
  location?: string;
  gps_location: string;
  comment: string;
  attachment_url: string;
  additional_comment?: string;
}

const AllPocketBookEntries: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const user = useAuthStore().user;
  const [apiData, setApiData] = useState<PocketBookEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [gpsLocation, setGpsLocation] = useState('');
  const [pocketBookEntries, setPocketBookEntries] = useState<PocketBookEntry[]>([]);
  const [userEntries, setUserEntries] = useState<any[]>([]); // for date API result
  const [responseType, setResponseType] = useState<'BOOK' | 'USER'>('BOOK');
  const [loading, setLoading] = useState(false);
  React.useEffect(() => {
    if (!user?.staff_fk) return;
    fetchAllEntries();
  }, [user]);
  React.useEffect(() => {
    if (filterType === 'All') {
      fetchAllEntries(); // 🔥 Whenever All is selected, refetch latest all entries
    }
  }, [filterType]);

  const fetchAll = async () => {
    const res = await axios.post(
      `https://autoguardapi.leogroup.tech/api/PocketBook/fetch-by-pocket-staff-id?StaffFk=${user?.staff_fk}`
    );
    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
    setApiData(data.flatMap((group: any) => group.records || []));
  };

  const fetchAllEntries = async () => {
    try {
      setLoading(true); // 
      const res = await axios.post(
        `https://autoguardapi.leogroup.tech/api/PocketBook/fetch-by-pocket-staff-id?StaffFk=${user?.staff_fk}`
      );
      const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
      
    const flattenedData = data.flatMap((group: any) => group.records || []); 
    setPocketBookEntries(flattenedData);
      setResponseType('BOOK');
      setUserEntries([]);
    } catch (err) {
      console.error('❌ Error fetching all entries:', err);
    } finally {
      setLoading(false); // End spinner
    }
  };
  
  const filterEntriesByDate = async () => {
    try {
      if (!fromDate || !toDate) {
        console.warn('⚠️ Please select both From and To dates.');
        return;
      }
  
      setLoading(true);
      const res = await axios.post(
        'https://autoguardapi.leogroup.tech/api/PocketBook/filterByDate_pocket_book',
        {
          fromDate: moment(fromDate).format('YYYY-MM-DDTHH:mm:ss.SS'),
          toDate: moment(toDate).format('YYYY-MM-DDTHH:mm:ss.SS'),
          businessFk: user?.business_fk
        }
      );
      const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
      setUserEntries(data);
      setResponseType('USER');
      setPocketBookEntries([]);
    } catch (err) {
      console.error('❌ Error filtering by date:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const filterEntriesByGpsLocation = async () => {
    try {
      if (!gpsLocation.trim()) {
        console.warn('⚠️ Please enter a GPS location.');
        return;
      }
      setLoading(true);
      const res = await axios.post(
        'https://autoguardapi.leogroup.tech/api/PocketBook/filter-pocket-by-gps-location',
        { gpsLocation }
      );
      const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
      setPocketBookEntries(data);
      setResponseType('BOOK');
      setUserEntries([]);
    } catch (err) {
      console.error('❌ Error filtering by GPS location:', err);
    }finally {
      setLoading(false);
    }
  };

  const handleFilter = async () => {
    if (filterType === 'All') {
      await fetchAllEntries();
    } else if (filterType === 'By Date') {
      await filterEntriesByDate();
    } else if (filterType === 'By GPS Location') {
      await filterEntriesByGpsLocation();
    }
  };
  


  const filteredData = apiData.filter(entry =>
    entry.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.entry_time?.includes(searchQuery)
  );

  const handleViewEntry = (entryId: number) => {
    navigation.navigate('NewCrimeSceneBookEntry');
  };

  return (
    
      <ScreenWrapper>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('PocketBookMain')} style={styles.backButton}>
            <Icon name="arrow-back-outline" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>All Pocket Books</Text>
        </View>
    
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={filterType}
            onValueChange={setFilterType}
            style={{ backgroundColor: '#fff' }}
          >
            <Picker.Item label="All" value="All" />
            <Picker.Item label="By Date" value="By Date" />
            <Picker.Item label="By GPS Location" value="By GPS Location" />
          </Picker>
        </View>
    
        {filterType === 'By Date' && (
          <>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setShowFromPicker(true)}
            >
              <Text style={styles.filterButtonText}>
                {fromDate ? moment(fromDate).format('YYYY-MM-DD') : 'Select From Date'}
              </Text>
            </TouchableOpacity>
            {showFromPicker && (
              <DateTimePicker
                value={fromDate || new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, date) => {
                  setShowFromPicker(false);
                  if (date) setFromDate(date);
                }}
              />
            )}
    
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setShowToPicker(true)}
            >
              <Text style={styles.filterButtonText}>
                {toDate ? moment(toDate).format('YYYY-MM-DD') : 'Select To Date'}
              </Text>
            </TouchableOpacity>
            {showToPicker && (
              <DateTimePicker
                value={toDate || new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, date) => {
                  setShowToPicker(false);
                  if (date) setToDate(date);
                }}
              />
            )}
    
            <TouchableOpacity style={styles.searchButton} onPress={handleFilter}>
              <Icon name="search-outline" size={24} color="#000" />
            </TouchableOpacity>
          </>
        )}
    
        {filterType === 'By GPS Location' && (
          <>
           <View style={styles.gpsSearchRow}>
  <TextInput
    style={styles.gpsInputFlex}
    placeholder="Enter GPS Location (lat,long)"
    value={gpsLocation}
    onChangeText={setGpsLocation}
  />
  <TouchableOpacity style={styles.searchButtonIcon} onPress={handleFilter}>
    <Icon name="search-outline" size={24} color="#000" />
  </TouchableOpacity>
</View>

          </>
        )}
    
    {loading ? (
  <View style={styles.loadingContainer}>
    <Text style={styles.loadingText}>Loading...</Text>
  </View>
) : (
  <>
    {responseType === 'BOOK' ? (
      <FlatList
        data={pocketBookEntries.filter(entry =>
          entry.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.entry_time?.includes(searchQuery)
        )}
        keyExtractor={(item) => item.pocket_book_fk.toString()}
        renderItem={({ item }) => (
          <View style={styles.entryCard}>
            <Text style={styles.entryText}>Ref #: {item.ref_number}</Text>
            <Text style={styles.entryText}>Subject: {item.subject || 'N/A'}</Text>
            <Text style={styles.entryText}>Time: {item.entry_time || 'N/A'}</Text>
            <Text style={styles.entryText}>Location: {item.location || item.gps_location || 'N/A'}</Text>
            <TouchableOpacity style={styles.viewButton} onPress={() => handleViewEntry(item.pocket_book_fk)}>
              <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    ) : (
      <FlatList
        data={userEntries}
        keyExtractor={(item, index) => `user-${index}`}
        renderItem={({ item }) => (
          <View style={styles.entryCard}>
            <Text style={styles.entryText}>Name: {item.name}</Text>
            <Text style={styles.entryText}>Surname: {item.surname}</Text>
            <Text style={styles.entryText}>Employee ID: {item.employee_id}</Text>
          </View>
        )}
      />
    )}
  </>
)}

      </ScreenWrapper>
    );

};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
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
    flex: 1,
    textAlign: 'center',
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#AAA',
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: '#000',
  },
  gpsSearchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  
  gpsInputFlex: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#AAA',
    borderRadius: 8,
    backgroundColor: '#FFF',
    fontSize: 16,
    color: '#000',
    marginRight: 10,
  },
  
  searchButtonIcon: {
    padding: 10,
    backgroundColor: '#DDD',
    borderRadius: 8,
  },
  
  searchButton: {
    padding: 10,
  },
  pickerContainer: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  filterButton: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#AAA',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#FFF',
  },
  filterButtonText: {
    fontSize: 16,
    color: '#000',
  },
  gpsInput: {
    width: '90%',
    alignSelf: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#AAA',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#FFF',
    fontSize: 16,
    color: '#000',
  },
  entryCard: {
    backgroundColor: '#B9B5A7',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    width: '90%',
    alignSelf: 'center',
  },
  entryText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  viewButton: {
    backgroundColor: '#3E3E3E',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  viewButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AllPocketBookEntries;
