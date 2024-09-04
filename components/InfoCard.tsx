// src/components/InfoCard.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface InfoCardProps {
  label: string;
  value: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ label, value }) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#FFF',
  },
  value: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default InfoCard;
