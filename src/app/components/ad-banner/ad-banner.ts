import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Advertisement {
  id: number;
  title: string;
  description: string;
  image: string;
  cta: string;
  link: string;
}

@Component({
  selector: 'app-ad-banner',
  imports: [CommonModule],
  templateUrl: './ad-banner.html',
  styleUrl: './ad-banner.scss',
})
export class AdBanner {
  advertisements = signal<Advertisement[]>([
    {
      id: 1,
      title: 'Aprenda Angular Agora',
      description: 'Domine o desenvolvimento web moderno com nosso curso completo',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=200&fit=crop',
      cta: 'Saiba Mais',
      link: '#'
    },
    {
      id: 2,
      title: 'Hospedagem em Nuvem',
      description: 'Servidores rápidos e confiáveis para sua aplicação',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
      cta: 'Começar Teste Grátis',
      link: '#'
    },
    {
      id: 3,
      title: 'Ferramentas de Produtividade',
      description: 'Aumente sua eficiência com nossas soluções inovadoras',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop',
      cta: 'Explorar Agora',
      link: '#'
    }
  ]);

  currentAdIndex = signal(0);

  nextAd(): void {
    this.currentAdIndex.update(index => 
      (index + 1) % this.advertisements().length
    );
  }

  previousAd(): void {
    this.currentAdIndex.update(index => 
      (index - 1 + this.advertisements().length) % this.advertisements().length
    );
  }

  goToAd(index: number): void {
    this.currentAdIndex.set(index);
  }

  getCurrentAd(): Advertisement {
    return this.advertisements()[this.currentAdIndex()];
  }

  clickAd(): void {
    console.log('Anúncio clicado:', this.getCurrentAd().title);
  }
}
