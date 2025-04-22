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
    this.userService.getUserInfo().subscribe({
      next: () => {}
    });

    this.userService.currentUser$.subscribe(user => {
      if (user) {
        this.userRole = user.roles.map((role:any) => role.name);
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
      date: new Date('2025-04-15')
    },
    {
      title: 'Parent-Teacher Meeting 📚',
      description: 'Join us on April 25 for a one-on-one session with your child’s class teacher.',
      date: new Date('2025-04-25')
    }
  ];

}
