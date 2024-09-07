// src/components/BottomBar.tsx

import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, TouchableOpacity,Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Example with Material Icons
import { NavigationProps, RootStackParamList } from '../types/navigation';


const BottomBar: React.FC = () => {
    const navigation = useNavigation<NavigationProps>();

  return (
    
      <View style={styles.footer}>
      <TouchableOpacity style={styles.footerButton} onPress={()=> navigation.navigate("ShiftScheduleScreen")}>
        <Text style={styles.footerButtonText}>Shift</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sosButton} onPress={()=> navigation.navigate("SOS")}>
        <Text style={styles.sosButtonText}>SOS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Entry')}>
        <Text style={styles.footerButtonText}>Entry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#3E3E3E',
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
  sosButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerButtonText: {
    color: 'white',
    fontSize: 16,
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },sosButton: {
    backgroundColor: '#d9534f',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
});

export default BottomBar;
