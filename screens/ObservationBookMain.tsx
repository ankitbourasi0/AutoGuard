import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper'; // Assuming you have this component
import { NavigationProps, RootStackParamList } from '../types/navigation'; // Adjust the import based on your setup
import CommonBook from '../components/CommonBook';
import { useRoute } from '@react-navigation/native';

import BigTextButton from '../utils/BigTextButton';
import HeaderText from '../utils/HeaderText';
import { pocketBookApi } from '../services/pocketbook';

const ObservationBookMain: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute()
  console.log(route.name);
 
  
  return (
   
    <ScreenWrapper>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate("Entry")}>
        <Icon name="arrow-back-outline" size={24} color="#000" />
      </TouchableOpacity>
      <HeaderText title={"Observation Book"} />
    </View>
    <View style={styles.container}>
      <BigTextButton
        title={"New Entry"}
        description={"Make new Observation Book entry"}
        onPress={() => navigation.navigate("ObBookInformation")}
      />
      <BigTextButton
        title={"All Entries"}
        description={"View All your Observation Book entries"}
        onPress={() => navigation.navigate("AllObservationBooksEntries")}
      />
    </View>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default ObservationBookMain;
