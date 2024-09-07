// src/screens/HomeScreen.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { NavigationProps, RootStackParamList } from '../types/navigation';
import ScreenWrapper from '../components/ScreenWrapper';
import IconButton from '../common/IconButton';



const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <ScreenWrapper>
      <View style={styles.content}>
        <IconButton
          iconName="clipboard-list"
          title="Guard Activities"
          description="Shift, shift entry and vehicle inspection"
          onPress={() => navigation.navigate('GuardActivity')}
        />
        <IconButton
          iconName="user-shield"
          title="View Menu"
          description="Leave application, shifts, profile and payslips"
          onPress={() => navigation.navigate('ViewMenu')}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
