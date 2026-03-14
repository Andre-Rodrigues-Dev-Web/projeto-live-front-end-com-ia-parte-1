import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationCardComponent } from '../destination-card/destination-card.component';
import { PromoBannerComponent } from '../promo-banner/promo-banner.component';

@Component({
  selector: 'app-promotions-section',
  standalone: true,
  imports: [CommonModule, DestinationCardComponent, PromoBannerComponent],
  templateUrl: './promotions-section.component.html',
  styleUrls: ['./promotions-section.component.css']
})
export class PromotionsSectionComponent {
  destinations = [
    {
      title: 'Conheça o Rio de Janeiro!',
      imageSrc: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2070&auto=format&fit=crop',
      price: 1900.00
    },
    {
      title: 'Conheça Salvador!',
      imageSrc: 'https://images.unsplash.com/photo-1549419149-1db7d6dbfc33?q=80&w=2080&auto=format&fit=crop',
      price: 1900.00
    }
  ];
}
