// import { useEffect, useState } from 'react';
// import * as Location from 'expo-location';
// import NetInfo from '@react-native-community/netinfo';

// const GuardActivityScreen = () => {
//   const [location, setLocation] = useState(null);
//   const [hasPermission, setHasPermission] = useState(false);

//   useEffect(() => {
//     checkInternetAndLocation();
//   }, []);
// // 
//   const checkInternetAndLocation = async () => {
//     try {
//       const netInfo = await NetInfo.fetch();
//       if (!netInfo.isConnected) {
//         throw new Error('No internet connection');
//       }

//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setHasPermission(false);
//         return;
//       }

//       setHasPermission(true);
//       const location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//       // Check if location matches office
//     } catch (error) {
//       console.error('Error checking guard activity', error);
//     }
//   };
// };
