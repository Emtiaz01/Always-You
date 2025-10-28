import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = signal('');
  email = signal('');
  password = signal('');
  confirmPassword = signal('');
  errorMessage = signal('');
  isLoading = signal(false);
  showPassword = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onSubmit(): Promise<void> {
    // Validation
    if (!this.name() || !this.email() || !this.password() || !this.confirmPassword()) {
      this.errorMessage.set('Fill all fields, cutie! We need to know you better 💕');
      return;
    }

    if (this.password() !== this.confirmPassword()) {
      this.errorMessage.set('Passwords do not match! Even soulmates need to sync 💔');
      return;
    }

    if (this.password().length < 6) {
      this.errorMessage.set('Password too short! Make it at least 6 characters 🔐');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const result = await this.authService.register(
      this.email(),
      this.password(),
      this.name()
    );

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

    for (let i = 0; i < 20; i++) {
      const heart = document.createElement('div');
      heart.className = 'success-heart';
      heart.textContent = ['💖', '💕', '💗', '💓', '💝', '💘'][Math.floor(Math.random() * 6)];
      heart.style.left = Math.random() * 100 + '%';
      heart.style.animationDelay = (i * 0.1) + 's';
      container.appendChild(heart);

      setTimeout(() => heart.remove(), 3000);
    }
  }
}
