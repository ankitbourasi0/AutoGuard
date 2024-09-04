// src/components/SearchField.tsx

import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SearchFieldProps {
  placeholder?: string;
  onSearchPress: () => void;
  style?: object;
}

const SearchField: React.FC<SearchFieldProps> = ({ placeholder = "Search...", onSearchPress, style }) => {
  return (
    <View style={[styles.searchContainer, style]}>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor="#AAA"
      />
      <TouchableOpacity style={styles.searchButton} onPress={onSearchPress}>
        <Icon name="search-outline" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#AAA',
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: '#000',
  },
  searchButton: {
    padding: 10,
  },
});

export default SearchField;
