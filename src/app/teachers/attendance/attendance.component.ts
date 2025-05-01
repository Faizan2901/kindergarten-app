import { Component, inject, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, formatDate, NgFor, NgIf } from '@angular/common';
import { Student } from '../../dto/student.interface';
import { UserService } from '../../services/user/user.service';
import { Attendance } from '../../dto/attendance.interface';
import { AttendanceService } from '../../services/attendance/attendance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance',
  imports: [MatDatepickerModule, MatCheckboxModule, MatInputModule, MatNativeDateModule, FormsModule, NgFor,NgIf],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {

  userService = inject(UserService);
  attendanceService = inject(AttendanceService);
  router= inject(Router);

  selectedDate: string = '';
  today: Date = new Date();
  students: Student[] = [];
  markedDates: Date[] = [];

  attendance: Attendance[] = [];
  
  ngOnInit(): void {
      this.attendanceService.getMarkedDates().subscribe({
        next: (dates) => {
          this.markedDates = dates.map(dateStr => new Date(dateStr));
          console.log("Marked Dates:", this.markedDates);
        },
        error: (error) => {
          console.error('Error fetching marked dates:', error);
        }
      });
  }
  
  
  loadStudents() {
    if (!this.selectedDate) {
      alert('Please select a date first!');
      return;
    }

    this.selectedDate = formatDate(this.selectedDate, 'yyyy-MM-dd', 'en-US');

    this.attendanceService.getAttendanceByDate(new Date(this.selectedDate)).subscribe({
      next: (data) => { 
        if (data.alreadyPresentAttendance) {
          this.attendance = data.alreadyPresentAttendance;
          alert("Attendance for this date already exists!, You can edit it");
          console.log("Selected Date:", this.selectedDate);
          this.router.navigate(['/attendance/edit'], { queryParams: { date: this.selectedDate } });
        } else {
          
          this.userService.getAllStudents().subscribe({
            next: (res) => {
              this.students = res.students.filter((student: Student) => student.playCenterId.includes("STUDENT"));
              console.log('Before Students:', this.students);
                
              this.students.forEach(student => {
                student.status = student.status !== undefined ? student.status : false;   
              });
              console.log('After Students:', this.students);
            },
            error: (err) => {
              console.error('Error fetching students:', err);
            }
          });
        }
      },
      error: (err) => {
        console.error('Error fetching attendance:', err);
      }
    });    
  }


  updateAttendanceStatus(student: Student) 
  {
    student.status = !student.status;  
    console.log(`Updated attendance for ${student.firstName}: ${student.status ? 'Present' : 'Absent'}`);
  }

  
  submitAttendance() {
    if (!this.selectedDate) {
      alert('Please select a date before submitting!');
      return;
    }

    this.selectedDate = formatDate(this.selectedDate, 'yyyy-MM-dd', 'en-US');

    const attendanceData : Attendance[]= this.students.map(student => ({
      firstName: student.firstName,
      playCenterId: student.playCenterId,
      date: this.selectedDate,
      present: student.status 
    }as Attendance));

    

    const isAnyStudentPresent = attendanceData.some(attendance => attendance.present);

    if(!isAnyStudentPresent){
      alert('Please select atleast one student!');
      return;
    }
    
    console.log('Attendance Submitted:', attendanceData);

    this.attendanceService.submitAttendance(attendanceData).subscribe({
      next: (response) => {
      if (response.savedAttendance) {
          this.attendance = response.savedAttendance;
          console.log("Attendance saved", this.selectedDate);
          this.router.navigate(['/attendance/edit'], { queryParams: { date: this.selectedDate } });
          console.log("Attendance saved", this.attendance);
          this.clearForm();
        }
      },
      error: (error) => {
        console.error("Error:", error);
      }
    });
   
  }

  highlightMarkedDates = (d: Date): string => {
    return this.markedDates.some(date => date.toDateString() === d.toDateString())
      ? 'marked-date'
      : '';
  };

  onDateChange(date: Date) {

    if(!date){
      return;
    }
    this.selectedDate = formatDate(date, 'yyyy-MM-dd', 'en-US');

    const isMarked = this.markedDates.some(markedDate => markedDate.toDateString() === date.toDateString());

    if (isMarked) {
      alert('You will be redirected to edit attendance for this date!');
      this.router.navigate(['/attendance/edit'], { queryParams: { date: this.selectedDate } });
    } else {
      this.loadStudents();
    }

  }

  clearForm() {
    this.selectedDate = '';
    this.students = [];
    this.attendance = [];
  }
  

}
