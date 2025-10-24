import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IndexedDbService } from '../../core/indexed-db.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  events = signal<any[]>([]);
  eventForm: any;

  photos = signal<any[]>([]);
  photoForm: any;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private idb: IndexedDbService) {
    this.eventForm = this.fb.group({
      id: [null],
      date: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
    });

    this.photoForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  async ngOnInit() {
    await this.loadEvents();
    await this.loadPhotos();
  }

  // Timeline Events
  async loadEvents() {
    const eventList = await this.idb.getAllTimeline();
    eventList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.events.set(eventList);
  }

  editEvent(event: any) {
    this.eventForm.setValue({
      id: event.id,
      date: new Date(event.date).toISOString().substring(0, 10),
      title: event.title,
      description: event.description,
    });
  }

  async deleteEvent(id: string) {
    if (confirm('Are you sure you want to delete this event?')) {
      await this.idb.delete('timeline', id);
      await this.loadEvents();
    }
  }

  async onEventSubmit() {
    if (this.eventForm.invalid) {
      return;
    }

    const formValue = this.eventForm.value;
    const eventData = {
      id: formValue.id || crypto.randomUUID(),
      date: new Date(formValue.date!).toISOString(),
      title: formValue.title!,
      description: formValue.description!,
      createdAt: new Date().toISOString(),
    };

    await this.idb.addTimelineEvent(eventData);
    this.eventForm.reset({ id: null, date: '', title: '', description: '' });
    await this.loadEvents();
  }

  // Photo Gallery
  async loadPhotos() {
    this.photos.set(await this.idb.getAllPhotos());
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  async onPhotoSubmit() {
    if (this.photoForm.invalid || !this.selectedFile) {
      return;
    }

    const photoData = {
      id: crypto.randomUUID(),
      name: this.photoForm.value.name!,
      blob: this.selectedFile,
      uploadedAt: new Date().toISOString(),
    };

    await this.idb.addPhoto(photoData);
    this.photoForm.reset();
    this.selectedFile = null;
    (document.getElementById('photoFile') as HTMLInputElement).value = '';
    await this.loadPhotos();
  }

  async deletePhoto(id: string) {
    if (confirm('Are you sure you want to delete this photo?')) {
      await this.idb.delete('photos', id);
      await this.loadPhotos();
    }
  }
}
