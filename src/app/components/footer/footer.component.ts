import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibilityService } from '../../services/accessibility.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  accService = inject(AccessibilityService);
  showAccessibility = signal(false);

  toggleAccessibility() {
    this.showAccessibility.update(v => !v);
  }
}
