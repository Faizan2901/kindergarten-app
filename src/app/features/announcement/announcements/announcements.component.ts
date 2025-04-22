import { DatePipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-announcements',
  imports: [NgFor,DatePipe],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.scss'
})
export class AnnouncementsComponent {

  announcements = [
    {
      title: 'Annual Sports Day 🎽',
      description: 'Our fun-filled sports day is on 28th April. Don’t forget to wear your sports uniform!',
      date: new Date('2025-04-28')
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
