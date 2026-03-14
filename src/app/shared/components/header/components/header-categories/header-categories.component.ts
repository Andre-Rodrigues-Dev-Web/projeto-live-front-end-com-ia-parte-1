import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-categories',
  standalone: true,
  templateUrl: './header-categories.component.html',
  styleUrls: ['./header-categories.component.css']
})
export class HeaderCategoriesComponent {
  @Input({ required: true }) categories!: { name: string, icon: string }[];
}
