import { Component, signal } from '@angular/core';
import { HeaderLogoComponent } from './components/header-logo/header-logo.component';
import { HeaderActionsComponent } from './components/header-actions/header-actions.component';
import { HeaderCategoriesComponent } from './components/header-categories/header-categories.component';

@Component({
  selector: 'app-header',
  imports: [HeaderLogoComponent, HeaderActionsComponent, HeaderCategoriesComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  categories = signal([
    { name: 'Hospedagens', icon: 'fa-solid fa-hotel' },
    { name: 'Passagens', icon: 'fa-solid fa-plane-departure' },
    { name: 'Pacotes', icon: 'fa-solid fa-briefcase' },
    { name: 'Ofertas', icon: 'fa-solid fa-certificate' },
    { name: 'Locação de veículos', icon: 'fa-solid fa-car' },
    { name: 'Cruzeiros', icon: 'fa-solid fa-ship' },
    { name: 'Câmbio', icon: 'fa-solid fa-money-bill-1-wave' }
  ]);
}
