# Gallery Photos

Place all your gallery photos here organized into 3 sections.

## 📁 Folder Structure:

```
gallery/
├── her/          # Photos of her (Section 1)
├── couple/       # Photos of both of you (Section 2)
└── special/      # Special milestone moments (Section 3)
```

## Section 1: "Her Beautiful Moments" (`her/` folder)
Add photos to: `assets/images/gallery/her1.jpg`, `her2.jpg`, etc.

## Section 2: "Our Adventures Together" (`couple/` folder)
Add photos to: `assets/images/gallery/couple1.jpg`, `couple2.jpg`, etc.

## Section 3: "Special Memories" (`special/` folder)
Add photos to: `assets/images/gallery/special1.jpg`, `special2.jpg`, etc.

---

## To Add Photos:

1. **Place your images** in the appropriate subfolder
2. **Name them:** `her1.jpg`, `couple1.jpg`, `special1.jpg`, etc.
3. **Update the component:** Edit `src/app/features/gallery/gallery.component.ts`

Example in `gallery.component.ts`:

```typescript
// Section 1: Her photos (line ~29)
herPhotos = signal<GalleryPhoto[]>([
  { id: 1, url: 'assets/images/gallery/her1.jpg', name: 'Her Smile', ... },
  { id: 2, url: 'assets/images/gallery/her2.jpg', name: 'Beautiful', ... },
  // Add more...
]);

// Section 2: Couple photos (line ~37)
couplePhotos = signal<GalleryPhoto[]>([
  { id: 1, url: 'assets/images/gallery/couple1.jpg', name: 'Together', ... },
  { id: 2, url: 'assets/images/gallery/couple2.jpg', name: 'Adventure', ... },
  // Add more...
]);

// Section 3: Special moments (line ~45)
specialPhotos = signal<GalleryPhoto[]>([
  { id: 1, url: 'assets/images/gallery/special1.jpg', name: 'First Date', ... },
  { id: 2, url: 'assets/images/gallery/special2.jpg', name: 'Anniversary', ... },
  // Add more...
]);
```

---

## 🎨 Photo Properties:

Each photo object has:
- **url**: Path to the image
- **name**: Photo title
- **caption**: Short caption shown on hover
- **date**: Date text (e.g., "Jan 2024")
- **memory**: Memory description
- **category**: 'her', 'couple', or 'video'
- **isSpecial** (optional): Set to `true` for Easter egg
- **specialMessage** (optional): Message shown when Easter egg is clicked

---

📖 See **MANUAL_CONTENT_GUIDE.md** for complete instructions!
