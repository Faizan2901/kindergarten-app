import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Student } from '../../dto/student.interface';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { single } from 'rxjs';
import { FilterstudentsPipe } from '../../filter/pipes/filter-students/filterstudents.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-managestudent',
  imports: [NgFor,DatePipe,NgIf,FilterstudentsPipe,FormsModule],
  templateUrl: './managestudent.component.html',
  styleUrl: './managestudent.component.scss'
})
export class ManagestudentComponent implements OnInit{
 
  userService=inject(UserService);

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

}
