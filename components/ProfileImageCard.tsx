// src/components/ProfileImageCard.tsx

import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ProfileImageCardProps {
  imageUri: string;
  onEditPress: () => void;
}

const ProfileImageCard: React.FC<ProfileImageCardProps> = ({ imageUri, onEditPress }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6E6E6E',
    borderRadius: 8,
    padding: 20,
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editButton: {
    backgroundColor: '#3E3E3E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default ProfileImageCard;
