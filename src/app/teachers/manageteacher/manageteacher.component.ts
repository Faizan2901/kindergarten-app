import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Student } from '../../dto/student.interface';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FilterstudentsPipe } from '../../filter/pipes/filter-students/filterstudents.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manageteacher',
  imports: [NgFor,DatePipe,NgIf,FilterstudentsPipe,FormsModule],
  templateUrl: './manageteacher.component.html',
  styleUrl: './manageteacher.component.scss'
})
export class ManageteacherComponent {

  userService=inject(UserService);

  searchText=signal('');

  students: Student[] = [];

  ngOnInit(): void {
    this.userService.getAllStudents().subscribe({
      next: (res) => {
        this.students = res.students.filter((student: Student) => {
          return student.playCenterId.includes("TEACHER");
        }) 
      },
      error: (err) => {
        console.error('Error fetching teachers:', err);
      }
    });
  }


}
