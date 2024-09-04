// src/components/IconButton.tsx

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface IconButtonProps {
  iconName: string;
  title: string;
  description: string;
  onPress: () => void;
  style?: object;
}

const IconButton: React.FC<IconButtonProps> = ({ iconName, title, description, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Icon name={iconName} size={40} color="#FFF" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3E3E3E',
    padding: 15,
    marginVertical: 10,
    width: '90%',
    borderRadius: 8,
  },
  textContainer: {
    marginLeft: 10,
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

export default IconButton;
