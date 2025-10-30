import { Component, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Song {
  id: number;
  title: string;
  subtitle: string;
  message: string;
  audioUrl: string;
  coverImage: string;
  lyrics?: string[];
}

interface FeaturedSong {
  title: string;
  description: string;
  audioUrl: string;
  coverImage: string;
}

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent implements OnDestroy {
  currentlyPlaying = signal<number | null>(null);
  isListeningMode = signal(false);
  showSecretSong = signal(false);
  featuredPlaying = signal(false);
  secretPlaying = signal(false);

  // Audio elements
  private currentAudio: HTMLAudioElement | null = null;
  private featuredAudio: HTMLAudioElement | null = null;
  private secretAudio: HTMLAudioElement | null = null;

  // Main song collection
  songs = signal<Song[]>([
    {
      id: 1,
      title: 'Forever Mine',
      subtitle: 'This one always reminds me of you',
      message: 'Recorded on a night I could not stop thinking about you.',
      audioUrl: 'assets/audio/recorded/Tum_Se_hi_Emon.mp3',
      coverImage: 'assets/images/cover/cover.png',
      lyrics: ['Every moment with you', 'Feels like forever', 'And I never want it to end']
    },
    {
      id: 2,
      title: 'I need you in my life forever.',
      subtitle: 'Wherever I go, Whatever I do, I just need you by my side.',
      message: 'Recorded why I really thinking that you are the one for me.',
      audioUrl: 'assets/audio/recorded/Phir_Bhi_Tumko_Chahunga_Emon.mp3',
      coverImage: 'assets/images/cover/cover2.jpg',
      lyrics: ['Under moonlight I confess', 'You are my everything', 'Forever and always']
    },
    {
      id: 3,
      title: 'Your Last wished song',
      subtitle: 'This one you asked me to record for you.',
      message: 'I tried my best to make it perfect for you.',
      audioUrl: 'assets/audio/recorded/Darale_Duare_Mor_Emon.mp3',
      coverImage: 'assets/images/cover/cover3.jpg',
      lyrics: ['Your smile lights up my world', 'Like sunshine through the rain']
    },
    {
      id: 4,
      title: 'Distance Does Not Matter',
      subtitle: 'This song describes how I feel you even if we are apart.',
      message: 'For all the times we are apart but my heart is always with you.',
      audioUrl: 'assets/audio/recorded/Kheriat_Emon.mp3',
      coverImage: 'assets/images/cover/cover4.jpg',
      lyrics: ['Miles may separate us', 'But love keeps us together']
    },
    {
      id: 5,
      title: 'Why I always think about You?',
      subtitle: 'Nothing But Us',
      message: 'The song I just recoreded to tell you why I always think about you so much.',
      audioUrl: 'assets/audio/recorded/Tum_Kiyu_Chaleateho_Emon.mp3',
      coverImage: 'assets/images/cover/cover5.png',
      lyrics: ['This is our song', 'Written in the stars', 'Just for you and me']
    },
    {
      id: 6,
      title: 'Why I always Love You?',
      subtitle: 'This song always speaks about my love for you.',
      message: 'No matter what happens, it will always be you.',
      audioUrl: 'assets/audio/recorded/Samjhawa_Emon.mp3',
      coverImage: 'assets/images/cover/cover6.jpg',
      lyrics: ['In every lifetime', 'In every universe', 'It will always be you']
    },
    {
      id: 7,
      title: 'Words when we have a fight',
      subtitle: 'We have a lots of fights but my love for you never changes.',
      message: 'After every argument, I want you to hear this song and remember how deeply you are ingrained in my heart.',
      audioUrl: 'assets/audio/recorded/Wo_Lamhe_Emon.mp3',
      coverImage: 'assets/images/cover/cover7.jpg',
      lyrics: ['With every heartbeat', 'I feel your love', 'Pulsing through my veins']
    },
    {
      id: 8,
      title: 'This one is about my dreams.',
      subtitle: 'I want to spend my whole life with you.', 
      message: 'Recorded while thinking about our future together.',
      audioUrl: 'assets/audio/recorded/Dil_Ibadat_Emon.mp3',
      coverImage: 'assets/images/cover/cover8.jpg',
      lyrics: ['You inspire my soul', 'To reach new heights', 'With you by my side']
    },
    {
      id: 9,
      title: 'In English I want to spend my life with you. But in Bangla.......',
      subtitle: 'Just for you my love.', 
      message: 'Expressed my feelings in Bangla.',
      audioUrl: 'assets/audio/recorded/Ami_Shudhu_Cheyechi_Tomay_Emon.mp3',
      coverImage: 'assets/images/cover/cover9.jpeg',
      lyrics: ['You are my muse', 'My guiding star', 'Forever inspiring me']
    }
  ]);

  // Featured song (the most special one)
  featuredSong = signal<FeaturedSong>({
    title: 'If I Could Hold You Now',
    description: 'This one is special. Because it is the closest thing to holding you — in sound form.',
    audioUrl: 'assets/audio/recorded/Sang_hu_Tere_Emon.mp3',
    coverImage: 'assets/images/featured-cover.jpg'
  });

  // Secret song (hidden bonus)
  secretSong = signal<Song>({
    id: 999,
    title: 'Secret Message',
    subtitle: 'Just For You',
    message: 'You found the secret song 💖 — this one is just for you.',
    audioUrl: 'assets/audio/recorded/Sang_hu_Tere_Emon.mp3',
    coverImage: 'assets/images/secret-cover.jpg',
    lyrics: ['This secret song', 'Is my heart speaking', 'Directly to yours']
  });

  togglePlay(songId: number) {
    // Stop current audio if playing
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }

    // If clicking the same song, just pause
    if (this.currentlyPlaying() === songId) {
      this.currentlyPlaying.set(null);
      return;
    }

    // Find and play the new song
    const song = this.songs().find(s => s.id === songId);
    if (song) {
      this.currentAudio = new Audio(song.audioUrl);
      this.currentAudio.volume = 0.7;
      
      this.currentAudio.play().then(() => {
        this.currentlyPlaying.set(songId);
      }).catch(error => {
        console.error('Error playing audio:', error);
        alert(`Could not play "${song.title}". Make sure the audio file exists at: ${song.audioUrl}`);
        this.currentlyPlaying.set(null);
      });

      // Reset when song ends
      this.currentAudio.addEventListener('ended', () => {
        this.currentlyPlaying.set(null);
        this.currentAudio = null;
      });
    }
  }

  toggleFeaturedPlay() {
    if (this.featuredPlaying()) {
      // Pause featured song
      if (this.featuredAudio) {
        this.featuredAudio.pause();
        this.featuredAudio = null;
      }
      this.featuredPlaying.set(false);
    } else {
      // Play featured song
      const featured = this.featuredSong();
      this.featuredAudio = new Audio(featured.audioUrl);
      this.featuredAudio.volume = 0.7;

      this.featuredAudio.play().then(() => {
        this.featuredPlaying.set(true);
      }).catch(error => {
        console.error('Error playing featured audio:', error);
        alert(`Could not play featured song. Make sure the audio file exists at: ${featured.audioUrl}`);
        this.featuredPlaying.set(false);
      });

      // Reset when song ends
      this.featuredAudio.addEventListener('ended', () => {
        this.featuredPlaying.set(false);
        this.featuredAudio = null;
      });
    }
  }

  toggleSecretPlay() {
    if (this.secretPlaying()) {
      // Pause secret song
      if (this.secretAudio) {
        this.secretAudio.pause();
        this.secretAudio = null;
      }
      this.secretPlaying.set(false);
    } else {
      // Play secret song
      const secret = this.secretSong();
      this.secretAudio = new Audio(secret.audioUrl);
      this.secretAudio.volume = 0.7;

      this.secretAudio.play().then(() => {
        this.secretPlaying.set(true);
      }).catch(error => {
        console.error('Error playing secret audio:', error);
        alert(`Could not play secret song. Make sure the audio file exists at: ${secret.audioUrl}`);
        this.secretPlaying.set(false);
      });

      // Reset when song ends
      this.secretAudio.addEventListener('ended', () => {
        this.secretPlaying.set(false);
        this.secretAudio = null;
      });
    }
  }

  toggleListeningMode() {
    this.isListeningMode.set(!this.isListeningMode());
  }

  revealSecretSong() {
    this.showSecretSong.set(true);
  }

  ngOnDestroy() {
    // Clean up audio elements when component is destroyed
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    if (this.featuredAudio) {
      this.featuredAudio.pause();
      this.featuredAudio = null;
    }
    if (this.secretAudio) {
      this.secretAudio.pause();
      this.secretAudio = null;
    }
  }
}
