import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'feed', pathMatch: 'full' },
  { 
    path: 'feed', 
    loadComponent: () => import('./components/feed/feed').then(m => m.Feed) 
  },
  { 
    path: 'profile', 
    loadComponent: () => import('./components/user-profile/user-profile').then(m => m.UserProfile) 
  },
  { 
    path: 'communities', 
    loadComponent: () => import('./features/communities/components/explore-communities/explore-communities.component').then(m => m.ExploreCommunitiesComponent) 
  },
  { 
    path: 'synergy', 
    loadComponent: () => import('./components/synergy-grid/synergy-grid').then(m => m.SynergyGridComponent) 
  },
  { 
    path: 'bambui-businesses', 
    loadComponent: () => import('./pages/bambui-business/bambui-business.component').then(m => m.BambuiBusinessComponent) 
  },
  { 
    path: 'eventos', 
    loadComponent: () => import('./pages/event-calendar/event-calendar').then(m => m.EventCalendarComponent) 
  },
  { 
    path: 'empregos', 
    loadComponent: () => import('./pages/job-board/job-board').then(m => m.JobBoardComponent) 
  }
];
