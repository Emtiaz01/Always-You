import { Component, OnInit, AfterViewInit, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface GalleryPhoto {
  id?: number;
  url: string;
  name: string;
  caption: string;
  date?: string;
  memory?: string;
  category: 'her' | 'couple' | 'video';
  isSpecial?: boolean;
  specialMessage?: string;
  surpriseNote?: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit, AfterViewInit {
  @ViewChild('bgMusic') bgMusicRef!: ElementRef<HTMLAudioElement>;
  @ViewChild('hiddenAudio') hiddenAudioRef!: ElementRef<HTMLAudioElement>;

  // Add your photos manually here
  photos = signal<GalleryPhoto[]>([
    { id: 1, url: 'assets/images/gallery/photo1.jpg', name: 'Beautiful Smile', caption: 'Your smile lights up my world', date: 'Jan 2024', memory: 'First date vibes', category: 'her' },
    { id: 2, url: 'assets/images/gallery/photo2.jpg', name: 'Together', caption: 'Us against the world', date: 'Feb 2024', memory: 'Perfect day', category: 'couple' },
    { id: 3, url: 'assets/images/gallery/photo3.jpg', name: 'Sunset Love', caption: 'Golden hour with you', date: 'Mar 2024', memory: 'Beach sunset', category: 'couple' },
    { id: 4, url: 'assets/images/gallery/photo4.jpg', name: 'Pure Joy', caption: 'This laugh is everything', date: 'Apr 2024', memory: 'Spontaneous fun', category: 'her', isSpecial: true, specialMessage: "This was the exact moment I realized I was in love with you ❤️" },
    { id: 5, url: 'assets/images/gallery/photo5.jpg', name: 'Adventure Time', caption: 'Making memories together', date: 'May 2024', memory: 'Road trip', category: 'couple' },
    { id: 6, url: 'assets/images/gallery/photo6.jpg', name: 'Candid Beauty', caption: 'Natural and perfect', date: 'Jun 2024', memory: 'Coffee date', category: 'her' },
    { id: 7, url: 'assets/images/gallery/photo7.jpg', name: 'Love Notes', caption: 'Every moment counts', date: 'Jul 2024', memory: 'Lazy Sunday', category: 'couple', surpriseNote: '🎁 Hidden surprise: Check the letters page for a special message!' },
    { id: 8, url: 'assets/images/gallery/photo8.jpg', name: 'Forever Vibes', caption: 'This is what forever looks like', date: 'Aug 2024', memory: 'Anniversary', category: 'couple' },
    // Add more photos here...
  ]);
  
  herPhotos = signal<GalleryPhoto[]>([]);
  couplePhotos = signal<GalleryPhoto[]>([]);
  videoMemories = signal<GalleryPhoto[]>([]);
  
  isMusicPlaying = signal(false);
  showEasterEgg = signal(false);
  easterEggPhoto = signal<GalleryPhoto | null>(null);
  showSurpriseModal = signal(false);
  surprisePhoto = signal<GalleryPhoto | null>(null);

  constructor() {}

  ngOnInit() {
    this.loadPhotos();
  }

  ngAfterViewInit() {
    // Check if audio element is properly initialized
    if (this.bgMusicRef?.nativeElement) {
      const audio = this.bgMusicRef.nativeElement;
      
      // Add event listeners for debugging
      audio.addEventListener('loadeddata', () => {
        console.log('Audio loaded successfully');
      });
      
      audio.addEventListener('error', (e) => {
        console.error('Audio loading error:', e);
        console.error('Audio error details:', audio.error);
      });

      // Try to load the audio
      audio.load();
    }
  }

  loadPhotos() {
    // Split photos by category
    const allPhotos = this.photos();
    this.herPhotos.set(allPhotos.filter(p => p.category === 'her'));
    this.couplePhotos.set(allPhotos.filter(p => p.category === 'couple'));
    this.videoMemories.set(allPhotos.filter(p => p.category === 'video'));
  }

  toggleMusic() {
    const audio = this.bgMusicRef?.nativeElement;
    
    if (!audio) {
      console.error('Audio element not found');
      return;
    }

    if (this.isMusicPlaying()) {
      audio.pause();
      this.isMusicPlaying.set(false);
    } else {
      // Try to play and handle any errors
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Audio playing successfully');
            this.isMusicPlaying.set(true);
          })
          .catch(error => {
            console.error('Error playing audio:', error);
            alert('Unable to play audio. Please check:\n1. Audio file exists\n2. File path is correct\n3. Browser allows audio playback');
            this.isMusicPlaying.set(false);
          });
      }
    }
  }

  onPhotoClick(photo: GalleryPhoto, category: string) {
    if (photo.isSpecial) {
      this.easterEggPhoto.set(photo);
      this.showEasterEgg.set(true);
      
      // Play hidden audio if available
      setTimeout(() => {
        const hiddenAudio = this.hiddenAudioRef?.nativeElement;
        if (hiddenAudio) {
          hiddenAudio.play().catch(error => {
            console.error('Error playing easter egg audio:', error);
          });
        }
      }, 500);
    }
  }

  onPhotoHover(photo: GalleryPhoto) {
    // Add hover sound effect if desired
    // Could play a subtle camera shutter sound
  }

  onVideoHover(video: GalleryPhoto) {
    // Auto-play video on hover (muted)
    const videoElements = document.querySelectorAll('.video-item video');
    videoElements.forEach((el: any) => {
      if (el.src === video.url) {
        el.play();
      }
    });
  }

  onVideoLeave(video: GalleryPhoto) {
    // Pause video when mouse leaves
    const videoElements = document.querySelectorAll('.video-item video');
    videoElements.forEach((el: any) => {
      if (el.src === video.url) {
        el.pause();
        el.currentTime = 0;
      }
    });
  }

  showRandomSurprise() {
    const allPhotos = [...this.herPhotos(), ...this.couplePhotos()];
    if (allPhotos.length === 0) return;
    
    const surpriseMessages = [
      "This one's the moment I fell for you, but didn't realize it yet. 💕",
      "Every time I look at this photo, I fall in love all over again. 💖",
      "This is the exact moment I knew you were the one. ✨",
      "I keep this photo close to my heart, always. 🌹",
      "This smile? This is what happiness looks like to me. 😊",
      "Looking at this makes me realize how lucky I am. 🍀",
      "This is my favorite version of us - genuine, happy, together. 💑",
      "I didn't take enough photos this day, but this one says everything. 📸",
      "This moment right here? This is when time stood still. ⏰💫",
      "I showed this photo to everyone because I'm that proud to be yours. 🥰",
      "Remember this day? I still smile thinking about it. 😌",
      "This is the photo I look at when I need a reason to smile. 🌟",
      "You have no idea how beautiful you are in this picture. 👑",
      "This captures everything I love about you in one frame. 💝",
      "I wish I could go back to this moment and relive it forever. 🕰️"
    ];
    
    const randomIndex = Math.floor(Math.random() * allPhotos.length);
    const randomMessageIndex = Math.floor(Math.random() * surpriseMessages.length);
    const randomPhoto = {
      ...allPhotos[randomIndex],
      surpriseNote: surpriseMessages[randomMessageIndex]
    };
    
    this.surprisePhoto.set(randomPhoto);
    this.showSurpriseModal.set(true);
  }

  closeEasterEgg() {
    this.showEasterEgg.set(false);
    this.easterEggPhoto.set(null);
    this.hiddenAudioRef?.nativeElement?.pause();
  }

  closeSurprise() {
    this.showSurpriseModal.set(false);
    this.surprisePhoto.set(null);
  }
}
