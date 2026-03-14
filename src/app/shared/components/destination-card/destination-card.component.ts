import { Component, input } from '@angular/core';

@Component({
  selector: 'app-destination-card',
  imports: [],
  templateUrl: './destination-card.component.html',
  styleUrl: './destination-card.component.css'
})
export class DestinationCardComponent {
  imageSrc = input.required<string>();
  title = input.required<string>();
  price = input.required<number>();
}
