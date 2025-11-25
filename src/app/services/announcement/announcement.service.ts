import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Announcement } from '../../dto/announcement.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  http=inject(HttpClient);

  private baseUrl = 'http://localhost:8090/api/announcement';

  getAnnouncements():Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${this.baseUrl}`,{withCredentials:true});
  }

  addAnnouncement (announcement: Announcement): Observable<Announcement> {
    return this.http.post<Announcement>(`${this.baseUrl}`, announcement,{withCredentials:true});
  }

  deleteAnnouncement(id: string){
    return this.http.delete(`${this.baseUrl}/${id}`,{withCredentials:true});
  } 

}
