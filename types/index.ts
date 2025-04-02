// types/index.ts

export interface User {
    id: string;
    username: string;
    name: string;
  
    role: 'guard' | 'admin';
  }


  
  export interface Coordinates {
    latitude: number;
    longitude: number;
  }
  
  export interface PocketBookEntry {
    id: string;
    guardId: string;
    refNumber: string;
    subject: string;
    dateTime: string;
    location: string;
    observation: string;
    media?: string[];
  }
  
  export interface PocketBookComment {
    id: string;
    entryId: string;
    guardId: string;
    comment: string;
    dateTime: string;
    media?: string[];
  }
  
  export interface Shift {
    id: string;
    guardId: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    status: 'scheduled' | 'in_progress' | 'completed';
  }
  
  export interface Weapon {
    id: string;
    name: string;
    type: string;
    serialNumber: string;
  }
  
  export interface WeaponRequest {
    id: string;
    guardId: string;
    weaponId: string;
    status: 'pending' | 'approved' | 'rejected';
  }
  
  export interface GuardDocument {
    type: 'certificate' | 'firearmLicense' | 'vehicleLicense' | 'idPassport' | 'medicalAid' | 'providentFund';
    details: {
      [key: string]: string;
    };
  }
  
  export interface Notification {
    id: string;
    guardId: string;
    title: string;
    message: string;
    dateTime: string;
    read: boolean;
  }