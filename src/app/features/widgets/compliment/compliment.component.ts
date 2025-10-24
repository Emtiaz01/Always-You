import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compliment',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="compliment-widget">
      <h4>Daily Compliment</h4>
      <p>"{{ compliment() }}"</p>
    </div>
  `,
  styles: [`
    .compliment-widget { text-align: center; background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; }
    p { font-style: italic; }
  `]
})
export class ComplimentComponent {
  compliments = [
    "You are the sunshine of my life.",
    "Your smile brightens up my day.",
    "You have the most beautiful eyes.",
    "I love your sense of humor.",
    "You are incredibly smart."
  ];
  compliment = signal(this.compliments[Math.floor(Math.random() * this.compliments.length)]);
}
