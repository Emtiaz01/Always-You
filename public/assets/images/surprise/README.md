# 🎁 Surprise Photos (Hidden Easter Eggs)

## What are these?

These photos are **hidden gems** that will ONLY appear when clicking the "Click for a Random Photo Surprise" button on the gallery page.

**They will NOT show up in the main gallery sections!**

This makes them extra special — secret photos just for surprise moments. 💫

---

## How to Add Surprise Photos:

1. **Place images here:** `assets/images/surprise/surprise1.jpg`, `surprise2.jpg`, etc.

2. **Edit the component:** `src/app/features/gallery/gallery.component.ts`

3. **Update the array** (around line 52):

```typescript
surpriseOnlyPhotos = signal<GalleryPhoto[]>([
  { 
    id: 1, 
    url: 'assets/images/surprise/surprise1.jpg', 
    name: 'Hidden Gem', 
    caption: 'A secret moment just for you', 
    date: 'Jan 2024', 
    memory: 'Special surprise', 
    category: 'couple' 
  },
  // Add more surprise photos here...
]);
```

---

## 💡 Tips:

- Use photos that aren't already in the gallery
- Add romantic captions
- These work great for:
  - Behind-the-scenes moments
  - Silly/candid shots
  - Photos with special meaning
  - Hidden memories
  - Extra romantic moments

---

## How it works:

When someone clicks the "Random Photo Surprise" button, it will randomly pick from:
- ✅ All gallery photos (her, couple, special)
- ✅ PLUS these surprise-only photos

The surprise message shown is randomly selected from a list of romantic messages!

---

**Make it extra special! 🎉💖**
