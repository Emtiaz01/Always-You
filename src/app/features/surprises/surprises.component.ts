import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-surprises',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './surprises.component.html',
  styleUrls: ['./surprises.component.css'],
})
export class SurprisesComponent {
  currentPhase = signal(0); // 0: intro, 1: video, 2: jar, 3: gift, 4: finale
  showIntro = signal(true);
  showHeartButton = signal(false);
  showVideo = signal(false);
  showVideoNext = signal(false);
  showJar = signal(false);
  showLoveNote = signal(false);
  currentLoveNote = signal('');
  jarClickCount = signal(0);
  showSecretGift = signal(false);
  showCollage = signal(false);
  showCollageNext = signal(false);
  showFinale = signal(false);
  showKissAnimation = signal(false);
  showHiddenStar = signal(true);
  showStarMessage = signal(false);
  showFlyingNotes = signal(false);
  jarOpened = signal(false);

  loveNotes = [
    "I love the way you smile when you're trying not to laugh.",
    "You make ordinary moments feel magical.",
    "You're my peace in every storm.",
    "Your voice feels like home.",
    "You made me believe in forever.",
    "You're literally my favorite person in this whole universe.",
    "You don't even try — and still, you're the most beautiful person I've ever seen.",
    "You make my bad days good, and my good days unforgettable.",
    "You're my 'what if everything goes right.'",
    "You're not just my person — you're my heart, walking outside my body.",
    "Every moment with you feels like a dream I never want to wake up from.",
    "You're the reason I believe in magic.",
    "Your laugh is my favorite sound in the entire world.",
    "You make me want to be better, just by being you.",
    "I could listen to you talk about anything for hours.",
    "You're my safe place, my home, my everything.",
    "You turn my chaos into calm.",
    "I love how you see the world — with kindness and wonder.",
    "You're the best part of every single day.",
    "I fall in love with you all over again, every single day."
  ];

  collageImages = [
    { url: 'https://via.placeholder.com/400x300.png?text=Our+First+Photo', caption: 'Remember this day?' },
    { url: 'https://via.placeholder.com/400x300.png?text=That+Silly+Moment', caption: "We didn't know it then, but that moment became my favorite memory." },
    { url: 'https://via.placeholder.com/400x300.png?text=Your+Smile', caption: 'You were laughing at something dumb I said… and I fell for you again.' }
  ];

  ngOnInit() {
    // Show heart button after 3 seconds
    setTimeout(() => {
      this.showHeartButton.set(true);
    }, 3000);
  }

  // startVideo() {
  //   // Keep intro visible, just hide the button
  //   this.showHeartButton.set(false);
  //   this.showVideo.set(true);
  //   this.currentPhase.set(1);
    
  //   // Show "next" button after video (simulating video end after 5 seconds)
  //   setTimeout(() => {
  //     this.showVideoNext.set(true);
  //   }, 5000);
  // }

  goToJar() {
    // Keep video visible, just hide the next button
    this.showHeartButton.set(false);
    this.showVideoNext.set(false);
    this.showJar.set(true);
    this.currentPhase.set(2);
  }

  openJar() {
    if (this.jarOpened()) return; // Prevent multiple clicks
    
    this.jarOpened.set(true);
    this.showFlyingNotes.set(true);
    
    // After notes fly out animation (3 seconds), show the secret gift unlock
    setTimeout(() => {
      this.showSecretGift.set(true);
    }, 3000);
  }

  closeLoveNote() {
    this.showLoveNote.set(false);
  }

  openSecretGift() {
    // Keep jar and notes visible
    this.showSecretGift.set(false);
    // this.showCollage.set(true);
    this.currentPhase.set(3);
    
    // Show next button after collage (after 8 seconds)
    setTimeout(() => {
      this.showFinale.set(true);
    }, 8000);
  }

  goToFinale() {
    // Keep collage visible
    this.showCollageNext.set(false);
    this.showFinale.set(true);
    this.currentPhase.set(4);
  }

  sendKiss() {
    this.showKissAnimation.set(true);
    setTimeout(() => {
      this.showKissAnimation.set(false);
    }, 1500); // Match animation duration
  }

  foundHiddenStar() {
    this.showHiddenStar.set(false);
    this.showStarMessage.set(true);
    
    setTimeout(() => {
      this.showStarMessage.set(false);
    }, 5000);
  }
}
