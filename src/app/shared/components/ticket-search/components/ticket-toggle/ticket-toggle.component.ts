import { Component, input } from '@angular/core';

@Component({
  selector: 'app-ticket-toggle',
  templateUrl: './ticket-toggle.component.html',
  styleUrl: './ticket-toggle.component.css'
})
export class TicketToggleComponent {
  label = input.required<string>();
}
