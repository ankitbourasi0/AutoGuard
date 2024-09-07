// CommonBook.tsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from './ScreenWrapper';
import BigTextButton from '../common/BigTextButton';
import HeaderText from '../common/HeaderText';
import { NavigationProps } from '../types/navigation';

interface CommonBookProps {
  headerTitle: string;
  newEntryTitle: string;
  newEntryDescription: string;
  newEntryNavigation: { name: string };
  allEntryTitle: string;
  allEntryDescription: string;
  allEntriesNavigation: { name: string };
}

const CommonBook: React.FC<CommonBookProps> = ({
  headerTitle,
  newEntryTitle,
  newEntryDescription,
  newEntryNavigation,
  allEntryTitle,
  allEntryDescription,
  allEntriesNavigation
}) => {
  const navigation = useNavigation<NavigationProps>();

  const navigateToScreen = (screenName: string) => {
    navigation.navigate(screenName as any);
  };


  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Entry")}>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <HeaderText title={headerTitle} />
      </View>
      <View style={styles.container}>
        <BigTextButton
          title={newEntryTitle}
          description={newEntryDescription}
          onPress={() => navigateToScreen(newEntryNavigation.name)}
        />
        <BigTextButton
          title={allEntryTitle}
          description={allEntryDescription}
          onPress={() => navigateToScreen(allEntriesNavigation.name)}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CommonBook;