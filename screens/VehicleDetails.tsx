import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '../components/ScreenWrapper';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { NavigationProps, RootStackParamList } from '../types/navigation';

type VehicleInspectionDetailsProps = {
  route: RouteProp<RootStackParamList, 'VehicleDetails'>; // Define the type for the route prop
};

const VehicleInspectionDetails: React.FC<VehicleInspectionDetailsProps> = ({ route }) => {
  const navigation = useNavigation<NavigationProps>();
  const { inspectionData } = route.params; // Get the passed inspection data

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("VehicleInspection")}>
          <Icon name="arrow-back-outline" size={24} color="#3E3E3E" />
        </TouchableOpacity>
        <Text style={styles.title}>Vehicle Inspection Details</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Inspection Date</Text>
        <Text style={styles.value}>{inspectionData.inspectionDate}</Text>

        <Text style={styles.label}>Model Name</Text>
        <Text style={styles.value}>{inspectionData.modelName}</Text>

        <Text style={styles.label}>Registration Number</Text>
        <Text style={styles.value}>{inspectionData.regNumber}</Text>

        {/* Add more fields based on the inspection data */}
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E3E3E',
    textAlign: 'center',
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  value: {
    fontSize: 16,
    color: '#3E3E3E',
    marginBottom: 20,
  },
});

export default VehicleInspectionDetails;
