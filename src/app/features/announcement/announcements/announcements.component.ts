import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { Announcement } from '../../../dto/announcement.interface';
import { AnnouncementService } from '../../../services/announcement/announcement.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-announcements',
  imports: [DatePipe,FormsModule,CommonModule],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.scss'
})
export class AnnouncementsComponent {

  userService = inject(UserService);

  userRole: string[] = [];

  announcementService = inject(AnnouncementService);

  announcements: Announcement[] = [];

  showForm = false;

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe();
  
    this.userService.currentUser$.subscribe(user => {
      if (user && user.roles) {
        this.userRole = user.roles.map((role: any) => role.name);
      }
    });
    this.loadAnnouncements();
  }  

  loadAnnouncements() {
    this.announcementService.getAnnouncements().subscribe(
      (response: Announcement[]) => {
        this.announcements = response;
        console.log('Announcements loaded:', this.announcements);
      },
      (error) => {
        console.error('Error loading announcements:', error);
      }
    );
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  newAnnouncement = {
    id: '',
    title: '',
    description: '',
    date: ''
  };

  addAnnouncement() {
    if(this.newAnnouncement.title && this.newAnnouncement.description && this.newAnnouncement.date) {
      const newAnn = {
        ...this.newAnnouncement,
        date: new Date(this.newAnnouncement.date)
      };
      this.announcements.push(newAnn);
      this.announcementService.addAnnouncement(newAnn).subscribe(
        (response) => {
          console.log('New announcement added:', response);
          this.loadAnnouncements();
        },
        (error) => {
          console.error('Error adding announcement:', error);
        }
      );
      this.newAnnouncement = {id:'', title: '', description: '', date: '' };
      this.showForm = false;
    }
  }


  deleteAnnouncement(note: Announcement): void {
    this.announcementService.deleteAnnouncement(note.id).subscribe(
      () => {
        console.log('Announcement deleted:', note.id);
        this.loadAnnouncements();
      },
      (error) => {
        console.error('Error deleting announcement:', error);
      }
    );
  }
  

}
