import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../types/navigation';
import ScreenWrapper from '../components/ScreenWrapper';

export default function SOS({  }) {
    const navigation = useNavigation<NavigationProps>()
  return (
   <ScreenWrapper>
     <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="arrow-back" size={24}  />
        </TouchableOpacity>
        <Text style={styles.headerText}>SOS</Text>
        <TouchableOpacity>
          <Ionicons name="notifications" size={24} color="gold" />
        </TouchableOpacity>
      </View>

     

      <View style={styles.buttonContainer}>
        <SOSButton title="Back - Up" subtitle="Request Security Back - Up" />
        <SOSButton title="SAPS" subtitle="Request Police Assistance" />
        <SOSButton title="Medical" subtitle="Request Medical Assistance" />
        <SOSButton title="Fire" subtitle="Request Firefighter Assistance" />
      </View>

      
    </View>
   </ScreenWrapper>
  );
}

const SOSButton = ({ title, subtitle }:{title: string, subtitle:string}) => {
  return (
    <TouchableOpacity style={styles.sosButtonContainer}>
      <Text style={styles.sosButtonText}>{title}</Text>
      <Text style={styles.sosButtonSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  sosButtonContainer: {
    backgroundColor: '#343434',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
  },
  sosButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sosButtonSubtitle: {
    color: 'gray',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#343434',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerButtonText: {
    color: 'white',
    fontSize: 16,
  },
  sosButton: {
    backgroundColor: '#d9534f',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
//   sosButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
});
