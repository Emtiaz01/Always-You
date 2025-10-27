import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    // Replace this with your actual Spotify playlist ID
    // To get it: Open your playlist on Spotify > Share > Copy Playlist Link
    // Extract the ID from the URL: https://open.spotify.com/playlist/YOUR_PLAYLIST_ID
    const spotifyPlaylistId = '37i9dQZF1DXcBWIGoYBM5M'; // Example playlist
    
    const url = `https://open.spotify.com/embed/playlist/${spotifyPlaylistId}`;
    this.playlistUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
    
    // Alternative: Use YouTube playlist
    // const youtubePlaylistId = 'YOUR_YOUTUBE_PLAYLIST_ID';
    // const url = `https://www.youtube.com/embed/videoseries?list=${youtubePlaylistId}`;
    // this.playlistUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
  }
}
