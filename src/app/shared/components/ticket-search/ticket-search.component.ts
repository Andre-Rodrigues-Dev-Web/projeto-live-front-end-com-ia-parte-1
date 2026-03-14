import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketInputComponent } from './components/ticket-input/ticket-input.component';
import { TicketToggleComponent } from './components/ticket-toggle/ticket-toggle.component';

@Component({
  selector: 'app-ticket-search',
  standalone: true,
  imports: [CommonModule, TicketInputComponent, TicketToggleComponent],
  templateUrl: './ticket-search.component.html',
  styleUrls: ['./ticket-search.component.css']
})
export class TicketSearchComponent {
}
