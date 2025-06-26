import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from '../../interfaces/error-response';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {
  serverErrors: any = {}
  showPassword = false;
  isStrong = true;
  isMatch = true;


  constructor(private router: Router, private userService: UserService) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  checkPasswordStrength(password: string): boolean {
    let score = 1;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    return score >= 3;
  }

  checkPasswordsMatch(password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
  }

  onSubmit(user: User, confirmPassword: string): void {
    this.isStrong = this.checkPasswordStrength(user.password);
    this.isMatch = this.checkPasswordsMatch(user.password, confirmPassword);

    if (!this.isStrong || !this.isMatch) {
      return;
    }

    this.userService.register(user).subscribe({
      next: () => {
        this.serverErrors = {};
        this.router.navigate(['/veiculos']);
      },
      error: (httpError: HttpErrorResponse) => {
        if (httpError.status === 400 && httpError.error?.errors) {
          const errorResponse = httpError.error as ErrorResponse<User>;
          this.serverErrors = errorResponse.errors;
        } else {
          console.error('Unexpected error:', httpError);
          this.serverErrors = { general: 'Ocorreu um erro inesperado. Tente novamente mais tarde.' };
        }
      }
    });
  }
}
