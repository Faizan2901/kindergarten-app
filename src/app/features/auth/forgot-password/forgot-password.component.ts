import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { ForgotPassword } from '../../../dto/forgotpassword.interface';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule,FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  authService= inject(AuthService); // Assuming authService is injected in the constructor
  
  email: string = '';
  info: string = '';
  playCenterId: string = '';
  isLoading: boolean = false;

  

  onSubmit() {
    this.isLoading = true;
    const credentials: ForgotPassword = {
      playCenterId: this.playCenterId,
      email: this.email
    };
    this.authService.sendResetLink(credentials).subscribe({
      next: (res:any) =>{
         this.info = res.message;
         this.isLoading=false;
         console.log(this.info)
        },
      error: () =>{ 
        this.info = 'Email not found or something went wrong.'
        this.isLoading=false;
      }
    });
  }


}
