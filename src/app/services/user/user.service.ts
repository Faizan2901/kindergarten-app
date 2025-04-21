import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl='http://localhost:8080/api/user';

  http=inject(HttpClient);

  getUserInfo():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}`);
  }
  
}
