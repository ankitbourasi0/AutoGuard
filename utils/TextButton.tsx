// src/components/TextButton.tsx

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface TextButtonProps {
  title: string;
  description: string;
  onPress: () => void;
  style?: object;
}

const TextButton: React.FC<TextButtonProps> = ({ title, description, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <View style={styles.textContainer}>
        <Text style={ styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#3E3E3E',
    padding: 15,
    marginVertical: 10,
    width: '90%',
    borderRadius: 8,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  description: {
    fontSize: 12,
    color: '#CFCFCF',
  },
});

export default TextButton;
