import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { TicketSearchComponent } from '../../shared/components/ticket-search/ticket-search.component';
import { PromotionsSectionComponent } from '../../shared/components/promotions-section/promotions-section.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, TicketSearchComponent, PromotionsSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent { }
