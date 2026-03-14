import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/components/header/header.component';
import { TicketSearchComponent } from './shared/components/ticket-search/ticket-search.component';
import { PromotionsSectionComponent } from './shared/components/promotions-section/promotions-section.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TicketSearchComponent, PromotionsSectionComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Signals 
  techStack = signal([
    { name: 'Angular 21', icon: '🚀', desc: 'Framework robusto de alta performance' },
    { name: 'Standalone', icon: '🧩', desc: 'Arquitetura sem Módulos' },
    { name: 'Signals', icon: '⚡', desc: 'Reatividade Fina' },
    { name: 'Control Flow', icon: '🔄', desc: 'Nova sintaxe de templates' },
    { name: 'Glassmorphism', icon: '🎨', desc: 'Design Vanilla Premium e responsivo' }
  ]);

  counter = signal(0);
  
  // Computed (Signal Derivado)
  isPartyTime = computed(() => this.counter() >= 10);

  increment() {
    this.counter.update(count => count + 1);
  }
}
