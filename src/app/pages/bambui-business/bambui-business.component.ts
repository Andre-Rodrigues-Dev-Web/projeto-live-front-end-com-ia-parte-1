import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

interface Business {
  name: string;
  category: string;
  phone: string;
  address: string;
  instagram: string;
}

@Component({
  selector: 'app-bambui-business',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule],
  templateUrl: './bambui-business.component.html',
  styleUrl: './bambui-business.component.scss'
})
export class BambuiBusinessComponent implements OnInit {
  allBusinesses = signal<Business[]>([]);
  searchQuery = signal<string>('');
  selectedCategory = signal<string>('Todos');

  categories = computed(() => {
    const cats = this.allBusinesses().map(b => b.category);
    return ['Todos', ...new Set(cats)];
  });

  filteredBusinesses = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const cat = this.selectedCategory();
    
    return this.allBusinesses().filter(b => {
      const matchesQuery = b.name.toLowerCase().includes(query) || b.category.toLowerCase().includes(query);
      const matchesCategory = cat === 'Todos' || b.category === cat;
      return matchesQuery && matchesCategory;
    });
  });

  async ngOnInit() {
    try {
      const response = await fetch('/assets/data/bambui-businesses.json');
      const data = await response.json();
      this.allBusinesses.set(data);
    } catch (error) {
      console.error('Erro ao carregar os negócios:', error);
    }
  }

  setCategory(cat: string) {
    this.selectedCategory.set(cat);
  }

  updateSearch(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.searchQuery.set(val);
  }
}
