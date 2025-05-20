// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItem,
// } from "@react-navigation/drawer";
// import {
//   CommonActions,
//   NavigationContainer,
//   NavigationProp,
//   useNavigation,
// } from "@react-navigation/native";
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import {
//   Alert,
//   Image,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// import Icon from "react-native-vector-icons/FontAwesome5";
// import { RootStackParamList } from "./types/navigation";
// // import MyLeaveScreen from './screens/MyLeaveScreen';
// // import ShiftScheduleScreen from './screens/ShiftScheduleScreen.tsx';
// // import NewPocketBookEntry from './screens/NewPocketBookEntry';
// // import ShiftStartScreen from './screens/ShiftStartScreen.tsx';
// import { MyProfileScreen, PaySlipsScreen, Notifications, SOS, GuardActivityScreen, EntryScreen, AllPocketBookEntries, ObservationBookMain, AllObservationBookEntries , ObservationBookEntry,CrimeSceneMain, CrimeSceneInformation, NewCrimeSceneBookEntryScreen,PocketBookInfoScreen, NewVehicleInspection, VehicleDetails, ViewMenuScreen, MyLeaveScreen, ApplyForLeaveScreen, LoginScreen, HomeScreen, ShiftList, PayslipsScreen, PocketBookMainScreen, OBBookInformationScreen, AllCrimeSceneBookEntriesScreen, VehicleInspectionScreen, InspectionHistoryScreen } from './screens';

// import { Button } from "react-native";
// import { useAuthStore } from "./states/index";
// import { ActivityIndicator } from "react-native-paper";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import CameraModule from "./utils/CameraModule";
// import NewPocketBookEntry from "./screens/PocketBookEntry";

// import * as Location from 'expo-location';



// // import ShiftStartScreen from './screens/ShiftStartScreen';

// const Drawer = createDrawerNavigator<RootStackParamList>();

// type DrawerNavigationProp = NavigationProp<RootStackParamList>;
// function CustomDrawerContent(props: any) {
//   const navigation = useNavigation<DrawerNavigationProp>();
//   const { user,logout } = useAuthStore();
//   const handleLogout = () => {
//     Alert.alert(
//       "Logout",
//       "Are you sure you want to log out?",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Logout",
//           onPress: async () => {
//             logout();  // Clear token and reset Axios headers
//             await AsyncStorage.removeItem('authToken');

//             navigation.dispatch(
//               CommonActions.reset({
//                 index: 0,
//                 routes: [{ name: 'Login' }],
//               })
//             );
//           }
//         }
//       ]
//     );
//   };
//   return (
//     <DrawerContentScrollView {...props}>
//       <View style={styles.profileSection}>
//         <Image
//           source={{
//             uri: user?.facial_recognition_image,
//           }}
//           style={styles.profileImage}
//         />
//         <Text style={styles.profileName}>{user?.name+ " " +user?.surname || "No user" }</Text>
//       </View>
//       <DrawerItem
//         label="Home"
//         icon={() => <Icon name="home" size={20} color="#FFF" />}
//         onPress={() => props.navigation.navigate("Home")}
//         labelStyle={styles.drawerLabel}
//       />
//       <DrawerItem
//         label="View Shifts"
//         icon={() => <Icon name="calendar-check" size={20} color="#FFF" />}
//         onPress={() => props.navigation.navigate("Shifts")}
//         labelStyle={styles.drawerLabel}
//       />
//       <DrawerItem
//         label="Leave Application"
//         icon={() => <Icon name="file-alt" size={20} color="#FFF" />}
//         onPress={() => props.navigation.navigate("ApplyForLeave")}
//         labelStyle={styles.drawerLabel}
//       />
//       <DrawerItem
//         label="Payslips"
//         icon={() => <Icon name="file-invoice-dollar" size={20} color="#FFF" />}
//         onPress={() => props.navigation.navigate("Payslips")}
//         labelStyle={styles.drawerLabel}
//       />
//       <DrawerItem
//         label="My Profile"
//         icon={() => <Icon name="user-circle" size={20} color="#FFF" />}
//         onPress={() => props.navigation.navigate("MyProfile")}
//         labelStyle={styles.drawerLabel}
//       />
//       <View style={styles.logoutSection}>
//         <TouchableOpacity
//           style={styles.logoutButton}
//           onPress={handleLogout}
//         >
//           <Icon name="sign-out-alt" size={20} color="#FFF" />
//           <Text style={styles.logoutText}>Logout</Text>
//         </TouchableOpacity>
//       </View>
//     </DrawerContentScrollView>
//   );
// }

// function App() {

//   const { isLoggedIn, initializeAuth, token } = useAuthStore();
//   const [loading, setLoading] = React.useState(true);
//   const verified = true
//   useEffect(() => {
//     const initApp = async () => {
//       await initializeAuth();  // This will set `isLoggedIn` based on token presence

//       try {
//         const { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== 'granted') {
//           Alert.alert(
//             'Permission Denied',
//             'Location permission is required to tag entries with GPS coordinates.'
//           );
//         } else {
//           console.log('✅ Location permission granted');
//         }
//       } catch (err) {
//         console.error('📍 Location permission error:', err);
//       }

//       setLoading(false);
//     };
//     initApp();
//   }, []);


//   if (loading) {
//     // Show loading indicator while checking auth status
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }


