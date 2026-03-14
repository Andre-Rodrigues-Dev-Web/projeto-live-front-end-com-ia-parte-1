import { Component, input } from '@angular/core';

@Component({
  selector: 'app-ticket-input',
  templateUrl: './ticket-input.component.html',
  styleUrl: './ticket-input.component.css'
})
export class TicketInputComponent {
  label = input.required<string>();
  placeholder = input<string>('');
}
