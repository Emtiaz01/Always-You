import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IndexedDbService } from '../../core/indexed-db.service';

interface Photo {
  id?: number;
  url: string;
  name: string;
  caption: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('bgMusic') bgMusicRef!: ElementRef<HTMLAudioElement>;
  @ViewChild('aboutSection') aboutSectionRef!: ElementRef<HTMLElement>;
  @ViewChild('cursorTrail') cursorTrailRef!: ElementRef<HTMLDivElement>;

  greeting = signal('');
  isMusicPlaying = signal(false);
  showChatBubble = signal(false);
  previewPhotos = signal<Photo[]>([]);
  galleryPhotos = signal<Photo[]>([]);
  
  private cursorHearts: HTMLElement[] = [];

  constructor(private idb: IndexedDbService) {}

  async ngOnInit() {
    this.setGreeting();
    await this.loadPhotos();
    
    // Show chat bubble after 3 seconds
    setTimeout(() => {
      this.showChatBubble.set(true);
      
      // Auto-hide after 8 seconds
      setTimeout(() => {
        this.showChatBubble.set(false);
      }, 8000);
    }, 3000);
  }

  ngAfterViewInit() {
    this.initCursorTrail();
    this.initScrollAnimations();
    
    // Initialize background music
    if (this.bgMusicRef?.nativeElement) {
      const audio = this.bgMusicRef.nativeElement;
      audio.volume = 0.3; // Set to 30% volume
      audio.load();
    }
  }

  setGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) {
      this.greeting.set('Good Morning');
    } else if (hour < 18) {
      this.greeting.set('Good Afternoon');
    } else {
      this.greeting.set('Good Evening');
    }
  }

  async loadPhotos() {
    try {
      const photos = await this.idb.getAllPhotos();
      const mappedPhotos: Photo[] = photos.map(p => ({
        id: p.id ? parseInt(p.id) : undefined,
        url: p.blob ? URL.createObjectURL(p.blob) : '',
        name: p.name || 'Untitled',
        caption: ''
      })).filter(p => p.url);

      // Get 4 random photos for preview collage
      const shuffled = [...mappedPhotos].sort(() => 0.5 - Math.random());
      this.previewPhotos.set(shuffled.slice(0, 4));
      
      // Get 6 photos for gallery slider
      this.galleryPhotos.set(shuffled.slice(0, 6));
    } catch (error) {
      console.error('Error loading photos:', error);
    }
  }

  toggleBackgroundMusic() {
    const audio = this.bgMusicRef?.nativeElement;
    if (!audio) return;

    if (this.isMusicPlaying()) {
      audio.pause();
      this.isMusicPlaying.set(false);
    } else {
      audio.play()
        .then(() => this.isMusicPlaying.set(true))
        .catch(error => {
          console.error('Error playing music:', error);
          alert('Unable to play music. Please check your browser settings.');
        });
    }
  }

  scrollToNextSection() {
    this.aboutSectionRef?.nativeElement?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }

  onPhotoHover(photo: Photo) {
    // Add sparkle effect on hover
    console.log('Hovering over:', photo.name);
  }

  onPhotoLeave() {
    // Remove sparkle effect
  }

  closeChatBubble() {
    this.showChatBubble.set(false);
  }

  private initCursorTrail() {
    if (typeof document === 'undefined') return;

    document.addEventListener('mousemove', (e) => {
      // Create heart trail on random movements
      if (Math.random() > 0.95) {
        this.createCursorHeart(e.clientX, e.clientY);
      }
    });
  }

  private createCursorHeart(x: number, y: number) {
    const heart = document.createElement('div');
    heart.className = 'cursor-heart-trail';
    heart.textContent = '💕';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    document.body.appendChild(heart);

    // Remove after animation
    setTimeout(() => {
      heart.remove();
    }, 1000);
  }

  private initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
      observer.observe(el);
    });
  }
}
