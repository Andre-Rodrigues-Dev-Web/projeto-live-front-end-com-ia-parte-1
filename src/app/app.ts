import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { StoryViewerComponent } from './components/story-viewer/story-viewer.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { NavigationService, AppView } from './services/navigation.service';
import { RouterOutlet } from '@angular/router';
import { AccessibilityService } from './services/accessibility.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule, 
    RouterOutlet,
    SidebarComponent, 
    ChatWindowComponent, 
    StoryViewerComponent,
    LeftSidebarComponent,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private navService = inject(NavigationService);
  accService = inject(AccessibilityService);
  uiService = inject(UiService);

  currentView = this.navService.currentView;
  isSidebarOpen = this.uiService.isSidebarOpen;

  switchView(view: AppView): void {
    this.navService.setView(view);
  }

  toggleSidebar(): void {
    this.uiService.toggleSidebar();
  }

  closeSidebar(): void {
    this.uiService.closeSidebar();
  }

  // Cookie Consent (LGPD/GDPR)
  showCookieBanner = signal<boolean>(
    typeof localStorage !== 'undefined' ? !localStorage.getItem('cookieConsent') : false
  );

  acceptCookies(accepted: boolean): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cookieConsent', accepted ? 'accepted' : 'rejected');
    }
    this.showCookieBanner.set(false);
  }
}
