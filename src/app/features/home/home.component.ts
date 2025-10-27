import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Photo {
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

  greeting = signal('');
  isMusicPlaying = signal(false);
  showChatBubble = signal(false);
  
  // Static photos - Replace these paths with your actual photo paths
  previewPhotos = signal<Photo[]>([
    { url: 'assets/images/timeline/event5.jpg', name: 'Photo 1', caption: 'Beautiful moment' },
    { url: 'assets/images/gallery/gallery2.jpg', name: 'Photo 2', caption: 'Sweet memory' },
    { url: 'assets/images/gallery/gallery1.jpg', name: 'Photo 3', caption: 'Happy times' },
    { url: 'assets/images/timeline/event8.jpg', name: 'Photo 4', caption: 'Forever together' }
  ]);
  
  galleryPhotos = signal<Photo[]>([
    { url: 'assets/images/gallery1.jpg', name: 'Gallery 1', caption: 'Our adventure' },
    { url: 'assets/images/gallery2.jpg', name: 'Gallery 2', caption: 'Precious moment' },
    { url: 'assets/images/gallery3.jpg', name: 'Gallery 3', caption: 'Love story' },
    { url: 'assets/images/gallery4.jpg', name: 'Gallery 4', caption: 'Special day' },
    { url: 'assets/images/gallery5.jpg', name: 'Gallery 5', caption: 'Beautiful us' },
    { url: 'assets/images/gallery6.jpg', name: 'Gallery 6', caption: 'Perfect memory' }
  ]);

  constructor() {}

  async ngOnInit() {
    this.setGreeting();
    
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
