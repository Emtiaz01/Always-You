import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="scroll-to-top-cartoon" 
      [class.visible]="showButton()"
      [class.running]="isRunning()"
      (click)="scrollToTop()"
      title="Back to top">
      <div class="cartoon-character">🐰</div>
    </div>
  `,
  styles: [`
    .scroll-to-top-cartoon {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #ffb3d9, #ffc9e3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transform: translateY(100px);
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(255, 179, 217, 0.4);
      z-index: 1000;
      border: 3px solid #fff;
    }

    .scroll-to-top-cartoon.visible {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .scroll-to-top-cartoon:hover {
      transform: translateY(-5px) scale(1.1);
      box-shadow: 0 6px 20px rgba(255, 179, 217, 0.6);
      background: linear-gradient(135deg, #ffc9e3, #ffb3d9);
    }

    .scroll-to-top-cartoon.running {
      animation: runToTop 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .cartoon-character {
      font-size: 2rem;
      animation: bounce 1s ease-in-out infinite;
    }

    .scroll-to-top-cartoon:hover .cartoon-character {
      animation: excited 0.5s ease-in-out infinite;
    }

    .scroll-to-top-cartoon.running .cartoon-character {
      animation: running 0.3s linear infinite;
      transform: scaleX(-1); 
    }

    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-5px);
      }
    }

    @keyframes excited {
      0%, 100% {
        transform: scale(1) rotate(0deg);
      }
      25% {
        transform: scale(1.1) rotate(-10deg);
      }
      75% {
        transform: scale(1.1) rotate(10deg);
      }
    }

    @keyframes running {
      0%, 100% {
        transform: scaleX(-1) translateY(0);
      }
      50% {
        transform: scaleX(-1) translateY(-3px);
      }
    }

    @keyframes runToTop {
      0% {
        bottom: 30px;
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      50% {
        transform: scale(1.2);
      }
      100% {
        bottom: 100vh;
        opacity: 0;
        transform: translateY(-50px) scale(0.5);
      }
    }
    @media (max-width: 768px) {
      .scroll-to-top-cartoon {
        width: 50px;
        height: 50px;
        bottom: 20px;
        right: 20px;
      }

      .cartoon-character {
        font-size: 1.5rem;
      }
    }
  `]
})
export class ScrollToTopComponent {
  showButton = signal(false);
  isRunning = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.showButton.set(scrollPosition > 300);
  }

  scrollToTop() {
    this.isRunning.set(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setTimeout(() => {
      this.isRunning.set(false);
    }, 1000);
  }
}
