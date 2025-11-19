import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {


  ngOnInit() {
  console.log("Signal value =", this.isLoggedIn());
}


  authService = inject(AuthService);
  router = inject(Router);

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // 🔥 Signal-based auth state
  isLoggedIn = this.authService.loggedIn;

  logout() {
    console.log('Logging out...');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  handleMenuClick(event: Event) {
    const target = event.target as HTMLElement;
    if (target.tagName.toLowerCase() === 'a') {
      this.menuOpen = false;
    }
  }
}
