import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '../components/ScreenWrapper';
import { NavigationProps, RootStackParamList } from '../types/navigation';
import TextButton from '../utils/TextButton';
import SearchField from '../utils/SearchField';



const ViewMenuScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>View Menu</Text>
      </View>
      <View style={styles.content}>
        <SearchField onSearchPress={() => console.log('Search pressed')} />
        <TextButton
          title="View Shifts"
          description="View all upcoming shifts"
          onPress={() => navigation.navigate('ShiftScheduleScreen')}
        />
        <TextButton
          title="Apply For Leave"
          description="Start your shift from a central point"
          onPress={() => navigation.navigate('MyLeaveScreen', {})}  // Pass an empty object to satisfy the type
        />
        <TextButton
          title="View Payslips"
          description="Make an OB, CS, or pocketbook entry"
          onPress={() => navigation.navigate('Payslips')}
        />
        <TextButton
          title="View Profile"
          description="New inspection or view inspection history"
          onPress={() => navigation.navigate('MyProfile')}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ViewMenuScreen;
