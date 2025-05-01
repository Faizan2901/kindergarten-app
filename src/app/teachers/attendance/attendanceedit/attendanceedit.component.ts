import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendanceService } from '../../../services/attendance/attendance.service';
import { Attendance } from '../../../dto/attendance.interface';
import { DatePipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-attendanceedit',
  imports: [NgFor,FormsModule,DatePipe,MatCheckboxModule],
  templateUrl: './attendanceedit.component.html',
  styleUrl: './attendanceedit.component.scss'
})
export class AttendanceeditComponent {

  attendanceService = inject(AttendanceService);
  attendanceList: Attendance[] = [];
  router = inject(Router);
  updatedList: Attendance[] = [];

  selectedDate: Date = new Date();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['date']) {
        this.selectedDate = new Date(params['date']);
        this.loadAttendanceByDate(this.selectedDate);
      }
    });
  }

  loadAttendanceByDate(date: Date) {
    this.attendanceService.getAttendanceByDate(date).subscribe({
      next: (data) => {
        if (data.alreadyPresentAttendance) {
          this.attendanceList = data.alreadyPresentAttendance;
          console.log('Attendance List:', this.attendanceList);
        }else if(data.attendanceNotFound){
          alert('First take attendance!');
          this.router.navigate(['/attendance']);
        } 
      },
      error: (err) => {
        console.error('Error fetching attendance:', err);
      }
    });
  }
  
  updateAttendance() {
    const formattedDate = this.selectedDate.toISOString().split('T')[0]; // gives yyyy-MM-dd
   this.attendanceService.updateAttendance(formattedDate, this.attendanceList).subscribe({
      next: (data) => {
        if (data.attendanceUpdated) {
          alert('Attendance updated successfully!');
          this.router.navigate(['/attendance/edit'], { queryParams: { date: this.selectedDate } });
        } else if(data.atLeastOnePresent){
          alert(formattedDate + ' attendance will be deleted!');
          this.router.navigate(['/attendance']);
        }
      },
      error: (err) => {
        console.error('Error updating attendance:', err);
        alert('Error updating attendance. Please try again.');
      }
    });
  }

}
