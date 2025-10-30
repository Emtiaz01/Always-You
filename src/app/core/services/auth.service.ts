import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalMusicService } from './global-music.service';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<User | null>(null);
  private readonly USERS_KEY = 'romantic_users';
  private readonly CURRENT_USER_KEY = 'current_user';
  private musicService = inject(GlobalMusicService);

  constructor(private router: Router) {
    this.loadCurrentUser();
  }

  // Get current user as signal
  user() {
    return this.currentUser();
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  // Register new user
  async register(email: string, password: string, name: string): Promise<{ success: boolean; message: string }> {
    try {
      const users = this.getUsers();
      
      // Check if user already exists
      if (users.some(u => u.email === email)) {
        return { success: false, message: 'This heart is already taken! 💔 Try logging in instead.' };
      }

      // Create new user
      const newUser: User & { password: string } = {
        id: this.generateId(),
        email,
        name,
        password: btoa(password), // Simple encoding (use proper hashing in production)
        createdAt: new Date()
      };

      users.push(newUser);
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

      // Auto-login after registration
      const { password: _, ...userWithoutPassword } = newUser;
      this.setCurrentUser(userWithoutPassword);

      return { success: true, message: 'Welcome to our love story! 💕' };
    } catch (error) {
      return { success: false, message: 'Oops! Cupid missed... Try again? 💘' };
    }
  }

  // Login user
  async login(email: string, password: string): Promise<{ success: boolean; message: string }> {
    try {
      const users = this.getUsers();
      const user = users.find(u => u.email === email && u.password === btoa(password));

      if (!user) {
        return { success: false, message: 'Wrong password, troublemaker! 😘 Try again.' };
      }

      const { password: _, ...userWithoutPassword } = user;
      this.setCurrentUser(userWithoutPassword);

      return { success: true, message: 'Welcome back, heartbreaker! 💋' };
    } catch (error) {
      return { success: false, message: 'Something went wrong... Cupid is confused! 💘' };
    }
  }

  // Logout user
  logout(): void {
    this.musicService.pause(); // Stop music on logout
    this.currentUser.set(null);
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.router.navigate(['/login']);
  }

  // Private helper methods
  private getUsers(): (User & { password: string })[] {
    const usersJson = localStorage.getItem(this.USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private setCurrentUser(user: User): void {
    this.currentUser.set(user);
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
  }

  private loadCurrentUser(): void {
    const userJson = localStorage.getItem(this.CURRENT_USER_KEY);
    if (userJson) {
      this.currentUser.set(JSON.parse(userJson));
    }
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
