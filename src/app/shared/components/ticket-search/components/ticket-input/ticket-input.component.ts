import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ticket-input',
  standalone: true,
  templateUrl: './ticket-input.component.html',
  styleUrls: ['./ticket-input.component.css']
})
export class TicketInputComponent {
  @Input({ required: true }) label!: string;
  @Input() placeholder: string = '';
}
