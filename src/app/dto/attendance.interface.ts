import { Student } from "./student.interface";

export interface Attendance {
  firstName: Student['firstName'];
  playCenterId: string;
  date: string;
  present: boolean; 
}

export interface MonthlyAttendanceStat {
  month: string;
  totalDays: number;
  presentDays: number;
}