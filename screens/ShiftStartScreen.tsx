// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { useNavigation, NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import { NavigationProps, RootStackParamList } from '../types/navigation';

// import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


// type ShiftDetailsProps = {
//   route: RouteProp<RootStackParamList, 'ShiftStartScreen'>; // Define the type for the route prop
// };
// const ShiftStartScreen: React.FC<ShiftDetailsProps> = ({
//   shiftDate,
//   shiftName,
//   location,
//   timeRange,
//   weapon,
//   vehicle,
//   { route 
// }) => {
//   const navigation = useNavigation<NavigationProps>();
//   const { inspectionData } = route.params;
//   const [currentStep, setCurrentStep] = useState<'weapon' | 'vehicle' | 'start'>('weapon');

//   const handleStepCompletion = (step: 'weapon' | 'vehicle' | 'start') => {
//     if (step === 'weapon') {
//       setCurrentStep('vehicle');
//       navigation.navigate('WeaponsRegister');
//     } else if (step === 'vehicle') {
//       setCurrentStep('start');
//       navigation.navigate('VehicleInspection');
//     } else {
//       // Handle shift start
//       console.log('Shift started');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.navigate("ShiftScheduleScreen")}>
//           <Ionicons name="arrow-back" size={24} color="white" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Shift - {shiftDate}</Text>
//       </View>

//       <View style={styles.shiftInfo}>
//         <Text style={styles.shiftName}>{shiftName}</Text>
//         <View style={styles.infoRow}>
//           <Ionicons name="location" size={16} color="white" />
//           <Text style={styles.infoText}>{location}</Text>
//         </View>
//         <View style={styles.infoRow}>
//           <Ionicons name="time" size={16} color="white" />
//           <Text style={styles.infoText}>{timeRange}</Text>
//         </View>
//         <View style={styles.infoRow}>
//         <FontAwesome6 name="gun" size={16} color="black" />
//           <Text style={styles.infoText}>{weapon}</Text>
//         </View>
//         <View style={styles.infoRow}>
//           <Ionicons name="car" size={16} color="white" />
//           <Text style={styles.infoText}>{vehicle}</Text>
//         </View>
//       </View>

//       <View style={styles.timeline}>
//         <TouchableOpacity 
//           style={[styles.timelineStep, currentStep === 'weapon' ? styles.activeStep : {}]}
//           onPress={() => handleStepCompletion('weapon')}
//         >
//           <Text style={styles.stepText}>Request Weapon</Text>
//         </TouchableOpacity>
//         <TouchableOpacity 
//           style={[styles.timelineStep, currentStep === 'vehicle' ? styles.activeStep : {}]}
//           onPress={() => handleStepCompletion('vehicle')}
//         >
//           <Text style={styles.stepText}>Vehicle Inspection</Text>
//         </TouchableOpacity>
//         <TouchableOpacity 
//           style={[styles.timelineStep, currentStep === 'start' ? styles.activeStep : {}]}
//           onPress={() => handleStepCompletion('start')}
//         >
//           <Text style={styles.stepText}>Start Shift</Text>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity style={styles.sosButton}>
//         <Text style={styles.sosText}>SOS</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#2c2c2c',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#1c1c1c',
//   },
//   headerTitle: {
//     color: 'white',
//     fontSize: 18,
//     marginLeft: 16,
//   },
//   shiftInfo: {
//     backgroundColor: '#3c3c3c',
//     padding: 16,
//     margin: 16,
//     borderRadius: 8,
//   },
//   shiftName: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   infoText: {
//     color: 'white',
//     marginLeft: 8,
//   },
//   timeline: {
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     padding: 16,
//   },
//   timelineStep: {
//     backgroundColor: '#4c4c4c',
//     padding: 16,
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   activeStep: {
//     backgroundColor: '#007AFF',
//   },
//   stepText: {
//     color: 'white',
//     textAlign: 'center',
//   },
//   sosButton: {
//     position: 'absolute',
//     bottom: 32,
//     right: 32,
//     backgroundColor: 'red',
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   sosText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default ShiftStartScreen;