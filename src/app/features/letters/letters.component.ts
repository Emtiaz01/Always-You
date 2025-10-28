import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-letters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './letters-new.component.html',
  styleUrls: ['./letters-new.component.css'],
})
export class LettersComponent {
  // Add or edit your love letters here
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
  ]);

  // Anniversary and milestone letters
  anniversaryLetters = signal([
    {
      title: 'Happy Birthday, My Favorite Person',
      content: `It's crazy how time has passed, and yet… every day still feels like the first. You still give me butterflies, still make me smile for no reason, and still make my world softer just by being in it. I fall in love with you a little more every single day — not because of what you do, but because of who you are. Here's to every moment we've shared, and to all the tomorrows we'll build together. I love you endlessly — more than I can ever write, more than this page can ever hold. 💞`
    },
    {
      title: 'The Little Things',
      content: `It’s the little things — the way you laugh before you finish a joke, the random texts that make my day, the way you remember tiny details no one else would. You make love feel simple. Effortless. Real. And every time I think about it, I realize something — I don’t just love you for who you are, I love the way you *make life feel lighter.* ☀️💗`
    },
    {
      title: 'If Words Could Hold You',
      content: `If words could hold you, I’d wrap you up in all the things I never say out loud. The “I miss you” that catches in my throat. The “I love you” that feels too small for what I mean. The quiet admiration I feel when I watch you just… exist. You deserve poems, symphonies, galaxies — but all I have are words. And still, I hope somehow they reach you, wherever you are. ✍🏻💫`
    }
  ]);

  // Special letters - Extra romantic and meaningful letters
  specialLetters = signal([
    {
      title: 'I See You',
      content: `I see you — not just your smile, but the way it hides your worries. Not just your strength, but the effort it takes to stay strong. You show up for everyone else, but I want you to know… I see *you.* The tired eyes, the hopeful heart, the way you keep choosing love even when it’s hard. And I need you to remember — that’s what makes you extraordinary. 🌹`
    },
    {
      title: 'If You Ever Doubt My Love',
      content: `On the nights when the world feels distant, when your heart questions its worth, I want you to remember this — my love for you doesn’t waver. It doesn’t depend on good days or bad moods. It just *is.* Steady, patient, endless. You could go silent for days, and I’d still be here — holding space for you in every thought, every breath, every heartbeat. You are my constant. Always have been, always will be. 💞`
    },
    {
      title: 'When I Miss You Quietly',
      content: `I don’t always say it out loud, but some nights, I miss you in the quietest ways. In the empty spaces between songs, in the stillness before sleep. It’s like your presence lingers in the air — soft, invisible, but undeniably there. Missing you isn’t loud; it’s a whisper that lives inside me, reminding me that my favorite part of the world exists somewhere beyond my reach. And somehow… that’s both comforting and cruel. 🌒`
    }
  ]);


  showAnniversaryLetter = true;

  constructor() { }
}
