// src/components/TextButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface TextButtonProps {
  title: string;
  description: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
}

const BigTextButton: React.FC<TextButtonProps> = ({ title, description, onPress, buttonStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={styles.buttonTitle}>{title}</Text>
      <Text style={styles.buttonDescription}>{description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3E3E3E',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  buttonDescription: {
    fontSize: 14,
    color: '#CFCFCF',
    marginTop: 5,
  },
});

export default BigTextButton;
