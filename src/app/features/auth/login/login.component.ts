import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = signal('');
  password = signal('');
  errorMessage = signal('');
  isLoading = signal(false);
  showPassword = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onSubmit(): Promise<void> {
    if (!this.email() || !this.password()) {
      this.errorMessage.set('Fill in your details, cutie! 💕');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const result = await this.authService.login(this.email(), this.password());

    this.isLoading.set(false);

    if (result.success) {
      // Show success animation
      this.showSuccessHearts();
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1500);
    } else {
      this.errorMessage.set(result.message);
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }

  private showSuccessHearts(): void {
    const container = document.querySelector('.auth-container');
    if (!container) return;

    for (let i = 0; i < 15; i++) {
      const heart = document.createElement('div');
      heart.className = 'success-heart';
      heart.textContent = ['💖', '💕', '💗', '💓', '💝'][Math.floor(Math.random() * 5)];
      heart.style.left = Math.random() * 100 + '%';
      heart.style.animationDelay = (i * 0.1) + 's';
      container.appendChild(heart);

      setTimeout(() => heart.remove(), 3000);
    }
  }
}
