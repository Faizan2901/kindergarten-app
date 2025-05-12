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

  user: Student | null = null
  age: number | null = null;
  roles: string[] = [];

  ngOnInit(): void {
    this.userService.currentUser$.pipe(take(1)).subscribe(user => {
      if (user) {
        this.user = user;
        this.roles = user.roles?.map((role: any) => role.name) ?? []
        this.age=this.calculateAge(user.dateOfBirth);
        console.log('User:', this.user);
      }
    });
  }

  calculateAge(dateOfBirth: string): number {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
  
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
  }

}


