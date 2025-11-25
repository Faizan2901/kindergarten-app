import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ForgotPassword, ResetPassword } from '../../dto/forgotpassword.interface';
import { CookieService } from 'ngx-cookie-service';
import { LoginResponse } from '../../dto/LoginResponse.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8090/api/auth';
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);

  // 🔥 Writable signal (we control this only)
  loggedIn = signal(false);

  constructor() {
    // App load → check cookie & update signal
    this.refreshLoginState();
  }

  // 🔥 Refresh cookie state → signal ko update karo
  refreshLoginState() {
    const isLogged = this.cookieService.check('PASSID');
    this.loggedIn.set(isLogged);
  }

  register(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any) {
    console.log('AuthService Login Credentials:', credentials);
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      credentials,
      { withCredentials: true }
    );
  }

  logout() {
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe();
    this.cookieService.deleteAll('/');
    this.loggedIn.set(false);     // UI update
  }

  isAuthenticated(): boolean {
    return this.cookieService.check('PASSID');
  }

  sendResetLink(credentials: ForgotPassword) {
    return this.http.post(`${this.apiUrl}/forgot-password`, credentials);
  }

  resetPassword(credentials: ResetPassword) {
    return this.http.post(`${this.apiUrl}/reset-password`, credentials);
  }

  updateStudent(playCenterId: string, formData: FormData): Observable<string> {
    return this.http.put(`${this.apiUrl}/students/${playCenterId}`, formData, { responseType: 'text' ,withCredentials: true});
  }

}
