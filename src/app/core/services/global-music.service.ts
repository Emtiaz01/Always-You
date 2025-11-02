import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalMusicService {
  private audio: HTMLAudioElement | null = null;
  
  // Background music playlist
  private playlist = [
    'assets/audio/Dil_Me_Ho_Tum_Lofi.mp3',
    'assets/audio/Tum_Se_Hi_Lofi.mp3',
    'assets/audio/Samjhawa_Lofi.mp3',
    'assets/audio/Ishq_Sufiana_Lofi.mp3',
    'assets/audio/Suroor_Lofi.mp3',
    'assets/audio/Fakira_Lofi.mp3',
  ];
  
  private currentSongIndex = 0;
  public isPlaying = signal(false);
  public currentSong = signal('');
  public volume = signal(0.3); 
  
  constructor() {
    this.initAudio();
  }
  
  private initAudio() {
    this.audio = new Audio();
    this.audio.preload = 'auto';
    this.audio.volume = 0.3; 
    this.currentSong.set(this.playlist[0]);
    this.audio.src = this.playlist[0];
    
    // Auto-play next song when current ends
    this.audio.addEventListener('ended', () => {
      this.playNext();
    });
    
    // Error handling
    this.audio.addEventListener('error', (e) => {
      console.error('Audio loading error:', e);
    });
  }
  
  play() {
    if (this.audio) {
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying.set(true);
          })
          .catch(error => {
            console.error('Error playing audio:', error);
          });
      }
    }
  }
  
  pause() {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying.set(false);
    }
  }
  
  toggle() {
    if (this.isPlaying()) {
      this.pause();
    } else {
      this.play();
    }
  }
  
  playNext() {
    this.currentSongIndex = (this.currentSongIndex + 1) % this.playlist.length;
    this.currentSong.set(this.playlist[this.currentSongIndex]);
    
    if (this.audio) {
      this.audio.src = this.playlist[this.currentSongIndex];
      this.audio.load();
      
      if (this.isPlaying()) {
        this.play();
      }
    }
  }
  
  playPrevious() {
    this.currentSongIndex = (this.currentSongIndex - 1 + this.playlist.length) % this.playlist.length;
    this.currentSong.set(this.playlist[this.currentSongIndex]);
    
    if (this.audio) {
      this.audio.src = this.playlist[this.currentSongIndex];
      this.audio.load();
      
      if (this.isPlaying()) {
        this.play();
      }
    }
  }
  
  setVolume(volume: number) {
    const normalizedVolume = Math.max(0, Math.min(1, volume));
    this.volume.set(normalizedVolume);
    if (this.audio) {
      this.audio.volume = normalizedVolume;
    }
  }
}
