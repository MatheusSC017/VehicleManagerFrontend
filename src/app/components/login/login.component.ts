import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  passwordVisible = false;
  errorMessage = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  onSubmit(user: User) {
    this.userService.login(user).subscribe({
      next: (response) => {
        this.authService.login(response.token, user.username, user.role || "USER");
        this.router.navigate(['/veiculos']);
      },
      error: (httpError) => {
        this.errorMessage = true;
      }
    });
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  get passwordInputType(): string {
    return this.passwordVisible ? 'text' : 'password';
  }

  get toggleIcon(): string {
    return this.passwordVisible ? 'fa-eye-slash' : 'fa-eye';
  }

}
