import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Student } from '../../dto/student.interface';
import { Attendance } from '../../dto/attendance.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/user';

  // Create a BehaviorSubject to hold the user info and roles
  private currentUserSubject = new BehaviorSubject<Student | null>(null);
  currentUser$ = this.currentUserSubject.asObservable(); // This will be used by components

  constructor() {}

  getUserInfo(): Observable<Student> {
    return this.http.get<{ user: Student }>(`${this.apiUrl}`).pipe(
      tap(res => {
        this.currentUserSubject.next(res.user); // Now res.user is typed correctly
      }),
      map(res => res.user)
    );
  }
  

  // Optionally use this to clear user on logout
  clearUserInfo() {
    this.currentUserSubject.next(null);
  }
  
  getAllStudents():Observable<{students:Student[]}>{
    return this.http.get<{students:Student[]}>(`${this.apiUrl}/students`);
  }

  updateStudent(playCenterId: string, formData: FormData): Observable<string> {
    return this.http.put(`${this.apiUrl}/students/${playCenterId}`, formData, { responseType: 'text' });
  }

  
}
