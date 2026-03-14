import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderLogoComponent } from './components/header-logo/header-logo.component';
import { HeaderActionsComponent } from './components/header-actions/header-actions.component';
import { HeaderCategoriesComponent } from './components/header-categories/header-categories.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HeaderLogoComponent, HeaderActionsComponent, HeaderCategoriesComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  categories = [
    { name: 'Hospedagens', icon: 'fa-solid fa-hotel' },
    { name: 'Passagens', icon: 'fa-solid fa-plane-departure' },
    { name: 'Pacotes', icon: 'fa-solid fa-briefcase' },
    { name: 'Ofertas', icon: 'fa-solid fa-certificate' },
    { name: 'Locação de veículos', icon: 'fa-solid fa-car' },
    { name: 'Cruzeiros', icon: 'fa-solid fa-ship' },
    { name: 'Câmbio', icon: 'fa-solid fa-money-bill-1-wave' }
  ];
}
