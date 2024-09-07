import {NavigationProp} from '@react-navigation/native';
export interface Leave {
    leaveType: string;
    startDate: string | null;
    endDate: string | null;
    status: string;
  }

interface  CommonBook {
    headerTitle: string;
    newEntryTitle: string;
    newEntryDescription: string;
    allEntryTitle: string;
    allEntryDescription: string;
    newEntryScreen: keyof RootStackParamList;
    allEntriesScreen: keyof RootStackParamList;
  };

  interface ShiftTime {
    startTime: string;
    endTime: string;
    status: 'not_started' | 'ongoing' | 'completed';
  }
  
export type RootStackParamList = {
    Login: undefined;
    Home: undefined; 
    ShiftScheduleScreen: undefined; 
    ShiftStartScreen: {date: string, shift: ShiftTime }; 
    Notifications: undefined;
    SOS: undefined;
    Payslips: undefined;
    MyProfile: undefined;
    GuardActivity: undefined;
    Entry: undefined;
    CommonBook: CommonBook
    PocketBookMain: undefined;
    NewPocketBookEntry: undefined;
    AllPocketBookEntries: undefined;
    PocketBookEntry: undefined;
    ObservationBookMain: undefined;
    NewObservationBooksEntry: undefined;
    AllObservationBooksEntries: undefined;
    ObBookInformation: undefined;
    CrimeSceneMain: undefined;
    CrimeSceneInformation: undefined;
    NewCrimeSceneBookEntry:undefined
    AllCrimeSceneBookEntries: undefined;
    VehicleInspection: undefined;
    NewVehicleInspection: undefined;
    InspectionHistory: undefined;
    VehicleDetails: { inspectionData: any,  };
    ViewMenu: undefined;
    WeaponsRegister: undefined;
    MyLeaveScreen:{ newLeave?: Leave };
    ApplyForLeave: undefined;
}


export type NavigationProps =  NavigationProp<RootStackParamList>