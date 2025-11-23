import { Component, inject } from '@angular/core';
import { Student } from '../../../dto/student.interface';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { UserService } from '../../../services/user/user.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-editstudent',
  imports: [FormsModule,NgIf],
  templateUrl: './editstudent.component.html',
  styleUrl: './editstudent.component.scss'
})
export class EditstudentComponent {

  authService =inject(AuthService);
  
  
  student: Student = {
    playCenterId:'',
    firstName: '',
    email: '',
    password: '',
    gender: '',
    dateOfBirth: '',
    address: '',
    contactNumber: '',
    fatherName: '',
    motherName: '',
    photoUrl: '',
    status: false  
  }
    
  
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {

      const studentData = navigation.extras.state['studentData'] as Student;
      console.log('Student Data', studentData);
      
      this.student.playCenterId = studentData.playCenterId;
      this.student.firstName= studentData.firstName;
      this.student.email= studentData.email;
      this.student.gender= studentData.gender;
      this.student.dateOfBirth= studentData.dateOfBirth;
      this.student.address= studentData.address;
      this.student.contactNumber= studentData.contactNumber;
      this.student.fatherName= studentData.fatherName;
      this.student.motherName= studentData.motherName;

      console.log('Student Data', this.student);
    }
  }

  onSubmit(){
    const formData = new FormData();
    formData.append('playCenterId', this.student.playCenterId);
    formData.append('firstName', this.student.firstName);
    formData.append('email', this.student.email);
    formData.append('dateOfBirth', this.student.dateOfBirth);
    formData.append('gender', this.student.gender);
    formData.append('fatherName', this.student.fatherName);
    formData.append('motherName', this.student.motherName);
    formData.append('contactNumber', this.student.contactNumber);
    formData.append('address', this.student.address);


    this.authService.updateStudent(this.student.playCenterId, formData).subscribe({
      next: (res) => {
        alert('Student updated successfully');
        this.router.navigate(['/manage-students']);
      },
      error: (err) => {
        alert('Error updating student');
      }
    });

  }


  

}
