import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResetPassword } from '../../../dto/forgotpassword.interface';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule,CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {

  password: string = '';
  confirmPassword: string = '';
  message: string = '';
  token: string = '';
  loading: boolean = false;

  route = inject(ActivatedRoute);
  authService = inject(AuthService);

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  ngOnInit() {
  this.token = this.route.snapshot.queryParamMap.get('token') || '';
}

  resetPassword() { 
    console.log(typeof this.password);
    this.loading = true;
   
    if(this.password.trim() === '' || this.confirmPassword.trim() === '') {
      this.message = 'Please fill in all fields.';  
      return;
    }
    if(this.password !== this.confirmPassword) { 
      this.message = 'Passwords do not match.';
      return;
    }

    const resetData : ResetPassword= {
      password: this.password,
      token: this.token
    };

    this.authService.resetPassword(resetData).subscribe({
      next: (response:any) => {
          this.message = response.message;
          this.loading = false;
      },
      error: (error) => {
          this.message = error.error.message;
          this.loading = false;
      }    
    });


  }

}
