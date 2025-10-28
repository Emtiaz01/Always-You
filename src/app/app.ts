import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { ScrollToTopComponent } from './shared/scroll-to-top/scroll-to-top.component';
import { GlobalMusicService } from './core/services/global-music.service';
import { AuthService } from './core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ScrollToTopComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-girlfriend-site');
  showVolumeSlider = signal(false);
  
  constructor(
    public musicService: GlobalMusicService,
    public authService: AuthService
  ) {}
  
  toggleMusic() {
    this.musicService.toggle();
  }
  
  onVolumeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const volume = parseFloat(target.value);
    this.musicService.setVolume(volume);
  }
  
  toggleVolumeSlider() {
    this.showVolumeSlider.set(!this.showVolumeSlider());
  }
  
  nextSong() {
    this.musicService.playNext();
  }
  
  previousSong() {
    this.musicService.playPrevious();
  }

  logout() {
    this.authService.logout();
  }
}
