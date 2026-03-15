import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CityEvent {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
  price: string;
}

@Component({
  selector: 'app-event-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event-calendar.html',
  styleUrl: './event-calendar.scss'
})
export class EventCalendarComponent implements OnInit {
  allEvents = signal<CityEvent[]>([]);
  selectedCategory = signal<string>('Todos');
  searchQuery = signal<string>('');

  categories = computed(() => {
    const cats = this.allEvents().map(e => e.category);
    return ['Todos', ...new Set(cats)];
  });

  filteredEvents = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const cat = this.selectedCategory();

    return this.allEvents()
      .filter(e => {
        const matchesQuery = e.title.toLowerCase().includes(query) || e.description.toLowerCase().includes(query);
        const matchesCat = cat === 'Todos' || e.category === cat;
        return matchesQuery && matchesCat;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  });

  async ngOnInit() {
    try {
      const response = await fetch('/assets/data/events.json');
      const data = await response.json();
      this.allEvents.set(data);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
    }
  }

  setCategory(cat: string) {
    this.selectedCategory.set(cat);
  }

  updateSearch(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.searchQuery.set(val);
  }

  formatDate(dateStr: string): string {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    return new Date(dateStr).toLocaleDateString('pt-BR', options).toUpperCase();
  }
}
