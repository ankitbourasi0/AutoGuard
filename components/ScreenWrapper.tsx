// src/components/ScreenWrapper.tsx

import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import AppBar from './AppBar';
import BottomBar from './BottomBar';

interface ScreenWrapperProps {
  children: React.ReactNode;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <AppBar />
      <View style={styles.content}>
        {children}
      </View>
      <BottomBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    padding: 10,
  },
});

export default ScreenWrapper;
