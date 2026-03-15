import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { NavigationService, AppView } from '../../services/navigation.service';
import { SmartFeedService, FeedStrategy } from '../../features/smart-feed/services/smart-feed.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatListModule],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss'
})
export class LeftSidebarComponent {
  navService = inject(NavigationService);
  smartFeedService = inject(SmartFeedService);
  private router = inject(Router);

  currentView = this.navService.currentView;
  currentStrategy = this.smartFeedService.currentStrategy;
  communitiesTab = this.navService.communitiesTab;

  menuItems = [
    { label: 'Feed Geral', icon: 'fa-list', view: 'feed', strategy: 'geral' },
    { label: 'Grupos', icon: 'fa-users', view: 'communities', strategy: 'groups' },
    { label: 'Páginas', icon: 'fa-flag', view: 'communities', strategy: 'pages' },
    { label: 'Negócios de Bambuí', icon: 'fa-store', view: 'bambui-businesses', strategy: '' },
    { label: 'Agenda de Eventos', icon: 'fa-calendar-alt', view: 'eventos', strategy: '' },
    { label: 'Classificados de Emprego', icon: 'fa-briefcase', view: 'empregos', strategy: '' },
    { label: 'Notícias', icon: 'fa-newspaper', view: 'feed', strategy: 'noticias' },
    { label: 'Curiosidades', icon: 'fa-lightbulb', view: 'feed', strategy: 'curiosidades' },
    { label: 'Produtos Baratos', icon: 'fa-tag', view: 'feed', strategy: 'produtos' }
  ];

  navigate(view: string, strategy: string) {
    this.navService.setView(view as AppView);
    if (view === 'feed') {
      this.smartFeedService.setStrategy(strategy as FeedStrategy);
    } else if (view === 'communities') {
      this.navService.setCommunitiesTab(strategy as any);
    }
    this.router.navigate([`/${view}`]);
  }
}
