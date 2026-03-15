import { Injectable, inject, signal, computed } from '@angular/core';
import { PostService, Post } from '../../../services/post.service';

export type FeedStrategy = 'geral' | 'para-voce' | 'metas' | 'proximos' | 'bambui' | 'noticias' | 'curiosidades' | 'produtos';

@Injectable({
  providedIn: 'root'
})
export class SmartFeedService {
  private postService = inject(PostService);

  private strategySignal = signal<FeedStrategy>('geral');

  currentStrategy = computed(() => this.strategySignal());

  // Smart Filtering logic using computed Signals
  filteredPosts = computed(() => {
    const strategy = this.strategySignal();
    const allPosts = this.postService.getPosts()();

    switch (strategy) {
      case 'para-voce':
        // Simulated recommendation: favors posts with 'colaborar' or high likes
        return [...allPosts].sort((a, b) => (b.likes + (b.intent === 'colaborar' ? 500 : 0)) - (a.likes + (a.intent === 'colaborar' ? 500 : 0)));
      
      case 'metas':
        // Web 4.0: Filter by 'meta' or 'colaborar' intent
        return allPosts.filter(p => p.intent === 'meta' || p.intent === 'colaborar');
      
      case 'proximos':
        // Simulated proximity filter (just a filter variant for demo)
        return allPosts.filter(p => p.intent === 'ajuda' || p.intent === 'geral');
      
      case 'bambui':
        return allPosts.filter(p => p.content.toLowerCase().includes('bambuí') || p.author === 'Negócios Bambuí');
      case 'noticias':
        return allPosts.filter(p => p.intent === 'divulgacao' || p.content.toLowerCase().includes('notícia') || p.content.toLowerCase().includes('artigo'));
      case 'curiosidades':
        return allPosts.filter(p => p.content.toLowerCase().includes('curiosidade') || p.content.toLowerCase().includes('💡'));
      case 'produtos':
        return allPosts.filter(p => p.content.toLowerCase().includes('promo') || p.content.toLowerCase().includes('compre') || p.content.toLowerCase().includes('desconto'));

      case 'geral':
      default:
        // Chronological
        return allPosts;
    }
  });

  setStrategy(strategy: FeedStrategy): void {
    this.strategySignal.set(strategy);
  }

  // Simulated AI Summary generator
  generateSummary(postId: number): string {
    const post = this.postService.getPosts()().find(p => p.id === postId);
    if (!post) return '';
    
    // In production, this would call an AI API
    if (post.aiSummary) return post.aiSummary; // Return pre-computed mock
    
    return `• Tópico: ${post.content.substring(0, 30)}...\n• IA detectou tom de ${post.intent || 'geral'}\n• Resumo útil gerado em tempo real.`;
  }
}
