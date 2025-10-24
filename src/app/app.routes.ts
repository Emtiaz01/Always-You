import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'timeline',
		loadComponent: () => import('./features/timeline/timeline.component').then(m => m.TimelineComponent),
	},
	{
		path: 'admin',
		loadComponent: () => import('./features/admin/admin.component').then(m => m.AdminComponent),
	},
	{
		path: 'gallery',
		loadComponent: () => import('./features/gallery/gallery.component').then(m => m.GalleryComponent),
	},
	{
		path: 'letters',
		loadComponent: () => import('./features/letters/letters.component').then(m => m.LettersComponent),
	},
	{
		path: 'playlist',
		loadComponent: () => import('./features/playlist/playlist.component').then(m => m.PlaylistComponent),
	},
	{
		path: 'surprises',
		loadComponent: () => import('./features/surprises/surprises.component').then(m => m.SurprisesComponent),
	},
	{
		path: '',
		pathMatch: 'full',
		loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
	},
];
