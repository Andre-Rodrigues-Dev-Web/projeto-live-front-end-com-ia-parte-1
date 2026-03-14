import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { TicketSearchComponent } from '../../shared/components/ticket-search/ticket-search.component';
import { PromotionsSectionComponent } from '../../shared/components/promotions-section/promotions-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TicketSearchComponent, PromotionsSectionComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent { }
