import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { TicketSearchComponent } from "./shared/components/ticket-search/ticket-search.component";
import { PromotionsSectionComponent } from "./shared/components/promotions-section/promotions-section.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, TicketSearchComponent, PromotionsSectionComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('boilerplate');
}
