import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isSidebarCollapsed = false;
  isLogged = false;
  username = "";
  role = "";

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(isLogged => {
      this.isLogged = isLogged;

      if (!isLogged && !this.router.url.includes('/login')) {
        this.router.navigate(['/login']);
      }

      this.username = localStorage.getItem('isLogged') || "";
      this.role = localStorage.getItem('role') || "";
      console.log(this.username);
      console.log(this.role);
    });
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
