import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-announcements',
  imports: [NgFor,DatePipe,NgIf],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.scss'
})
export class AnnouncementsComponent {

  userService = inject(UserService);

  userRole: string[] = [];

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe();
  
    this.userService.currentUser$.subscribe(user => {
      if (user && user.roles) {
        this.userRole = user.roles.map((role: any) => role.name);
      }
    });
  }  

  announcements = [
    {
      title: 'Annual Day 🥳',
      description: 'Our fun-filled annual day is on 24th April.',
      date: new Date('2025-04-24')
    },
    {
      title: 'Summer Break ☀️',
      description: 'The school will remain closed from May 1 to June 10 for summer holidays.',
      date: new Date('2025-06-10')
    },
    {
      title: 'Admission Open 📚',
      description: 'Admissions are open for next educational 2025-26 year',
      date: new Date('2025-05-01')
    }
  ];

}
