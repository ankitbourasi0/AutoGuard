// api/index.ts
import axios, { InternalAxiosRequestConfig }   from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Coordinates, PocketBookEntry, PocketBookComment, Shift, Weapon, WeaponRequest, GuardDocument, Notification } from '../types';



const API_BASE_URL = 'https://autoguardapi.leogroup.tech/';


//dummy region start ----------------------------------------------------------
//dummy  
// const dummyuser:User =   {
//   id:"1",
//   username:"test",
//   name:"test",
//   role:'guard' 
// }
//dummy token
const token = "dummytoken"
//region end ----------------------------------------------------------


type MobileLoginResponse = {
  status: string,
  staff_fk: number,
  username: string,
  name: string,
  surname: string,
  contact_number: number,
  employee_id: string,
  business_fk: number,
  facial_recognition_image: string,
  token: string
};

const api = {
  // Authentication

  //token
  setAuthToken: (token: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  clearAuthToken: () => {
    //uncomment this when real api has given
     delete axios.defaults.headers.common['Authorization'];
  },

  // Guard Login
  login: async (username: string, password: string): Promise<{ user: User; token: string }> => {
    //working network call
    //uncomment these when real api has given & also use user instead of dummyuser
    console.log("enter in login");
    const response = await axios.post<MobileLoginResponse>(`${API_BASE_URL}api/mobile/auth/login`, { username, password });
    console.log("response", response.status);
    
    const user = response.data;

    console.log("User detail: ",user);
    await AsyncStorage.setItem('authToken',  user.token);
    await AsyncStorage.setItem('authUser', JSON.stringify(user));
    api.setAuthToken(user.token);
    return { user: user, token: user.token };
  },

  logout: async (): Promise<void> => {
    await AsyncStorage.removeItem('authToken');
    api.clearAuthToken();
    // await axios.post(`${API_BASE_URL}/auth/logout`);
  },

  //Password Reset
  requestPasswordReset: async (email: string): Promise<void> => {
    console.log(email)
    const res = await axios.post(`${API_BASE_URL}api/Users/forgot-password`, { email });
    if(res.status === 200){
      return res.data.created_otp;
    }
  },

  // Guard Activity
  checkGuardLocation: async (coordinates: Coordinates): Promise<{ isAtOffice: boolean }> => {
    const response = await axios.post<{ isAtOffice: boolean }>(`${API_BASE_URL}/guard/check-location`, coordinates);
    return response.data;
  },

  submitFacialRecognition: async (photoData: string): Promise<{ passed: boolean }> => {
    const response = await axios.post<{ passed: boolean }>(`${API_BASE_URL}/guard/facial-recognition`, { photoData });
    return response.data;
  },

  // Pocket Book
  createPocketBookEntry: async (entryData: Omit<PocketBookEntry, 'id'>): Promise<PocketBookEntry> => {
    const response = await axios.post<PocketBookEntry>(`${API_BASE_URL}/pocket-book`, entryData);
    return response.data;
  },

  getPocketBookEntries: async (): Promise<PocketBookEntry[]> => {
    const response = await axios.get<PocketBookEntry[]>(`${API_BASE_URL}/pocket-book`);
    return response.data;
  },

  addCommentToPocketBookEntry: async (entryId: string, commentData: Omit<PocketBookComment, 'id' | 'entryId'>): Promise<PocketBookComment> => {
    const response = await axios.post<PocketBookComment>(`${API_BASE_URL}/pocket-book/${entryId}/comments`, commentData);
    return response.data;
  },

  // Shifts
  getShifts: async (startDate: string, endDate: string): Promise<Shift[]> => {
    const response = await axios.get<Shift[]>(`${API_BASE_URL}/shifts`, { params: { startDate, endDate } });
    return response.data;
  },
  startShift: async (shiftId: string): Promise<Shift> => {
    const response = await axios.post<Shift>(`${API_BASE_URL}/shifts/${shiftId}/start`);
    return response.data;
  },
  endShift: async (shiftId: string): Promise<Shift> => {
    const response = await axios.post<Shift>(`${API_BASE_URL}/shifts/${shiftId}/end`);
    return response.data;
  },

  // Weapons
  getWeaponRegistry: async (): Promise<Weapon[]> => {
    const response = await axios.get<Weapon[]>(`${API_BASE_URL}/api/Weapon/fetch-all-weapons`);
    return response.data;
  },
  requestWeapon: async (weaponData: Omit<WeaponRequest, 'id' | 'status'>): Promise<WeaponRequest> => {
    const response = await axios.post<WeaponRequest>(`${API_BASE_URL}/weapons/request`, weaponData);
    return response.data;
  },

  // Profile
  updateProfilePic: async (photoData: string): Promise<{ profilePic: string }> => {
    const response = await axios.put<{ profilePic: string }>(`${API_BASE_URL}/profile/photo`, { photoData });
    return response.data;
  },
  getGuardDocuments: async (): Promise<GuardDocument[]> => {
    const response = await axios.get<GuardDocument[]>(`${API_BASE_URL}/profile/documents`);
    return response.data;
  },

  // Notifications
  getNotifications: async (): Promise<Notification[]> => {
    const response = await axios.get<Notification[]>(`${API_BASE_URL}/notifications`);
    return response.data;
  },
};
// Interceptor to add auth token to requests
// Automatically adds the auth token to all requests. If the token is not present, the request will fail with a 401 Unauthorized error.
axios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;