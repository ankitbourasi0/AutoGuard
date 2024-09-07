import { create } from 'zustand';
import { format, parse, isWithinInterval, isBefore, isAfter } from 'date-fns';
import getNavigation from '../hooks/navigation';

interface Guard {
  id: string;
  name: string;
}

interface WeekRange {
  start: Date;
  end: Date;
}

interface ShiftTime {
  startTime: string;
  endTime: string;
  status: 'not_started' | 'ongoing' | 'completed';
}

interface DayShift {
  date: string;
  location: string;
  shifts: ShiftTime[];
}

interface ShiftStore {
  currentGuard: Guard;
  currentWeek: WeekRange;
  shifts: DayShift[];
  setCurrentWeek: (date: Date) => void;
  getShiftsForCurrentWeek: () => DayShift[];
  getShiftStatus: (shift: ShiftTime, date: string) => 'not_started' | 'can_start' | 'ongoing' | 'completed';
  startShift: (date: string, startTime: string) => void;
  completeShift: (date: string, endTime: string) => void;
  navigateToShiftScreen: (shift: ShiftTime, date: string) => void;
}

const useShiftStore = create<ShiftStore>((set, get) => ({
  currentGuard: {
    id: 'G001',
    name: 'John Doe',
  },
  currentWeek: {
    start: new Date('2024-09-06'),
    end: new Date('2024-09-13'),
  },
  shifts: [
    {
        date: '2024-09-05',
        location: 'Waterfront Park',
        shifts: [
          { startTime: '06:00', endTime: '14:00', status: 'completed' },
          { startTime: '15:00', endTime: '20:00', status: 'completed' },
        ],
      },
    {
        date: '2024-09-06',
        location: 'Waterfront Park',
        shifts: [
          { startTime: '06:00', endTime: '14:00', status: 'not_started' },
          { startTime: '14:00', endTime: '20:00', status: 'not_started' },
        ],
      },
    {
      date: '2024-09-07',
      location: 'Waterfront Park',
      shifts: [
        { startTime: '08:00', endTime: '14:00', status: 'not_started' },
        { startTime: '15:00', endTime: '20:00', status: 'not_started' },
      ],
    },
    {
      date: '2024-09-08',
      location: 'Waterfront Park',
      shifts: [
        { startTime: '08:00', endTime: '14:00', status: 'not_started' },
      ],
    },
    // Add more shifts for the week...
  ],

  setCurrentWeek: (date: Date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    set({ currentWeek: { start, end } });
  },

  getShiftsForCurrentWeek: () => {
    const { shifts, currentWeek } = get();
    return shifts.filter(shift => {
      const shiftDate = new Date(shift.date);
      return isWithinInterval(shiftDate, { start: currentWeek.start, end: currentWeek.end });
    });
  },

  getShiftStatus: (shift: ShiftTime, date: string) => {
    const now = new Date();
    const shiftDate = parse(date, 'yyyy-MM-dd', new Date());
    const startTime = parse(shift.startTime, 'HH:mm', shiftDate);
    const endTime = parse(shift.endTime, 'HH:mm', shiftDate);

    if (shift.status === 'ongoing') return 'ongoing';
    if (shift.status === 'completed') return 'completed';
    if (isAfter(now, endTime)) return 'completed';
    if (isWithinInterval(now, { start: startTime, end: endTime })) return 'can_start';
    return 'not_started';
  },

  startShift: (date: string, startTime: string) => {
    set(state => ({
      shifts: state.shifts.map(shift => {
        if (shift.date === date) {
          return {
            ...shift,
            shifts: shift.shifts.map(s => {
              if (s.startTime === startTime) {
                return { ...s, status: 'ongoing' };
              }
              return s;
            }),
          };
        }
        return shift;
      }),
    }));
  },

  completeShift: (date: string, endTime: string) => {
    set(state => ({
      shifts: state.shifts.map(shift => {
        if (shift.date === date) {
          return {
            ...shift,
            shifts: shift.shifts.map(s => {
              if (s.endTime === endTime) {
                return { ...s, status: 'completed' };
              }
              return s;
            }),
          };
        }
        return shift;
      }),
    }));
  },

  navigateToShiftScreen: (shift: ShiftTime, date: string) => {


    // This function would be implemented in your app's navigation system
    console.log(`Navigating to shift screen for ${date} ${shift.startTime}-${shift.endTime}`);
   
  },
}));

export default useShiftStore;