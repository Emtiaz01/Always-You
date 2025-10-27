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


  herPhotos = signal<GalleryPhoto[]>([
    { id: 1, url: 'assets/images/her/her4.jpg', name: 'Her Eyes', caption: 'Your eyes don’t just see — they light up my entire world.', date: 'Jan 2024', memory: 'Beautiful moment', category: 'her' },
    { id: 2, url: 'assets/images/her/her2.jpg', name: 'Pure Beauty', caption: 'Natural and perfect', date: 'Feb 2024', memory: 'Candid shot', category: 'her' },
    { id: 3, url: 'assets/images/her/her3.jpg', name: 'Radiant', caption: 'This look is indescribable', date: 'Mar 2024', memory: 'Happy vibes', category: 'her', isSpecial: true, specialMessage: "This was the exact moment I realized I was in love with you ❤️" },
  ]);

  couplePhotos = signal<GalleryPhoto[]>([
    { id: 1, url: 'assets/images/couple/couple1.jpg', name: 'Sunset Love', caption: 'Golden hour with you', date: 'Oct 2022', memory: 'Roof Top sunset', category: 'couple' },
    { id: 2, url: 'assets/images/couple/couple4.jpg', name: 'Love Notes', caption: 'Every moment counts', date: 'Nov 2022', memory: 'Unofficial Engagement', category: 'couple' },
    { id: 3, url: 'assets/images/couple/couple2.jpg', name: 'Together', caption: 'Our one of the best moments', date: 'March 2025', memory: 'Perfect day', category: 'couple' },
    { id: 4, url: 'assets/images/couple/couple3.jpg', name: 'New place Exploration', caption: 'Made memories together', date: 'Apr 2025', memory: '3D Art Gallery', category: 'couple', surpriseNote: '🎁 Hidden surprise: Check the letters page!' },
  ]);


  specialPhotos = signal<GalleryPhoto[]>([
    { id: 1, url: 'assets/images/special/special1.jpg', name: 'Sharee Punjabi Date', caption: 'First Sharee Punjabi outing with you', date: 'Dec 2024', memory: 'Sharee Punjabi butterflies', category: 'couple' },
    { id: 2, url: 'assets/images/special/special2.jpg', name: 'A cup of Tea', caption: 'First Tong Tea with YOU', date: 'Jul 2024', memory: 'Tea time memories', category: 'couple' },
    { id: 3, url: 'assets/images/special/special3.jpg', name: 'Following the Trend', caption: 'Following the TREND!', date: 'Mar 2025', memory: 'Trend Time', category: 'couple' },

  ]);

  surpriseOnlyPhotos = signal<GalleryPhoto[]>([
    { id: 1, url: 'assets/images/surprise/surprise1.jpg', name: 'Hidden Gem', caption: 'A secret moment just for you', date: 'Jan 2024', memory: 'Special surprise', category: 'couple' },
    { id: 2, url: 'assets/images/surprise/surprise2.jpg', name: 'Secret Smile', caption: 'This one is just between us', date: 'Feb 2024', memory: 'Hidden memory', category: 'her' },
    { id: 3, url: 'assets/images/surprise/surprise3.jpg', name: 'Mystery Moment', caption: 'You never saw this one coming', date: 'Mar 2024', memory: 'Surprise memory', category: 'couple' },
  ]);
  
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

    if (this.bgMusicRef?.nativeElement) {
      const audio = this.bgMusicRef.nativeElement;
      audio.addEventListener('loadeddata', () => {
        console.log('Audio loaded successfully');
      });
      
      audio.addEventListener('error', (e) => {
        console.error('Audio loading error:', e);
        console.error('Audio error details:', audio.error);
      });
      audio.load();
    }
  }

  loadPhotos() {

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
    // Combine gallery photos AND surprise-only photos for the random surprise
    const allPhotos = [
      ...this.surpriseOnlyPhotos()  // Hidden photos that only appear in surprises!
    ];
    if (allPhotos.length === 0) return;
    
    const surpriseMessages = [
      "Every time I look at this photo, I fall in love all over again. 💖",
      "I keep this photo close to my heart, always. 🌹",
      "This smile? This is what happiness looks like to me. 😊",
      "Looking at this makes me realize how lucky I am. 🍀",
      "I didn't take enough photos this day, but this one says everything. 📸",
      "This moment right here? This is when time stood still. ⏰💫",
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
