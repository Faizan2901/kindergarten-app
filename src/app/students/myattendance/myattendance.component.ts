import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Student } from '../../dto/student.interface';
import { take } from 'rxjs';
import { AttendanceService } from '../../services/attendance/attendance.service';
import { MonthlyAttendanceStat } from '../../dto/attendance.interface';
import { DecimalPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-myattendance',
  imports: [DecimalPipe,NgFor,NgIf],
  templateUrl: './myattendance.component.html',
  styleUrl: './myattendance.component.scss'
})
export class MyattendanceComponent implements OnInit {

  userService=inject(UserService);
  attendanceService=inject(AttendanceService);

  monthlyStats: MonthlyAttendanceStat[] = [];

  studentName: string = '';

  isStudent: boolean = false;


  ngOnInit(): void {
    const state = history.state;
  
    if (state.monthlyStudentStats) {
      this.monthlyStats = state.monthlyStudentStats;
      this.isStudent = false;
    }
  
    if (state.studentName) {
      this.studentName = state.studentName;
    }
  

    if (!state.monthlyStudentStats) {
      this.isStudent = true;
      this.userService.currentUser$.pipe(take(1)).subscribe(user => {
        if (user) {
          this.attendanceService.getMonthlyAttendanceStats(user.playCenterId).subscribe(
            (response) => {
              this.monthlyStats = response;
              this.studentName = user.firstName; 
            },
            (error) => {
              console.error('Error fetching monthly attendance stats:', error);
            }
          );
        }
      });
    }
  }
  
  
}

