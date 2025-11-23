import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
// import { DashboardService } from '../../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashoboard',
  imports: [NgIf,RouterLink],
  templateUrl: './dashoboard.component.html',
  styleUrl: './dashoboard.component.scss'
})
export class DashoboardComponent implements OnInit{

  userService = inject(UserService);
  // dashBoardService=inject(DashboardService);

  user: any = {};
  userRole: string[] = [];

  // ngOnInit(): void {
  //   this.userService.getUserInfo().subscribe();
  
  //   this.userService.currentUser$.subscribe(user => {
  //     if (user) {
  //       this.user = user;
  //       if (user.roles && Array.isArray(user.roles)) {
  //         this.userRole = user.roles.map((role: any) => role.name);
  //         console.log('User Roles:', this.userRole);
  //       } else {
  //         this.userRole = [];
  //       }
  //     }
  //   });
  // }
  


constructor(private cookieService: CookieService) {}

ngOnInit() {
  const roles = this.cookieService.get('PASSID');
  console.log('Roles from cookie string:', roles);

    if (roles) {
    const decoded = atob(roles);    // Base64 decode
    this.userRole = JSON.parse(decoded);  // parse JSON
  } else {
    this.userRole = [];
  }
  
  // this.dashBoardService.getHello().subscribe({
  //   next: (response) => {
  //     console.log('Dashboard Info:', response.message);
  //   },
  //   error: (err) => {
  //     console.log(err.error.message);
  //     alert(err.error.message);
  //   }
  // });

  console.log('Roles from cookie:', this.userRole);
}




}
