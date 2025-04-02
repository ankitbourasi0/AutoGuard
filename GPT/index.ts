// import create from 'zustand';
// import { persist } from 'zustand/middleware';
// import { Guard, Shift, PocketBook, Profile } from './types'; // Define your types

// interface AuthState {
//   guard: Guard | null;
//   token: string | null;
//   login: (username: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// interface GuardActivityState {
//   coordinates: { lat: number; long: number } | null;
//   checkGuardStatus: () => Promise<boolean>;
// }

// interface PocketBookState {
//   pocketBooks: PocketBook[];
//   addPocketBookEntry: (entry: PocketBook) => Promise<void>;
// }

// interface ShiftState {
//   shifts: Shift[];
//   currentShift: Shift | null;
//   startShift: (shiftId: number) => Promise<void>;
//   endShift: () => Promise<void>;
// }




// // Continue with PocketBookState, ShiftState, etc.

// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://your-api-url.com',
//   headers: { 'Content-Type': 'application/json' },
// });

// export const login = async (username: string, password: string) => {
//   try {
//     const response = await api.post('/login', { username, password });
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// export const getGuardActivities = async (token: string) => {
//   try {
//     const response = await api.get('/guard/activities', {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// // Add other APIs for shift, profile, etc.



// import * as FaceRecognition from 'expo-face-recognition';
// import { useGuardActivityStore } from './store';

// export const verifyGuardFace = async (capturedImage: string) => {
//   const result = await FaceRecognition.recognize(capturedImage, '/verify-face');
//   if (result.match) {
//     // Proceed to activity screen
//     navigate('GuardActivityScreen');
//   } else {
//     // Retry logic for up to 3 attempts, then 30s countdown
//   }
// };

// export const usePocketBookStore = create<PocketBookState>((set) => ({
//   pocketBooks: [],
//   addPocketBookEntry: async (entry) => {
//     try {
//       const response = await api.post('/pocketbook', entry);
//       set((state) => ({
//         pocketBooks: [...state.pocketBooks, response.data],
//       }));
//     } catch (error) {
//       handleApiError(error);
//     }
//   },
// }));

// export const useShiftStore = create<ShiftState>((set) => ({
//   shifts: [],
//   currentShift: null,
//   startShift: async (shiftId) => {
//     try {
//       const response = await api.post(`/shift/${shiftId}/start`);
//       set({ currentShift: response.data });
//     } catch (error) {
//       handleApiError(error);
//     }
//   },
//   endShift: async () => {
//     try {
//       await api.post('/shift/end');
//       set({ currentShift: null });
//     } catch (error) {
//       handleApiError(error);
//     }
//   },
// }));


// export const useProfileStore = create<ProfileState>((set) => ({
//   profile: null,
//   updateProfilePicture: async (imageUri) => {
//     try {
//       const formData = new FormData();
//       formData.append('profilePic', { uri: imageUri, name: 'profile.jpg', type: 'image/jpeg' });

//       const response = await api.post('/profile/upload', formData);
//       set({ profile: response.data });
//     } catch (error) {
//       handleApiError(error);
//     }
//   },
// }));


// export const getNotifications = async () => {
//   try {
//     const response = await api.get('/notifications');
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };
