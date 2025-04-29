import { Component, inject } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { formatDate, NgFor, NgIf } from '@angular/common';
import { Student } from '../../dto/student.interface';
import { UserService } from '../../services/user/user.service';
import { Attendance } from '../../dto/attendance.interface';
import { AttendanceService } from '../../services/attendance/attendance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance',
  imports: [MatDatepickerModule, MatCheckboxModule, MatInputModule, MatNativeDateModule, FormsModule, NgFor],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent {

  userService = inject(UserService);
  attendanceService = inject(AttendanceService);
  router= inject(Router);

  selectedDate: string = '';
  today: Date = new Date();
  students: Student[] = [];

  attendance: Attendance[] = [];
  

  // Load Students
  loadStudents() {
    if (!this.selectedDate) {
      alert('Please select a date first!');
      return;
    }

    // Simulate an API call to fetch students
    this.userService.getAllStudents().subscribe({
      next: (res) => {
        this.students = res.students.filter((student: Student) => student.playCenterId.includes("STUDENT"));
        console.log('Before Students:', this.students);
        // Initialize student status as false (Absent) by default if not already set
        this.students.forEach(student => {
          student.status = student.status !== undefined ? student.status : false; // Ensure 'status' is a boolean
        });
        console.log('After Students:', this.students);
      },
      error: (err) => {
        console.error('Error fetching students:', err);
      }
    });
  }

  // Update attendance status when checkbox changes
  updateAttendanceStatus(student: Student) 
  {
    // Simply toggle between present (true) and absent (false)
    student.status = !student.status;  // Toggle between true (Present) and false (Absent)
    console.log(`Updated attendance for ${student.firstName}: ${student.status ? 'Present' : 'Absent'}`);
  }

  // Submit the attendance data
  submitAttendance() {
    if (!this.selectedDate) {
      alert('Please select a date before submitting!');
      return;
    }

    const attendanceData : Attendance[]= this.students.map(student => ({
      playCenterId: student.playCenterId,
      date: formatDate(this.selectedDate, 'yyyy-MM-dd', 'en-US'),
      present: student.status // true for Present, false for Absent
    }as Attendance));

    

    const isAnyStudentPresent = attendanceData.some(attendance => attendance.present);

    if(!isAnyStudentPresent){
      alert('Please select atleast one student!');
      return;
    }
    
    console.log('Attendance Submitted:', attendanceData);

    this.attendanceService.submitAttendance(attendanceData).subscribe({
      next: (response) => {
        if (response.alreadyPresentAttendance) {
          this.attendance = response.alreadyPresentAttendance;
          console.log("Attendance already exists, load for editing", this.attendance);
          
          alert("Attendance for this date already exists!");
          // this.router.navigate(['/attendance/edit'], { queryParams: { date: this.selectedDate } });
          
        } else if (response.savedAttendance) {
          this.attendance = response.savedAttendance;
          console.log("Attendance saved", this.attendance);
        }
      },
      error: (error) => {
        console.error("Error:", error);
      }
    });
    
    
  }

  

}
