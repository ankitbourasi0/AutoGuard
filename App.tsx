import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer, NavigationProp, useNavigation,CommonActions } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';

import PayslipsScreen from './screens/PaySlipsScreen';
import MyProfileScreen from './screens/MyProfileScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { RootStackParamList } from './types/navigation';
import EntryScreen from './screens/EntryScreen';
import GuardActivityScreen from './screens/GuardActivityScreen';
import ViewMenuScreen from './screens/ViewMenuScreen';
import ApplyForLeaveScreen from './screens/ApplyForLeaveScreen';
// import MyLeaveScreen from './screens/MyLeaveScreen';
import LoginScreen from './screens/LoginScreen';
// import ShiftScheduleScreen from './screens/ShiftScheduleScreen.tsx';
import VehicleInspectionScreen from './screens/VehicleInspection';
import VehicleDetails from './screens/VehicleDetails';
import PocketBookMainScreen from './screens/PocketBookMain';
// import NewPocketBookEntry from './screens/NewPocketBookEntry';
import AllPocketBookEntries from './screens/AllPocketBookEntries';
import PocketBookEntry from './screens/PocketBookEntry';
import ObservationBookMain from './screens/ObservationBookMain';
import OBBookInformationScreen from './screens/ObBookInformation';
import CrimeSceneMain from './screens/CrimeSceneMain';
import CrimeSceneInformation from './screens/CrimeSceneInformation';
import CommonEntryForm from './components/CommonEntryForm';
import NewVehicleInspection from './screens/NewVehicleInspection';
import SOS from './screens/SOS';
import Notifications from './components/Notifications';
// import ShiftStartScreen from './screens/ShiftStartScreen.tsx';
import  useAuthStore  from './states/authStore';
import NewPocketBookEntry from './screens/PocketBookEntry';
import NewCrimeSceneBookEntryScreen from './screens/NewCrimeSceneBookEntryScreen';
import AllCrimeSceneBookEntriesScreen from './screens/AllCrimeSceneBookEntries';
import InspectionHistoryScreen from './screens/InspectionHistory';
import MyLeaveScreen from './screens/MyLeaveScreen';
import ShiftList from './screens/ShiftScheduleScreen';
// import ShiftStartScreen from './screens/ShiftStartScreen';

const Drawer = createDrawerNavigator<RootStackParamList>(); 

type DrawerNavigationProp = NavigationProp<RootStackParamList>
function CustomDrawerContent(props: any) {
  const navigation = useNavigation<DrawerNavigationProp>();
  const { logout } = useAuthStore();
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: () => {
            logout();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              })
            );
          }
        }
      ]
    );
  };
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileSection}>
        <Image source={{ uri: 'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?w=740&t=st=1723659776~exp=1723660376~hmac=9b7dd0ddbdc9fc620cda0d3bca729028327b67feca5692ae68bec71779441878' }} style={styles.profileImage} />
        <Text style={styles.profileName}>Bob Jones</Text>
      </View>
      <DrawerItem
        label="Home"
        icon={() => <Icon name="home" size={20} color="#FFF" />}
        onPress={() => props.navigation.navigate('Home')}
        labelStyle={styles.drawerLabel}
      />
      <DrawerItem
        label="View Shifts"
        icon={() => <Icon name="calendar-check" size={20} color="#FFF" />}
        onPress={() => props.navigation.navigate('Shifts')}
        labelStyle={styles.drawerLabel}
      />
      <DrawerItem
        label="Leave Application"
        icon={() => <Icon name="file-alt" size={20} color="#FFF" />}
        onPress={() => props.navigation.navigate('ApplyForLeave')}
        labelStyle={styles.drawerLabel}
      />
      <DrawerItem
        label="Payslips"
        icon={() => <Icon name="file-invoice-dollar" size={20} color="#FFF" />}
        onPress={() => props.navigation.navigate('Payslips')}
        labelStyle={styles.drawerLabel}
      />
      <DrawerItem
        label="My Profile"
        icon={() => <Icon name="user-circle" size={20} color="#FFF" />}
        onPress={() => props.navigation.navigate('MyProfile')}
        labelStyle={styles.drawerLabel}
      />
      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="sign-out-alt" size={20} color="#FFF" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            drawerStyle: {
              backgroundColor: '#3E3E3E',
              width: 250,
            },
            headerShown: false,
          }}
        >
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="ShiftScheduleScreen" component={ShiftList} /> 
          {/* <Drawer.Screen name="ShiftStartScreen" component={ShiftStartScreen} />  */}

          <Drawer.Screen name="Notifications" component={Notifications} />
          <Drawer.Screen name="SOS" component={SOS} />
          <Drawer.Screen name="Payslips" component={PayslipsScreen} />
          <Drawer.Screen name="MyProfile" component={MyProfileScreen} />
          <Drawer.Screen name="GuardActivity" component={GuardActivityScreen} />
          <Drawer.Screen name="Entry" component={EntryScreen} />
          <Drawer.Screen name="PocketBookMain" component={PocketBookMainScreen} />
          <Drawer.Screen name="NewPocketBookEntry" component={NewPocketBookEntry} />
          <Drawer.Screen name="AllPocketBookEntries" component={AllPocketBookEntries} />
          <Drawer.Screen name="PocketBookEntry" component={PocketBookEntry} />
          <Drawer.Screen name="ObservationBookMain" component={ObservationBookMain} />
          <Drawer.Screen name="ObBookInformation" component={OBBookInformationScreen} />
          <Drawer.Screen name="CrimeSceneMain" component={CrimeSceneMain} />
          <Drawer.Screen name="CrimeSceneInformation" component={CrimeSceneInformation} />
          <Drawer.Screen name="NewCrimeSceneBookEntry" component={NewCrimeSceneBookEntryScreen} />

          
          {/* <Drawer.Screen name="CommonEntryForm" component={CommonEntryForm} /> */}
          <Drawer.Screen name="AllCrimeSceneBookEntries" component={AllCrimeSceneBookEntriesScreen} />
          <Drawer.Screen name="VehicleInspection" component={VehicleInspectionScreen} />
          <Drawer.Screen name="NewVehicleInspection" component={NewVehicleInspection} />
          <Drawer.Screen name="InspectionHistory" component={InspectionHistoryScreen} />
          <Drawer.Screen name="VehicleDetails" component={VehicleDetails} />
          <Drawer.Screen name="ViewMenu" component={ViewMenuScreen} />
          <Drawer.Screen name="MyLeaveScreen" component={MyLeaveScreen} />
          <Drawer.Screen name="ApplyForLeave" component={ApplyForLeaveScreen} />
      
        </Drawer.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileName: {
    marginLeft: 15,
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  drawerLabel: {
    color: '#FFF',
    fontSize: 15,
  },
  logoutSection: {
    marginTop: 'auto',
    padding: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    marginLeft: 10,
    color: '#FFF',
    fontSize: 15,
  },
});

export default App;
