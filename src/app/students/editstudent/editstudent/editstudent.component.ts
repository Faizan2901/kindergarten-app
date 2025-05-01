import { Component, inject } from '@angular/core';
import { Student } from '../../../dto/student.interface';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-editstudent',
  imports: [FormsModule,NgIf],
  templateUrl: './editstudent.component.html',
  styleUrl: './editstudent.component.scss'
})
export class EditstudentComponent {
  
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
    imageUrl: '',
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
      this.student.password= studentData.password;
      this.student.gender= studentData.gender;
      this.student.dateOfBirth= studentData.dateOfBirth;
      this.student.address= studentData.address;
      this.student.contactNumber= studentData.contactNumber;
      this.student.fatherName= studentData.fatherName;
      this.student.motherName= studentData.motherName;
      this.student.imageUrl= studentData.imageUrl;
      this.student.status= false ;
      
      console.log('Navigate student id:- ',studentData.playCenterId,' Student:- ',this.student.playCenterId);
    }
  }

  onSubmit(){
    alert("Student data updated successfully");
  }


  

}
