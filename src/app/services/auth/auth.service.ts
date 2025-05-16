import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { ForgotPassword, ResetPassword } from '../../dto/forgotpassword.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth';
  http = inject(HttpClient);
  userService=inject(UserService);

  private loggedIn = new BehaviorSubject<boolean>(this.isAuthenticated());
  isLoggedIn$ = this.loggedIn.asObservable();

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.loggedIn.next(true); // Trigger update
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false); // Trigger update
    this.userService.clearUserInfo();
    
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  sendResetLink(credentials:ForgotPassword): Observable<string> {
    return this.http.post<any>(`${this.apiUrl}/forgot-password`, credentials );  
  }

  resetPassword(credentials:ResetPassword): Observable<string> {
    return this.http.post<any>(`${this.apiUrl}/reset-password`, credentials );
  }

}
