import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Student } from '../../dto/student.interface';
import { take } from 'rxjs';
import { AttendanceService } from '../../services/attendance/attendance.service';
import { MonthlyAttendanceStat } from '../../dto/attendance.interface';
import { DecimalPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-myattendance',
  imports: [DecimalPipe,NgFor],
  templateUrl: './myattendance.component.html',
  styleUrl: './myattendance.component.scss'
})
export class MyattendanceComponent implements OnInit {

  userService=inject(UserService);
  attendanceService=inject(AttendanceService);

  monthlyStats: MonthlyAttendanceStat[] = [];


  ngOnInit(): void { 
    this.userService.currentUser$.pipe(take(1)).subscribe(user => {
      if(user) {
        console.log(user.playCenterId);
        this.attendanceService.getMonthlyAttendanceStats(user.playCenterId).subscribe(
          (response) => {
            this.monthlyStats = response;
            console.log('Monthly Attendance Stats:', this.monthlyStats);
          },
          (error) => {
            console.error('Error fetching monthly attendance stats:', error);
          }
        );
      }
    });
  }

}

