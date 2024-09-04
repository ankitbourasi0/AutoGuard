// src/components/SectionCard.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, children }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#3E3E3E',
    borderRadius: 8,
    padding: 20,
    marginVertical: 10,
    alignItems: 'center', // Center all content
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  content: {
    width: '100%', // Make content take full width
  },
});

export default SectionCard;
