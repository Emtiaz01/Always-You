import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
	{
		path: 'login',
		loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
	},
	{
		path: 'register',
		loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent),
	},
	{
		path: 'timeline',
		loadComponent: () => import('./features/timeline/timeline.component').then(m => m.TimelineComponent),
		canActivate: [authGuard],
	},
	{
		path: 'gallery',
		loadComponent: () => import('./features/gallery/gallery.component').then(m => m.GalleryComponent),
		canActivate: [authGuard],
	},
	{
		path: 'letters',
		loadComponent: () => import('./features/letters/letters.component').then(m => m.LettersComponent),
		canActivate: [authGuard],
	},
	{
		path: 'playlist',
		loadComponent: () => import('./features/playlist/playlist.component').then(m => m.PlaylistComponent),
		canActivate: [authGuard],
	},
	{
		path: 'surprises',
		loadComponent: () => import('./features/surprises/surprises.component').then(m => m.SurprisesComponent),
		canActivate: [authGuard],
	},
	{
		path: '',
		pathMatch: 'full',
		loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
		canActivate: [authGuard],
	},
];
