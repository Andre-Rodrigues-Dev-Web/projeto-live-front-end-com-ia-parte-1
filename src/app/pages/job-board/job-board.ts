import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  requirements: string[];
  postedAt: string;
}

@Component({
  selector: 'app-job-board',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-board.html',
  styleUrl: './job-board.scss'
})
export class JobBoardComponent implements OnInit {
  allJobs = signal<Job[]>([]);
  selectedType = signal<string>('Todos');
  searchQuery = signal<string>('');

  jobTypes = ['Todos', 'Tempo Integral', 'Meio Período', 'Estágio', 'Freelance'];

  filteredJobs = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const type = this.selectedType();

    return this.allJobs().filter(j => {
      const matchesQuery = j.title.toLowerCase().includes(query) || j.company.toLowerCase().includes(query) || j.description.toLowerCase().includes(query);
      const matchesType = type === 'Todos' || j.type === type;
      return matchesQuery && matchesType;
    });
  });

  async ngOnInit() {
    try {
      const response = await fetch('/assets/data/jobs.json');
      const data = await response.json();
      this.allJobs.set(data);
    } catch (error) {
      console.error('Erro ao carregar vagas:', error);
    }
  }

  setType(type: string) {
    this.selectedType.set(type);
  }

  updateSearch(event: Event) {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  calculateDaysAgo(dateStr: string): string {
    const past = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - past.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) return 'Hoje';
    if (diffDays === 2) return 'Ontem';
    return `Há ${diffDays - 1} dias`;
  }
}
