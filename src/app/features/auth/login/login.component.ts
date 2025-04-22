import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authService=inject(AuthService);
  router=inject(Router);

  playCenterId:string='';
  password:string='';

  onLogin(){
    const credentials={
      'playCenterId':this.playCenterId,
      'password':this.password
    }
    this.authService.login(credentials).subscribe({
      next: (response) => {
        alert(response.message);
        this.authService.saveToken(response.token);  // <--- important!
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log(err.error.message);
        alert(err.error.message);
      }
    });
    
  }

}
