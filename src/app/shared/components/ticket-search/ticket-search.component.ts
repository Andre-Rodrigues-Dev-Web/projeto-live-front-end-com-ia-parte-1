import { Component } from '@angular/core';
import { TicketInputComponent } from './components/ticket-input/ticket-input.component';
import { TicketToggleComponent } from './components/ticket-toggle/ticket-toggle.component';

@Component({
  selector: 'app-ticket-search',
  imports: [TicketInputComponent, TicketToggleComponent],
  templateUrl: './ticket-search.component.html',
  styleUrl: './ticket-search.component.css'
})
export class TicketSearchComponent { }
