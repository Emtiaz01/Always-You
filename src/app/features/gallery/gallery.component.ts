import { Component, OnInit, AfterViewInit, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexedDbService } from '../../core/indexed-db.service';

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
  blob?: Blob;
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

  photos = signal<GalleryPhoto[]>([]);
  herPhotos = signal<GalleryPhoto[]>([]);
  couplePhotos = signal<GalleryPhoto[]>([]);
  videoMemories = signal<GalleryPhoto[]>([]);
  
  isMusicPlaying = signal(false);
  showEasterEgg = signal(false);
  easterEggPhoto = signal<GalleryPhoto | null>(null);
  showSurpriseModal = signal(false);
  surprisePhoto = signal<GalleryPhoto | null>(null);

  constructor(private idb: IndexedDbService) {}

  async ngOnInit() {
    await this.loadPhotos();
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

  async loadPhotos() {
    try {
      const photoList = await this.idb.getAllPhotos();
      const mappedPhotos: GalleryPhoto[] = photoList.map(p => ({
        id: parseInt(p.id),
        url: p.blob ? URL.createObjectURL(p.blob) : '',
        name: p.name || 'Untitled',
        caption: this.getRandomCaption('her'),
        date: this.formatDate(p.uploadedAt ? new Date(p.uploadedAt) : undefined),
        memory: this.getRandomMemory(),
        category: 'couple',
        blob: p.blob
      }));

      this.photos.set(mappedPhotos);
      
      // Split photos into categories (for now, use all as couple photos)
      // In a real app, you'd store category in IndexedDB
      const half = Math.floor(mappedPhotos.length / 2);
      this.herPhotos.set(mappedPhotos.slice(0, half).map(p => ({ ...p, category: 'her' as const })));
      this.couplePhotos.set(mappedPhotos.slice(half).map(p => ({ ...p, category: 'couple' as const })));
      
      // Mark some as special Easter eggs
      if (this.herPhotos().length > 0) {
        const specialIndex = Math.floor(Math.random() * this.herPhotos().length);
        const updatedHerPhotos = [...this.herPhotos()];
        updatedHerPhotos[specialIndex] = {
          ...updatedHerPhotos[specialIndex],
          isSpecial: true,
          specialMessage: "This was the exact moment I realized I was in love with you ❤️"
        };
        this.herPhotos.set(updatedHerPhotos);
      }
    } catch (error) {
      console.error('Error loading photos:', error);
    }
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

  private formatDate(date: Date | undefined): string {
    if (!date) return 'A special day';
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }

  private getRandomCaption(category: 'her' | 'couple'): string {
    const herCaptions = [
      "The smile that made my world stop.",
      "I swear this one's my favorite… until the next one.",
      "How can someone look this perfect without even trying?",
      "This is the photo I look at when I miss you.",
      "You don't even know how beautiful you are.",
      "This moment, frozen in time, makes me smile every day."
    ];

    const coupleCaptions = [
      "Our first date… we were so shy 😭",
      "You laughed so hard that day, and I knew I wanted that forever.",
      "This trip changed everything.",
      "Every picture of us feels like home.",
      "The day we couldn't stop smiling.",
      "My favorite memory with my favorite person."
    ];

    const captions = category === 'her' ? herCaptions : coupleCaptions;
    return captions[Math.floor(Math.random() * captions.length)];
  }

  private getRandomMemory(): string {
    const memories = [
      "Our first date… we were so shy 😭",
      "You laughed so hard that day, and I knew I wanted that forever.",
      "This trip changed everything.",
      "Every picture of us feels like home.",
      "The best day with the best person.",
      "I'll never forget this moment."
    ];
    return memories[Math.floor(Math.random() * memories.length)];
  }
}
