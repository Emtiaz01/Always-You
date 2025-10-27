import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  photo?: string;
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
})
export class TimelineComponent implements OnInit {
  events = signal<TimelineEvent[]>([
    {
      date: '2020-06-29',
      title: 'First meet after 4 Months!',
      description: 'The day it all began — just one "hi" after four months, and suddenly, everything felt different.',
      photo: 'assets/images/timeline/event1.jpg'
    },
    {
      date: '2020-10-12',
      title: 'Our First Date',
      description: 'Butterflies, nervous laughter, and the beginning of forever.',
      photo: 'assets/images/timeline/event2.jpg'
    },
    {
      date: '2020-11-04',
      title: 'Celebrated Your First Birthday Together',
      description: 'The day I finally got to celebrate you as mine — a moment that still feels like magic.',
      photo: 'assets/images/timeline/event3.jpg'
    },
    {
      date: '2021-12-11',
      title: 'Time when I used to get up early just to meet you',
      description: 'Waking up early was never this exciting until I met you.',
      photo: 'assets/images/timeline/event12.jpg'
    },
    {
      date: '2022-01-21',
      title: 'Photo that made me Cry',
      description: 'One picture, a thousand memories — and a flood of emotions I’ll never forget.',
      photo: 'assets/images/timeline/event6.jpg'
    },
    {
      date: '2022-05-03',
      title: 'Came for Breakup, Stayed for Love',
      description: 'Planned to say goodbye, but love refused to let go.',
      photo: 'assets/images/timeline/event8.jpg'
    },
    {
      date: '2022-08-23',
      title: 'Our First Trip Together',
      description: 'Adventures with you are my favorite kind of memories.',
      photo: 'assets/images/timeline/event4.jpg'
    },
    {
      date: '2023-10-27',
      title: 'The Day I Asked for Forever💍',
      description: 'Nervous heart, steady love.',
      photo: 'assets/images/timeline/event7.jpg'
    },
    {
      date: '2024-08-05',
      title: 'We have celebrated the National Victory together',
      description: 'A day of pride and joy, made even more special with you by my side.',
      photo: 'assets/images/timeline/event11.jpg'
    },
    {
      date: '2025-01-10',
      title: 'Killer Look That Shook My Heart',
      description: 'That look you gave me — unforgettable and heart-stopping.',
      photo: 'assets/images/timeline/event10.jpg'
    },
    {
      date: '2025-03-31',
      title: 'First Eid Together',
      description: 'Our first Eid together — where joy, love, and a little chaos felt just like home.',
      photo: 'assets/images/timeline/event5.jpg'
    }
    
  ]);

  constructor() {}

  ngOnInit(): void {
    // Events are already sorted by date in the array above
    // If you add events randomly, uncomment this:
    // const sorted = [...this.events()].sort((a, b) => 
    //   new Date(a.date).getTime() - new Date(b.date).getTime()
    // );
    // this.events.set(sorted);
  }
}
