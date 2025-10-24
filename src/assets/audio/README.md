# Audio Assets

This folder contains audio files used throughout the website.

## Required Files:

### 1. `romantic-bg.mp3`
- **Used in**: Gallery page (Hero header background music)
- **Purpose**: Background music that plays when user clicks "Play Our Song"
- **Recommendations**: 
  - Choose a romantic song you both love
  - Should be 2-5 minutes long
  - MP3 format, optimized for web (128-192 kbps)
  - Consider copyright - use royalty-free music or music you have rights to

### 2. `voice-message.mp3`
- **Used in**: Gallery page (Easter egg - hidden audio message)
- **Purpose**: Secret voice message that plays when user clicks the special "Easter egg" photo
- **Recommendations**:
  - Record a personal voice message (30 seconds - 1 minute)
  - Say something romantic or funny that's special between you two
  - MP3 format, clear audio quality
  - Example: "Hey beautiful, you found the secret! I love you more than..."

## Current Files:
- ✅ `Kaho Na Kahowith Dialogue 320 Kbps.mp3` - Can be used as romantic-bg.mp3

## How to Add Files:
1. Add your audio files to this directory
2. Name them exactly as shown above (or update the references in the code)
3. Keep file sizes reasonable (< 5MB per file) for faster loading

## Alternative: Use Existing File
If you want to use the existing "Kaho Na Kaho" song as background music:
- Rename it to `romantic-bg.mp3`, OR
- Update `gallery.component.html` line with the audio source to use the current filename
