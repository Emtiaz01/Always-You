import { Component, Input, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="countdown-widget">
      <h4>{{ title }}</h4>
      <div class="timer">
        <div>{{ days() }}<span>Days</span></div>
        <div>{{ hours() }}<span>Hours</span></div>
        <div>{{ minutes() }}<span>Minutes</span></div>
        <div>{{ seconds() }}<span>Seconds</span></div>
      </div>
    </div>
  `,
  styles: [`
    .countdown-widget { text-align: center; background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; }
    .timer { display: flex; justify-content: center; gap: 1rem; }
    .timer > div { display: flex; flex-direction: column; font-size: 2rem; }
    .timer > div span { font-size: 0.8rem; }
  `]
})
export class CountdownComponent implements OnInit, OnDestroy {
  @Input() targetDate!: string;
  @Input() title: string = "Countdown";

  days = signal(0);
  hours = signal(0);
  minutes = signal(0);
  seconds = signal(0);

  private intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  updateCountdown() {
    const target = new Date(this.targetDate).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    this.days.set(Math.floor(difference / (1000 * 60 * 60 * 24)));
    this.hours.set(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    this.minutes.set(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
    this.seconds.set(Math.floor((difference % (1000 * 60)) / 1000));
  }
}
