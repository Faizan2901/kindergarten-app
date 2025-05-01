import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Attendance } from '../../dto/attendance.interface';
import { Observable } from 'rxjs';
import { AttendanceResponse } from '../../dto/attendanceresponse.interface';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) { }
  

  private apiUrl = 'http://localhost:8080/api/attendance';

  submitAttendance(attendanceData: Attendance[]): Observable<AttendanceResponse> {
    console.log('Before sending Attendance Data:', attendanceData);
    return this.http.post<AttendanceResponse>(`${this.apiUrl}/submit`, attendanceData);
  }  

  getAttendanceByDate(date: Date): Observable<AttendanceResponse> {
    const formattedDate = date.toISOString().split('T')[0]; // gives yyyy-MM-dd
    return this.http.get<AttendanceResponse>(`${this.apiUrl}/by-date?date=${formattedDate}`);
  }
  
  updateAttendance(date: string, attendanceData: Attendance[]): Observable<AttendanceResponse> {
    return this.http.put<AttendanceResponse>(`${this.apiUrl}/update?date=${date}`, attendanceData);
  }

  
}
