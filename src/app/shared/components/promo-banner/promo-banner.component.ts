import { Component, input } from '@angular/core';

@Component({
  selector: 'app-promo-banner',
  templateUrl: './promo-banner.component.html',
  styleUrl: './promo-banner.component.css'
})
export class PromoBannerComponent {
  tagline = input.required<string>();
  discountBadge = input.required<string>();
  description = input.required<string>();
}
