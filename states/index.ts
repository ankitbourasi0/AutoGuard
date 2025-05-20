// stores/index.ts

import {create} from 'zustand';

import { User, Coordinates, PocketBookEntry, Shift, Weapon, WeaponRequest, GuardDocument, Notification, PocketBookComment } from '../types';
import api from '../services';
import { handleApiError } from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthStore {
  user: User | null;
  isLoggedIn: boolean;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  requestPasswordReset: (username: string) => Promise<void>;
  initializeAuth:()=>Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoggedIn: false,
  token: null,
  login: async (username, password) => {
    try {
      const {user,token} = await api.login(username, password);
      if(!user){
        console.log('User not found');
      }

      //generate token if user found with jwt
      set({ user, isLoggedIn: true, token });

    } catch (error) {
      handleApiError('Login failed:', error);
    } 
  },
  logout: async () => {
    try {
      await api.logout();
      set({ user: null, isLoggedIn: false, token: null });
    } catch (error) {
       handleApiError('Logout failed:', error); 
      
    }
  },
  requestPasswordReset: async (email) => {
    try {
      const otp = await api.requestPasswordReset(email);
      console.log(otp)
    } catch (error) {
    handleApiError('Password reset request failed:', error);
    }
  },

  initializeAuth: async () => {
    const token = await AsyncStorage.getItem('authToken');
    const userString = await AsyncStorage.getItem('authUser');
    if (token && userString) {
      const user = JSON.parse(userString);
      api.setAuthToken(token);
      // validate the token here or fetch user data
      set({ user, isLoggedIn: true, token });
    } else {
      set({ user: null, isLoggedIn: false, token: null });
    }
  },
}));

interface GuardActivityStore {
  isAtOffice: boolean;
  facialRecognitionPassed: boolean;
  checkLocation: (coordinates: Coordinates) => Promise<void>;
  submitFacialRecognition: (photoData: string) => Promise<void>;
}



/*Guard Activity Store
    1. Check Location 
        a. Check if the guard is at the office in two either check on server and check on frontend
    2. Facial Recognition

*/
export const checkCameraPermission = create((set)=>({
    hasPermission: false,
    setPermission: (cameraPermission:string) => {
       const permission =  cameraPermission === 'granted'
        set({hasPermission: permission})
    }
}));

export const useGuardActivityStore = create<GuardActivityStore>((set) => ({
  isAtOffice: false,
  facialRecognitionPassed: false,
  checkLocation: async (coordinates) => {
    try {
      const { isAtOffice } = await api.checkGuardLocation(coordinates);
      set({ isAtOffice });
    } catch (error) {
        handleApiError('Location check failed:',error);
    
    }
  },

 
 /*front end check
  coordinates: null,
  checkGuardStatus: async () => {
    try {
      const { data } = await axios.get('/check-coordinates');
      set({ coordinates: data.coordinates });
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  },
  */
  submitFacialRecognition: async (photoData) => {
    try {
      const { passed } = await api.submitFacialRecognition(photoData);
      set({ facialRecognitionPassed: passed });
    } catch (error) {
        handleApiError('Facial recognition failed:', error);
    }
  },
}));

interface PocketBookStore {
  entries: PocketBookEntry[];
  createEntry: (entryData: Omit<PocketBookEntry, 'id'>) => Promise<void>;
  fetchEntries: () => Promise<void>;
  addComment: (entryId: string, commentData: Omit<PocketBookComment, 'id' | 'entryId'>) => Promise<void>;
}

export const usePocketBookStore = create<PocketBookStore>((set) => ({
  entries: [],
  createEntry: async (entryData) => {
    try {
      const newEntry = await api.createPocketBookEntry(entryData);
      set((state) => ({ entries: [...state.entries, newEntry] }));
    } catch (error) {
      console.error('Failed to create pocket book entry:', error);
    }
  },
  fetchEntries: async () => {
    try {
      const entries = await api.getPocketBookEntries();
      set({ entries });
    } catch (error) {
      console.error('Failed to fetch pocket book entries:', error);
    }
  },
  addComment: async (entryId, commentData) => {
    try {
      await api.addCommentToPocketBookEntry(entryId, commentData);
      // Optionally update the local state if needed
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  },
}));

interface ShiftStore {
  shifts: Shift[];
  currentShift: Shift | null;
  fetchShifts: (startDate: string, endDate: string) => Promise<void>;
  startShift: (shiftId: string) => Promise<void>;
  endShift: (shiftId: string) => Promise<void>;
}

export const useShiftStore = create<ShiftStore>((set) => ({
  shifts: [],
  currentShift: null,
  fetchShifts: async (startDate, endDate) => {
    try {
      const shifts = await api.getShifts(startDate, endDate);
      set({ shifts });
    } catch (error) {
      console.error('Failed to fetch shifts:', error);
    }
  },
  startShift: async (shiftId) => {
    try {
      const updatedShift = await api.startShift(shiftId);
      set((state) => ({
        shifts: state.shifts.map(shift => 
          shift.id === shiftId ? updatedShift : shift
        ),
        currentShift: updatedShift,
      }));
    } catch (error) {
      console.error('Failed to start shift:', error);
    }
  },
  endShift: async (shiftId) => {
    try {
      const updatedShift = await api.endShift(shiftId);
      set((state) => ({
        shifts: state.shifts.map(shift => 
          shift.id === shiftId ? updatedShift : shift
        ),
        currentShift: null,
      }));
    } catch (error) {
      console.error('Failed to end shift:', error);
    }
  },
}));

interface ProfileStore {
  profilePic: string | null;
  documents: GuardDocument[] | null;
  updateProfilePic: (photoData: string) => Promise<void>;
  fetchDocuments: () => Promise<void>;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  profilePic: null,
  documents: null,
  updateProfilePic: async (photoData) => {
    try {
      const { profilePic } = await api.updateProfilePic(photoData);
      set({ profilePic });
    } catch (error) {
      console.error('Failed to update profile picture:', error);
    }
  },
  fetchDocuments: async () => {
    try {
      const documents = await api.getGuardDocuments();
      set({ documents });
    } catch (error) {
      console.error('Failed to fetch documents:', error);
    }
  },
}));

interface NotificationStore {
  notifications: Notification[];
  fetchNotifications: () => Promise<void>;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  fetchNotifications: async () => {
    try {
      const notifications = await api.getNotifications();
      set({ notifications });
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  },
}));