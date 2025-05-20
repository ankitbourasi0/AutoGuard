import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../states';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { NavigationProps } from '../types/navigation';
import ScreenWrapper from '../components/ScreenWrapper';
import HeaderText from '../utils/HeaderText';

const API_URL = 'https://autoguardapi.leogroup.tech/api/PocketBook/fetch-business-by-staff';

const PocketBookInfoScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const user = useAuthStore((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [business, setBusiness] = useState<any>(null);

  useEffect(() => {
    if (!user?.staff_fk) return;
    fetchBusinessInfo();
  }, [user]);

  const fetchBusinessInfo = async () => {
    try {
      const response = await axios.post(API_URL, {
        staffFk: user?.staff_fk,
        businessFk: user?.business_fk,
      });
      setBusiness(response.data);
    } catch (error) {
      console.error('❌ Failed to fetch business info:', error);
      Alert.alert('Error', 'Failed to fetch business information');
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    navigation.navigate('NewPocketBookEntry');
  };

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Entry')}>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <HeaderText title="Pocket Book Information" />
      </View>

      <ScrollView contentContainerStyle={styles.wrapper}>
        <View style={styles.form}>
          <Text style={styles.formTitle}>Fill in the following pocket book information:</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
          ) : (
            <>
              <Text style={styles.label}>Name</Text>
              <TextInput style={styles.input} value={business?.name || ''} editable={false} />

              <Text style={styles.label}>ID No</Text>
              <TextInput style={styles.input} value={business?.identification_number || ''} editable={false} />

              <Text style={styles.label}>Company No</Text>
              <TextInput style={styles.input} value={business?.registration_number || ''} editable={false} />

              <Text style={styles.label}>PSIRA</Text>
              <TextInput
                style={styles.input}
                value={business?.psira_documentation_file_path ? 'Available' : ''}
                editable={false}
              />

              <Text style={styles.label}>Branch</Text>
              <TextInput style={styles.input} value={business?.city || ''} editable={false} />

              <Text style={styles.label}>Region</Text>
              <TextInput style={styles.input} value={business?.province || ''} editable={false} />

              <TouchableOpacity style={styles.button} onPress={handleContinue}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default PocketBookInfoScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#e5e5e5',
  },
  wrapper: {
    paddingBottom: 50,
    backgroundColor: '#e5e5e5',
    flexGrow: 1,
  },
  form: {
    backgroundColor: '#B9B5A7',
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
  },
  formTitle: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#222',
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
    fontSize: 14,
  },
  button: {
    backgroundColor: '#3E3E3E',
    marginTop: 30,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
