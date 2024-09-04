// //Use for ---
// //1. Pocket Book Main
// //2. Observation book MAIN
// //3. Crimse Scene Book MAIN

// //Screens
// //New Entry Screen
// //All Entries Screenimport React from 'react';
// import { View, TouchableOpacity, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import ScreenWrapper from '../components/ScreenWrapper';
// import BigTextButton from '../common/BigTextButton';
// import HeaderText from '../common/HeaderText';
// import { NavigationProps, RootStackParamList } from '../types/navigation';
// type NavigationScreenParams = {
//     [K in keyof RootStackParamList]: {
//       name: K;
//       params?: RootStackParamList[K];
//     };
//   };


//   interface Props {
//     headerTitle: string;
//     newEntryTitle: string;
//     newEntryDescription: string;
//     allEntryTitle: string;
//     allEntryDescription: string;
//     newEntryNavigation: NavigationScreenParams[keyof RootStackParamList];
//     allEntriesNavigation: NavigationScreenParams[keyof RootStackParamList];
//   }
// const CommonBook: React.FC<Props> = ({
//   headerTitle,
//   newEntryTitle,
//   newEntryDescription,
//   allEntryTitle,
//   allEntryDescription,
//   newEntryNavigation,
//   allEntriesNavigation,
// }) => {
//   const navigation = useNavigation<NavigationProps>();

//   return (
//     <ScreenWrapper>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back-outline" size={24} color="#000" />
//         </TouchableOpacity>
//         <HeaderText title={headerTitle} />
//       </View>

//       <View style={styles.container}>
//         <BigTextButton
//           title={newEntryTitle}
//           description={newEntryDescription}
//           onPress={() =>navigation.navigate(newEntryNavigation.name, newEntryNavigation.params)}
//         />
//         <BigTextButton
//           title={allEntryTitle}
//           description={allEntryDescription}
//           onPress={() => navigation.navigate(allEntriesNavigation.name, allEntriesNavigation.params)}
//         />
//       </View>
//     </ScreenWrapper>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 10,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default CommonBook;
