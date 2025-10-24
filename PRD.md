# Project Requirement Document (PRD)

Project Title: A Personalized Love Website for [Her Name]

This repository contains the beginning of a personalized website project intended to be a private, interactive digital scrapbook and love letter. The full PRD is captured here for reference and planning.

## Overview
- Purpose: Build a beautiful, private, installable website dedicated to your girlfriend including memories, letters, media, mini-games, and surprises.

## Key Goals
- Responsive, mobile-first UI with warm romantic theme.
- Offline-capable and persistent using IndexedDB.
- Admin area to add/edit content without coding.
- Deployable to Vercel/Netlify and PWA-installable.

## Data & Storage
- Use IndexedDB with a simple typed wrapper (library: `idb`).
- Stores: settings, timeline, photos, letters, playlist, surprises, chatMessages, admin

## Next steps
1. Implement `IndexedDbService` in `src/app/core/`.
2. Create core pages: Home, Timeline, Gallery, Letters, Playlist, Surprises, Chat, Admin.
3. Add PWA support and service worker.
4. Add admin auth and export/import for backups.

---
Detailed PRD and technical plan was previously prepared; this file is a concise on-repo copy to track requirements.
