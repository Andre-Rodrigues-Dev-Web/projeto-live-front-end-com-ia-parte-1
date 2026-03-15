import { Injectable, signal } from '@angular/core';

export interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  intent?: 'geral' | 'ajuda' | 'divulgacao' | 'colaborar' | 'meta'; // Web 4.0 Intent
  aiSummary?: string; // Web 4.0 AI Summary
  image?: string; // Simulated media attachment
  mediaType?: 'image' | 'video'; // Media type specifier
  isPrivateAuthor?: boolean; // Privacy Flag
}

import { computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  friends = signal<string[]>(['João Silva', 'Maria Santos']); // Dummy Friends List
  private posts = signal<Post[]>([
    {
      id: 1,
      author: 'João Silva',
      avatar: 'https://i.pravatar.cc/150?img=1',
      content: 'Que dia incrível! Mal posso esperar para compartilhar as novidades com vocês! 🎉',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 234,
      comments: 45,
      shares: 12,
      intent: 'geral'
    },
    {
      id: 2,
      author: 'Maria Santos',
      avatar: 'https://i.pravatar.cc/150?img=2',
      content: 'Dica de produtividade: Organize seu dia em blocos de tempo. Funciona muito bem! 💡',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      likes: 567,
      comments: 89,
      shares: 34,
      intent: 'meta'
    },
    {
      id: 3,
      author: 'Pedro Costa',
      avatar: 'https://i.pravatar.cc/150?img=3',
      content: 'Finalmente terminei meu projeto! Depois de 3 meses de trabalho árduo, estou muito feliz com o resultado. 🚀 Especialista em Angular precisando de feedback!',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      likes: 892,
      comments: 156,
      shares: 78,
      intent: 'colaborar',
      aiSummary: '• Concluiu projeto após 3 meses\n• Busca feedback\n• Expert em Angular'
    },
    {
      id: 4,
      author: 'Ana Oliveira',
      avatar: 'https://i.pravatar.cc/150?img=4',
      content: 'Alguém sabe como configurar o Tailwind no Angular 22 com Defer Blocks? Travado aqui! 😢',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      likes: 445,
      comments: 67,
      shares: 23,
      intent: 'ajuda'
    },
    {
      id: 5,
      author: 'Carlos Mendes',
      avatar: 'https://i.pravatar.cc/150?img=5',
      content: 'Novo artigo publicado no blog! Confira dicas sobre desenvolvimento web moderno focado em Web 4.0. 📝',
      timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
      likes: 678,
      comments: 112,
      shares: 45,
      intent: 'divulgacao'
    }
  ]);

  getPosts() {
    return computed(() => {
      const allPosts = this.posts();
      const currentFriends = this.friends();
      
      return allPosts.filter(post => {
        if (post.author === 'Você') return true; // Always see own posts
        if (post.isPrivateAuthor && !currentFriends.includes(post.author)) {
          return false; // Hidden if private and not friend
        }
        return true;
      });
    });
  }

  addPost(author: string, avatar: string, content: string, intent: Post['intent'] = 'geral', image?: string, isPrivateAuthor = false, mediaType: Post['mediaType'] = 'image'): void {
    const newPost: Post = {
      id: Math.max(...this.posts().map(p => p.id), 0) + 1,
      author,
      avatar,
      content,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      shares: 0,
      intent,
      image,
      mediaType,
      isPrivateAuthor
    };
    this.posts.update(posts => [newPost, ...posts]);
  }

  likePost(postId: number): void {
    this.posts.update(posts =>
      posts.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  }

  editPost(postId: number, newContent: string): void {
    this.posts.update(posts =>
      posts.map(post =>
        post.id === postId ? { ...post, content: newContent } : post
      )
    );
  }

  commentPost(postId: number): void {
    this.posts.update(posts =>
      posts.map(post =>
        post.id === postId ? { ...post, comments: post.comments + 1 } : post
      )
    );
  }

  sharePost(postId: number): void {
    this.posts.update(posts =>
      posts.map(post =>
        post.id === postId ? { ...post, shares: post.shares + 1 } : post
      )
    );
  }

  deletePost(postId: number): void {
    this.posts.update(posts => posts.filter(post => post.id !== postId));
  }
}
