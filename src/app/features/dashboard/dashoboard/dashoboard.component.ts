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

  userService=inject(UserService);

  user:any=[];
  userRole: string = '';

  ngOnInit(): void {
   this.userService.getUserInfo().subscribe(
    {
      next:(res)=>{
        this.user = res.user;
        this.userRole = this.user.roles[0]?.name || '';
        console.log(this.user);
      },
      error:(err)=>{
        alert(err.error);
      }
    }
   )
  }

  

}
