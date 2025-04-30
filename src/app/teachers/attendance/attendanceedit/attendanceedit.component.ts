import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
        } else {
          this.attendanceList = [];
        }
      
      },
      error: (err) => {
        console.error('Error fetching attendance:', err);
      }
    });
  }
  
  updateAttendance(){
    alert('Attendance updated successfully!');
  }

}
