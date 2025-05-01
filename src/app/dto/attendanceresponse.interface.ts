import { Attendance } from "./attendance.interface";

export interface AttendanceResponse {
    savedAttendance?: Attendance[];
    alreadyPresentAttendance?: Attendance[];
    attendanceNotFound?: Attendance[];
    attendanceUpdated?: Attendance;
    atLeastOnePresent?: Attendance[];
  }
  