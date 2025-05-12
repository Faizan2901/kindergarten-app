import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // needed
import { UserService } from '../../../services/user/user.service';
import { AttendanceService } from '../../../services/attendance/attendance.service';
import { take } from 'rxjs';
import { Student } from '../../../dto/student.interface';

@Component({
  selector: 'app-myprofile',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.scss'
})
export class MyprofileComponent implements OnInit {

  userService = inject(UserService);
  attendanceService = inject(AttendanceService);

  user: Student | null = null;

  ngOnInit(): void {
    this.userService.currentUser$.pipe(take(1)).subscribe(user => {
      if (user) {
        console.log('User from service:', user);
        this.user = user;
        console.log('Image Url from backend:', user.imageUrl);
        console.log('Image Url from frontend:', this.user.imageUrl);
        console.log('User:', this.user);
      }
    });
  }
}
