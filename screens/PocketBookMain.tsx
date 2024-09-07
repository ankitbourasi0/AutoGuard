import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper'; // Assuming you have this component
import { NavigationProps, RootStackParamList } from '../types/navigation'; // Adjust the import based on your setup
import CommonBook from '../components/CommonBook';
import { useRoute } from '@react-navigation/native';


const PocketBookMainScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute()
  console.log(route.name);
  return (
   
      <CommonBook
    
      headerTitle='Pocket Book'
        newEntryTitle='New Entry'
        newEntryDescription='Make new Pocket Book entry'
        newEntryNavigation={{ name: "NewPocketBookEntry" }}
        allEntryTitle='All Entries'
        allEntryDescription='View all your Pocket Book entries'
        allEntriesNavigation={{ name: "AllPocketBookEntries" }}
      />
  
  
  );
};



export default PocketBookMainScreen;
