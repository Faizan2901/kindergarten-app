import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Student } from '../../dto/student.interface';
import { DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-managestudent',
  imports: [NgFor,DatePipe,NgIf],
  templateUrl: './managestudent.component.html',
  styleUrl: './managestudent.component.scss'
})
export class ManagestudentComponent implements OnInit{
 
  userService=inject(UserService);

  students: Student[] = [];

  ngOnInit(): void {
    this.userService.getAllStudents().subscribe({
      next: (res) => {
        this.students = res.students;
        console.log(this.students[0].imageUrl);
        
      },
      error: (err) => {
        console.error('Error fetching students:', err);
      }
    });
  }

}
