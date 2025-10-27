# Gallery Photos

Place all your gallery photos here.

## Naming Convention:
- `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, etc.
- Or use descriptive names: `beach-sunset.jpg`, `couple-date.jpg`, etc.

## To Use These Photos:
Edit the photos array in: `src/app/features/gallery/gallery.component.ts`

Example:
```typescript
{
  id: 1,
  url: 'assets/images/gallery/photo1.jpg',  // ← This path
  name: 'Beautiful Smile',
  caption: 'Your smile lights up my world',
  date: 'Jan 2024',
  memory: 'First date vibes',
  category: 'her'  // Options: 'her', 'couple', 'video'
}
```

## Categories:
- **'her'** - Photos of her alone (shows in "Her" section)
- **'couple'** - Photos of both of you (shows in "Couple" section)
- **'video'** - Video thumbnails (shows in "Video Memories" section)

## Easter Eggs:
Set `isSpecial: true` and add a `specialMessage` to create a surprise popup!
