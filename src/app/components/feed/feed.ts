import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { PostService } from '../../services/post.service';
import { SmartFeedService, FeedStrategy } from '../../features/smart-feed/services/smart-feed.service';
import { FormsModule } from '@angular/forms';
import { StoriesComponent } from '../stories/stories.component';
import { PostCreator } from '../post-creator/post-creator';
import { AdBanner } from '../ad-banner/ad-banner';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatTooltipModule, 
    MatChipsModule, 
    FormsModule,
    StoriesComponent,
    PostCreator,
    AdBanner,
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './feed.html',
  styleUrl: './feed.scss',
})
export class Feed {
  private postService = inject(PostService);
  private smartFeedService = inject(SmartFeedService);

  posts = this.smartFeedService.filteredPosts;
  currentStrategy = this.smartFeedService.currentStrategy;

  expandedSummaries = signal<number[]>([]);
  
  /* 2025 Inline Edit Addition */
  editingPostId = signal<number | null>(null);
  editContent = signal<string>('');

  enableEdit(post: any): void {
    this.editingPostId.set(post.id);
    this.editContent.set(post.content);
  }

  cancelEdit(): void {
    this.editingPostId.set(null);
    this.editContent.set('');
  }

  saveEdit(postId: number): void {
    const newText = this.editContent().trim();
    if (newText) {
      this.postService.editPost(postId, newText);
      this.cancelEdit();
    }
  }

  likePost(postId: number): void {
    this.postService.likePost(postId);
  }

  commentPost(postId: number): void {
    this.postService.commentPost(postId);
  }

  sharePost(postId: number): void {
    this.postService.sharePost(postId);
  }

  deletePost(postId: number): void {
    this.postService.deletePost(postId);
  }

  setStrategy(strategy: FeedStrategy): void {
    this.smartFeedService.setStrategy(strategy);
  }

  toggleSummary(postId: number): void {
    this.expandedSummaries.update(ids => 
      ids.includes(postId) ? ids.filter(id => id !== postId) : [...ids, postId]
    );
  }

  isSummaryExpanded(postId: number): boolean {
    return this.expandedSummaries().includes(postId);
  }

  getIntentLabel(intent?: string): string {
    switch(intent) {
      case 'ajuda': return '📌 Preciso de Ajuda';
      case 'divulgacao': return '🚀 Divulgando';
      case 'colaborar': return '🤝 Quero Colaborar';
      case 'meta': return '🎯 Meta/Carreira';
      default: return '';
    }
  }

  formatDate(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Agora';
    if (hours < 24) return `${hours}h atrás`;
    if (days < 7) return `${days}d atrás`;
    
    return new Date(date).toLocaleDateString('pt-BR');
  }
}
