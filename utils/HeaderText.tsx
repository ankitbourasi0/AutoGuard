// src/components/HeaderText.tsx
import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface HeaderTextProps {
  title: string;
}

const HeaderText: React.FC<HeaderTextProps> = ({ title }) => {
  return <Text style={styles.headerText}>{title}</Text>;
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3E3E3E',
    textAlign: 'center',
    flex: 1,
  },
});

export default HeaderText;
