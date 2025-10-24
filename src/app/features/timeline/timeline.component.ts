import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexedDbService } from '../../core/indexed-db.service';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
})
export class TimelineComponent implements OnInit {
  events = signal<Array<any>>([]);

  constructor(private idb: IndexedDbService) {}

  async ngOnInit(): Promise<void> {
    const list = await this.idb.getAllTimeline();
    // sort by date
    list.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    this.events.set(list);
  }
}
