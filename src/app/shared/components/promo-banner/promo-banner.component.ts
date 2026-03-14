import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-promo-banner',
  standalone: true,
  templateUrl: './promo-banner.component.html',
  styleUrls: ['./promo-banner.component.css']
})
export class PromoBannerComponent {
  @Input({ required: true }) tagline!: string;
  @Input({ required: true }) discountBadge!: string;
  @Input({ required: true }) description!: string;
}
