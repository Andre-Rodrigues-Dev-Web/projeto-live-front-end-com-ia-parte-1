import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header-categories',
  templateUrl: './header-categories.component.html',
  styleUrl: './header-categories.component.css'
})
export class HeaderCategoriesComponent {
  categories = input.required<{ name: string; icon: string }[]>();
}
