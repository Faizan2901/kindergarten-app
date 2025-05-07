import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { Student } from '../../dto/student.interface';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FilterstudentsPipe } from '../../filter/pipes/filter-students/filterstudents.pipe';
import { FormsModule } from '@angular/forms';
import { AttendanceService } from '../../services/attendance/attendance.service';
import { MonthlyAttendanceStat } from '../../dto/attendance.interface';

@Component({
  selector: 'app-attendancesummary',
  imports: [NgFor,DatePipe,NgIf,FilterstudentsPipe,FormsModule],
  templateUrl: './attendancesummary.component.html',
  styleUrl: './attendancesummary.component.scss'
})
export class AttendancesummaryComponent {
  
  userService=inject(UserService);
  router=inject(Router);
  attendanceService=inject(AttendanceService);
  monthlyStats: MonthlyAttendanceStat[] = []; // Adjust type as needed

  searchText=signal('');

  students: Student[] = [];

  ngOnInit(): void {
    this.userService.getAllStudents().subscribe({
      next: (res) => {
        this.students = res.students.filter((student: Student) => {
          return student.playCenterId.includes("STUDENT");
        }) 
      },
      error: (err) => {
        console.error('Error fetching students:', err);
      }
    });
  }

  showStatistics(student: Student) {
    this.attendanceService.getMonthlyAttendanceStats(student.playCenterId).subscribe(
      (response) => {
        this.monthlyStats = response;
        this.router.navigate(['/my-attendance'], {
          state: { 
            monthlyStudentStats: this.monthlyStats,
            studentName: student.firstName 
          }
        });
      },
      (error) => {
        console.error('Error fetching monthly attendance stats:', error);
      }
    );

  }

}
