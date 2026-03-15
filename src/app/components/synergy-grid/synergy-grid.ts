import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SynergyService } from '../../services/synergy.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-synergy-grid',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTooltipModule],
  templateUrl: './synergy-grid.html',
  styleUrl: './synergy-grid.scss'
})
export class SynergyGridComponent {
  synergyService = inject(SynergyService);
  matches = this.synergyService.activeSynergies;
  showHelp = signal(true);

  toggleHelp() {
    this.showHelp.update(v => !v);
  }

  connect(userId: string) {
    alert(`Iniciando Chat de Sinergia com o match! Funcionalidade Web 5.0 sendo carregada.`);
  }
}
