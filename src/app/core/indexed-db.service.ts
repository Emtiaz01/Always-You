import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';

/**
 * Typed database schema for the love site.
 */
interface LoveSiteDB extends DBSchema {
  settings: {
    key: string;
    value: any;
  };
  timeline: {
    key: string;
    value: {
      id: string;
      date: string; // ISO
      title: string;
      description?: string;
      photos?: string[]; // photo ids
      videos?: string[]; // urls
      createdAt: string;
      updatedAt?: string;
    };
    indexes: { 'by-date': string };
  };
  photos: {
    key: string;
    value: {
      id: string;
      name?: string;
      blob: Blob;
      type?: string;
      thumbnail?: Blob;
      tags?: string[];
      uploadedAt: string;
    };
    indexes: { 'by-tag': string };
  };
  letters: {
    key: string;
    value: {
      id: string;
      title?: string;
      content: string;
      lock?: { type: 'none' | 'date' | 'password'; value?: string };
      createdAt: string;
    };
  };
  playlist: {
    key: string;
    value: { id: string; provider: string; providerId: string; title?: string; order?: number };
  };
  chatMessages: {
    key: string;
    value: { id: string; author?: string; text: string; createdAt: string };
  };
}

@Injectable({ providedIn: 'root' })
export class IndexedDbService {
  private dbPromise: Promise<IDBPDatabase<LoveSiteDB>>;

  constructor() {
    this.dbPromise = this.init();
  }

  private init() {
    return openDB<LoveSiteDB>('love-site-db', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }

        if (!db.objectStoreNames.contains('timeline')) {
          const s = db.createObjectStore('timeline', { keyPath: 'id' });
          s.createIndex('by-date', 'date');
        }

        if (!db.objectStoreNames.contains('photos')) {
          const s = db.createObjectStore('photos', { keyPath: 'id' });
          s.createIndex('by-tag', 'tags', { multiEntry: true });
        }

        if (!db.objectStoreNames.contains('letters')) {
          db.createObjectStore('letters', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('playlist')) {
          db.createObjectStore('playlist', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('chatMessages')) {
          db.createObjectStore('chatMessages', { keyPath: 'id' });
        }
      },
    });
  }

  // Generic helpers
  async getStore<T>(storeName: keyof LoveSiteDB, key: IDBValidKey): Promise<T | undefined> {
    const db = await this.dbPromise;
    return (await db.get(storeName as any, key)) as T | undefined;
  }

  async getAll<T>(storeName: keyof LoveSiteDB): Promise<T[]> {
    const db = await this.dbPromise;
    return (await db.getAll(storeName as any)) as T[];
  }

  async put<T>(storeName: keyof LoveSiteDB, value: T): Promise<void> {
    const db = await this.dbPromise;
    await db.put(storeName as any, value as any);
  }

  async delete(storeName: keyof LoveSiteDB, key: IDBValidKey): Promise<void> {
    const db = await this.dbPromise;
    await db.delete(storeName as any, key);
  }

  async clear(storeName: keyof LoveSiteDB): Promise<void> {
    const db = await this.dbPromise;
    await db.clear(storeName as any);
  }

  // Timeline specific helpers
  async addTimelineEvent(event: LoveSiteDB['timeline']['value']): Promise<void> {
    event.createdAt = event.createdAt || new Date().toISOString();
    const db = await this.dbPromise;
    await db.put('timeline' as any, event as any);
  }

  async getAllTimeline(): Promise<LoveSiteDB['timeline']['value'][]> {
    const db = await this.dbPromise;
    return await db.getAll('timeline' as any);
  }

  // Photos helpers
  async addPhoto(photo: LoveSiteDB['photos']['value']): Promise<void> {
    photo.uploadedAt = photo.uploadedAt || new Date().toISOString();
    const db = await this.dbPromise;
    await db.put('photos' as any, photo as any);
  }

  async getAllPhotos() {
    return this.getAll<LoveSiteDB['photos']['value']>('photos');
  }

  // Export/import simple JSON (blobs -> not included; for blobs one can implement base64 encoding)
  async exportMetadata(): Promise<any> {
    const db = await this.dbPromise;
    const tx = db.transaction(['settings', 'timeline', 'photos', 'letters', 'playlist', 'chatMessages'], 'readonly');
    const exportObj: any = {};
    exportObj.settings = await tx.objectStore('settings').getAll();
    exportObj.timeline = await tx.objectStore('timeline').getAll();
    // For photos, only export metadata (not blobs) to keep payload small
    const photos = await tx.objectStore('photos').getAll();
    exportObj.photos = photos.map((p: any) => ({ id: p.id, name: p.name, type: p.type, uploadedAt: p.uploadedAt, tags: p.tags }));
    exportObj.letters = await tx.objectStore('letters').getAll();
    exportObj.playlist = await tx.objectStore('playlist').getAll();
    exportObj.chatMessages = await tx.objectStore('chatMessages').getAll();
    return exportObj;
  }
}
