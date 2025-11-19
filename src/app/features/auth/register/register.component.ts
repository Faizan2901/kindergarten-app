import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule,RouterLink,NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  authService=inject(AuthService);
  router=inject(Router);

  registerData: any = {
    firstName: '',
    email: '',
    dob: '',
    gender: '',
    parentFatherName: '',
    parentMotherName: '',
    parentContact: '',
    emergencyContact: '',
    address: '',
    password: '',
    confirmPassword: ''
  };

  selectedPhoto: File | null = null;
  formSubmitted = false;
  photoSelected = false;


  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedPhoto = file;
      this.photoSelected = true;
    }
  }

  onRegister(form: any) {
    this.formSubmitted = true;

    if (form.invalid || !this.selectedPhoto) {
      return;
    }

    const formData = new FormData();
    formData.append('firstName', this.registerData.firstName);
    formData.append('email', this.registerData.email);
    formData.append('dob', this.registerData.dob);
    formData.append('gender', this.registerData.gender);
    formData.append('parentFatherName', this.registerData.parentFatherName);
    formData.append('parentMotherName', this.registerData.parentMotherName);
    formData.append('parentContact', this.registerData.parentContact);
    formData.append('emergencyContact', this.registerData.emergencyContact);
    formData.append('address', this.registerData.address);
    formData.append('password', this.registerData.password);
    formData.append('confirmPassword', this.registerData.confirmPassword);
    formData.append('photo', this.selectedPhoto!); // non-null assertion
    console.log(formData.get('dob'));
    
    this.authService.register(formData).subscribe({
      next: (response) => {
        // alert(response.message);
        form.resetForm();
        this.photoSelected = false;
        this.formSubmitted = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err.error.message || 'Registration failed.');
      }
    });
  }
  
  
}
