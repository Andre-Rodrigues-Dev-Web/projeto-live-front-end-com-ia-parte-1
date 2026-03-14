import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
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
