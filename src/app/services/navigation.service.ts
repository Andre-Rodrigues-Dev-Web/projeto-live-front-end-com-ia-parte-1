import { Injectable, signal } from '@angular/core';

export type AppView = 'feed' | 'profile' | 'communities' | 'bambui-businesses' | 'eventos' | 'empregos';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  currentView = signal<AppView>('feed');
  communitiesTab = signal<'groups' | 'pages' | 'my-groups' | 'my-pages'>('groups');

  setView(view: AppView): void {
    this.currentView.set(view);
  }

  setCommunitiesTab(tab: 'groups' | 'pages' | 'my-groups' | 'my-pages'): void {
    this.communitiesTab.set(tab);
  }
}
