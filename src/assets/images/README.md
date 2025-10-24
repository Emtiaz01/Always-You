# Image Assets

This folder contains image files used throughout the website.

## Required Files:

### 1. `couple-hero.jpg` (or .png)
- **Used in**: Gallery page (Hero section)
- **Purpose**: Main couple photo displayed at the top of the gallery
- **Recommendations**:
  - A beautiful couple photo (your favorite together)
  - High resolution (1200x800px or larger)
  - Landscape orientation works best
  - JPG or PNG format
  - File size < 500KB (optimize for web)

### 2. Logo/Favicon (Optional)
- `logo.png` - Site logo
- `favicon.ico` - Browser tab icon

## Gallery Photos
Gallery photos are stored in **IndexedDB** (browser database), not in this folder.
- Add photos through the Admin panel at `/admin`
- Photos are stored as blobs in the browser's IndexedDB

## How to Add Images:
1. Place your images in this directory
2. Name them as shown above
3. Optimize images before uploading:
   - Use tools like TinyPNG, ImageOptim, or Squoosh
   - Recommended max width: 1920px
   - Keep file sizes under 500KB for faster loading

## Image Optimization Tips:
- Use JPG for photos (better compression)
- Use PNG for graphics with transparency
- Use WebP for modern browsers (better quality + smaller size)
- Always compress images before adding to the project
