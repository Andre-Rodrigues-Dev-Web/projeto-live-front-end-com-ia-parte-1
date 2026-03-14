import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-destination-card',
  imports: [CurrencyPipe],
  templateUrl: './destination-card.component.html',
  styleUrl: './destination-card.component.css'
})
export class DestinationCardComponent {
  imageSrc = input.required<string>();
  title = input.required<string>();
  price = input.required<number>();
}
