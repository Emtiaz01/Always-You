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
  @ViewChild('aboutSection') aboutSectionRef!: ElementRef<HTMLElement>;

  previewPhotos = signal<Photo[]>([
    { url: 'assets/images/timeline/event5.jpg', name: 'Photo 1', caption: 'Beautiful moment' },
    { url: 'assets/images/gallery/gallery2.jpg', name: 'Photo 2', caption: 'Sweet memory' },
    { url: 'assets/images/gallery/gallery1.jpg', name: 'Photo 3', caption: 'Happy times' },
    { url: 'assets/images/timeline/event8.jpg', name: 'Photo 4', caption: 'Forever together' }
  ]);
  
  galleryPhotos = signal<Photo[]>([
    { url: 'assets/images/couple/couple4.jpg', name: 'Gallery 1', caption: 'Our adventure' },
    { url: 'assets/images/couple/couple3.jpg', name: 'Gallery 2', caption: 'Precious moment' },
    { url: 'assets/images/gallery/gallery8.jpg', name: 'Gallery 3', caption: 'Love story' },
    { url: 'assets/images/couple/couple1.jpg', name: 'Gallery 4', caption: 'Special day' },
  ]);

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.initCursorTrail();
    this.initScrollAnimations();
  }

  scrollToNextSection() {
    this.aboutSectionRef?.nativeElement?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }

  onPhotoHover(photo: Photo) {
    console.log('Hovering over:', photo.name);
  }

  onPhotoLeave() {
  }

  private initCursorTrail() {
    if (typeof document === 'undefined') return;

    document.addEventListener('mousemove', (e) => {
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
    document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
      observer.observe(el);
    });
  }
}
