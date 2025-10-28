# 🎵 Background Music Audio Files

## Add Your Songs Here

Place your MP3 files in this folder:

```
public/assets/audio/
├── song1.mp3
├── song2.mp3
├── song3.mp3
├── song4.mp3
└── song5.mp3
```

---

## ✅ Setup Complete!

Your gallery page now supports **multiple background songs**!

### How It Works:

1. **Random Selection:** When the page loads, a random song is selected
2. **Auto-Next:** When a song finishes, the next song in the playlist plays automatically
3. **Continuous Play:** Songs loop through your playlist

---

## 🎼 Where to Get Songs

### From Your YouTube Playlist:

1. Go to your YouTube playlist: `https://youtube.com/playlist?list=NvkTqQCift4`
2. Use a YouTube to MP3 converter:
   - **ytmp3.cc**
   - **y2mate.com**
   - **online-convert.com**
   - **Any Video Converter** (desktop app)

3. Download songs as MP3
4. Place them in this folder
5. Name them: `song1.mp3`, `song2.mp3`, etc.

---

## 📝 Update the Playlist

**File:** `src/app/features/gallery/gallery.component.ts`

**Lines 60-67:** Update the song list

```typescript
backgroundSongs = [
  'assets/audio/song1.mp3',
  'assets/audio/song2.mp3',
  'assets/audio/song3.mp3',
  'assets/audio/song4.mp3',
  'assets/audio/song5.mp3'
  // Add more songs here...
];
```

---

## 💡 Tips

1. **File Names:** Keep them simple (song1.mp3, song2.mp3, etc.)
2. **File Size:** Keep each song under 10MB for faster loading
3. **Format:** MP3 works best for web browsers
4. **Quality:** 128-192 kbps is good enough for background music
5. **Add More:** You can add as many songs as you want!

---

## 🎯 Current Behavior

- ✅ Random song plays on page load
- ✅ Auto-plays next song when current ends
- ✅ User can play/pause with the button
- ✅ Loops through all songs in your playlist

---

**Just add your MP3 files here and they'll work automatically! 🎉**
