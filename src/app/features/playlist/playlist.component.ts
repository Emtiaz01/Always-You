import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexedDbService } from '../../core/indexed-db.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent implements OnInit {
  playlistUrl = signal<SafeResourceUrl | null>(null);

  constructor(private idb: IndexedDbService, private sanitizer: DomSanitizer) {}

  async ngOnInit() {
    const playlistItems = await this.idb.getAll('playlist') as any[];
    if (playlistItems.length > 0) {
      // For simplicity, using the first one. Ideally, allow selection.
      const firstItem = playlistItems[0];
      if (firstItem.provider === 'spotify') {
        const url = `https://open.spotify.com/embed/playlist/${firstItem.providerId}`;
        this.playlistUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
      }
    }
  }
}