//   return (
//     <NavigationContainer>
//       <SafeAreaView style={{ flex: 1 }}>

//         <Drawer.Navigator
//           drawerContent={(props) => <CustomDrawerContent {...props} />}
//           screenOptions={{
//             drawerStyle: {
//               backgroundColor: '#3E3E3E',
//               width: 250,
//             },
//             headerShown: false,
//           }}
//         >

//           {isLoggedIn && token ? (
//             <>
//               {/* Protected Routes: User is logged in */}
//               <Drawer.Screen name="Home" component={HomeScreen} />
//               <Drawer.Screen name="ShiftScheduleScreen" component={ShiftList} />
//               {/* <Drawer.Screen name="ShiftStartScreen" component={ShiftStartScreen} /> */}

//               <Drawer.Screen name="Notifications" component={Notifications} />
//               <Drawer.Screen name="SOS" component={SOS} />
//               <Drawer.Screen name="Payslips" component={PayslipsScreen} />
//               <Drawer.Screen name="MyProfile" component={MyProfileScreen} />
//               <Drawer.Screen name="CameraModule" component={CameraModule} />

//               <Drawer.Screen name="GuardActivity" component={GuardActivityScreen} />
//               <Drawer.Screen name="Entry" component={EntryScreen} />
//               <Drawer.Screen name="PocketBookMain" component={PocketBookMainScreen} />
//               <Drawer.Screen name="PocketBookInfoScreen" component={PocketBookInfoScreen} />
              
              
//                <Drawer.Screen name="NewPocketBookEntry" component={NewPocketBookEntry} />
//               <Drawer.Screen name="AllPocketBookEntries" component={AllPocketBookEntries} />
//               {/* Observation Book  */}
//               <Drawer.Screen name="ObservationBookMain" component={ObservationBookMain} />
//               <Drawer.Screen name="ObBookInformation" component={OBBookInformationScreen} />
//               <Drawer.Screen name="AllObservationBooksEntries" component={AllObservationBookEntries} />
//               <Drawer.Screen name="ObservationBookEntry" component={ObservationBookEntry} />

              
              
//               <Drawer.Screen name="CrimeSceneMain" component={CrimeSceneMain} />
//               <Drawer.Screen name="CrimeSceneInformation" component={CrimeSceneInformation} />
//               <Drawer.Screen name="NewCrimeSceneBookEntry" component={NewCrimeSceneBookEntryScreen} />


//               {/* <Drawer.Screen name="CommonEntryForm" component={CommonEntryForm} /> */}
//               <Drawer.Screen name="AllCrimeSceneBookEntries" component={AllCrimeSceneBookEntriesScreen} />
//               <Drawer.Screen name="VehicleInspection" component={VehicleInspectionScreen} />
//               <Drawer.Screen name="NewVehicleInspection" component={NewVehicleInspection} />
//               <Drawer.Screen name="InspectionHistory" component={InspectionHistoryScreen} />
//               <Drawer.Screen name="VehicleDetails" component={VehicleDetails} />
//               <Drawer.Screen name="ViewMenu" component={ViewMenuScreen} />
//               <Drawer.Screen name="MyLeaveScreen" component={MyLeaveScreen} />
//               <Drawer.Screen name="ApplyForLeave" component={ApplyForLeaveScreen} />


//             </>) : (
//             // Public Route: Only Login is available if not authenticated
//             <Drawer.Screen name="Login" component={LoginScreen} />
//           )}


//         </Drawer.Navigator>
//       </SafeAreaView>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({



//   profileSection: {
//     padding: 20,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   profileImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//   },
//   profileName: {
//     marginLeft: 15,
//     color: "#FFF",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   drawerLabel: {
//     color: "#FFF",
//     fontSize: 15,
//   },
//   logoutSection: {
//     marginTop: "auto",
//     padding: 20,
//   },
//   logoutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   logoutText: {
//     marginLeft: 10,
//     color: "#FFF",
//     fontSize: 15,
//   },
// });

// export default App;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import PatrolMap from './components/PatrolMap';

export default function App() {
  return (
    <View style={styles.container}>
      <PatrolMap />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
