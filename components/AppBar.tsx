import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type RootDrawerParamList = {
  Home: undefined;
  Shifts: undefined;
  Notifications: undefined;
  Payslips: undefined;
  MyProfile: undefined;
};

type AppBarNavigationProp = DrawerNavigationProp<RootDrawerParamList>;

const AppBar: React.FC = () => {
  const navigation = useNavigation<AppBarNavigationProp>();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
        <Icon name="menu-outline" size={24} color="#FFF" />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Icon name="shield-checkmark-outline" size={40} color="#FFF" />
      </View>
      <TouchableOpacity style={styles.notificationButton} onPress={() => navigation.navigate("Notifications")}>
        <Icon name="notifications-outline" size={24} color="#FFF" />
      </TouchableOpacity>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#3E3E3E',
  },
  menuButton: {
    width: 24,
    height: 24,
  },
  notificationButton: {
    width: 24,
    height: 24,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default AppBar;

