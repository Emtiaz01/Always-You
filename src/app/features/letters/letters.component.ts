import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexedDbService } from '../../core/indexed-db.service';

@Component({
  selector: 'app-letters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.css'],
})
export class LettersComponent implements OnInit {
  // TODO: Load letters from IndexedDB and add unlock logic for anniversary
  letters = signal([
    {
      title: 'The Day You Walked In',
      content: `I still remember the moment you came into my life — quiet, unannounced, and yet somehow… the loudest thing my heart has ever felt. You weren’t just someone I met. You were someone my soul seemed to recognize — like it had been waiting for you all along. Every smile of yours since then has been my sunshine, every word a melody I can’t stop replaying. You didn’t just make my days brighter — you made me better. Thank you for walking in. Thank you for staying. I’ll never stop being grateful that the universe decided to make our paths cross. 🌍💞`
    },
    {
      title: 'On The Days You Forget How Special You Are',
      content: `Hey, my love — I know there are days when you feel tired, when you doubt yourself, or when the world feels too heavy. But please, read this and remember — you are everything good this world has to offer. You have the kindest soul, the most beautiful smile, and a heart that makes people believe in love again. You are enough — even on the days you don’t feel like it. You are loved — especially on the days you can’t see it. And you? You are my forever favorite person. 💖`
    },
    {
      title: 'When I Think About Us',
      content: `Sometimes, I just sit back and replay our story — the laughs, the chaos, the comfort, the love. And every single time, I end up smiling like an idiot, because wow... we really found each other. You’re my peace after a long day, my laughter when life feels dull, and my calm when everything gets loud. Being with you doesn’t feel like a chapter — it feels like the whole book. I don’t know where life will take us next, but I do know one thing — Wherever you are, that’s where I want to be. 💫`
    },
    {
      title: 'A Promise',
      content: `I promise to never let a day go by without reminding you how loved you are. I promise to listen — even when it’s hard. I promise to be your biggest fan, your calm in chaos, your laughter in dull moments, and your shoulder when life feels heavy. I promise to never let you feel alone in this world — because from the moment you came into my life, you became home. Always. Only. You. ❤️`
    }
  ]);

  anniversaryLetter = {
    title: 'Happy Anniversary, My Forever Person',
    content: `It’s crazy how time has passed, and yet… every day still feels like the first. You still give me butterflies, still make me smile for no reason, and still make my world softer just by being in it. I fall in love with you a little more every single day — not because of what you do, but because of who you are. Here’s to every moment we’ve shared, and to all the tomorrows we’ll build together. I love you endlessly — more than I can ever write, more than this page can ever hold. 💞`
  };
  
  // For now, we'll just show it. Unlock logic to be added.
  showAnniversaryLetter = true; 

  constructor(private idb: IndexedDbService) {}

  ngOnInit() {
    // Currently using hardcoded data.
    // this.loadLetters(); 
  }

  async loadLetters() {
    this.letters.set(await this.idb.getAll('letters'));
  }
}
