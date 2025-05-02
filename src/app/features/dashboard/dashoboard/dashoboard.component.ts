import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashoboard',
  imports: [NgIf,RouterLink],
  templateUrl: './dashoboard.component.html',
  styleUrl: './dashoboard.component.scss'
})
export class DashoboardComponent implements OnInit{

  userService = inject(UserService);

  user: any = {};
  userRole: string[] = [];

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe();
  
    this.userService.currentUser$.subscribe(user => {
      if (user) {
        this.user = user;
        if (user.roles && Array.isArray(user.roles)) {
          this.userRole = user.roles.map((role: any) => role.name);
        } else {
          this.userRole = [];
        }
      }
    });
  }
  
  

}
