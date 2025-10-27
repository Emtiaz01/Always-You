# Timeline Event Photos

Place your timeline event photos here.

## Naming Convention:
- `event1.jpg` - First timeline event
- `event2.jpg` - Second timeline event
- `event3.jpg` - Third timeline event
- etc.

## To Use These Photos:
Edit the timeline events in: `src/app/features/timeline/timeline.component.ts`

Example:
```typescript
{
  date: '2024-01-15',
  title: 'The First Message',
  description: 'The day everything started.',
  photo: 'assets/images/timeline/event1.jpg'  // ← This path
}
```

You can name files anything you want, just update the `photo` path to match!
