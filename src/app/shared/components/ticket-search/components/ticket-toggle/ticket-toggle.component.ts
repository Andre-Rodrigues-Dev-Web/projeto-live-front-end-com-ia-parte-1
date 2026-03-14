import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ticket-toggle',
  standalone: true,
  templateUrl: './ticket-toggle.component.html',
  styleUrls: ['./ticket-toggle.component.css']
})
export class TicketToggleComponent {
  @Input({ required: true }) label!: string;
}
