import { Injectable, signal, computed } from '@angular/core';

export interface CommunityItem {
  id: number;
  name: string;
  description: string;
  category: string;
  type: 'group' | 'page';
  avatar: string;
  coverBg: string;
  memberCount: number;
  isJoined: boolean; // For groups
  isFollowing: boolean; // For pages
}

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  private itemsSignal = signal<CommunityItem[]>([
    {
      id: 1,
      name: 'Angular Experts 🅰️',
      description: 'Discussão de nível sênior sobre Angular 22+, Signals, e SSR.',
      category: 'Tecnologia',
      type: 'group',
      avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=angular',
      coverBg: 'linear-gradient(135deg, #e52d27 0%, #b31217 100%)',
      memberCount: 1240,
      isJoined: false,
      isFollowing: false
    },
    {
      id: 2,
      name: 'Clube do Livro 📚',
      description: 'Leitura mensal, resenhas e discussões sobre literatura clássica.',
      category: 'Cultura',
      type: 'group',
      avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=books',
      coverBg: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      memberCount: 342,
      isJoined: true,
      isFollowing: false
    },
    {
      id: 3,
      name: 'Gamers BR 🎮',
      description: 'Comunidade para marcar partidas, dicas e novidades de games.',
      category: 'Jogos',
      type: 'group',
      avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=gamers',
      coverBg: 'linear-gradient(135deg, #8e54e9 0%, #4776e6 100%)',
      memberCount: 5621,
      isJoined: false,
      isFollowing: false
    },
    {
      id: 4,
      name: 'Tech News 🚀',
      description: 'Página oficial de notícias sobre tecnologia e inovação.',
      category: 'Notícias',
      type: 'page',
      avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=technews',
      coverBg: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
      memberCount: 15430,
      isJoined: false,
      isFollowing: false
    },
    {
      id: 5,
      name: 'Café Gourmet ☕',
      description: 'Dicas de preparo, grãos especiais e receitas.',
      category: 'Gastronomia',
      type: 'page',
      avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=coffee',
      coverBg: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)',
      memberCount: 2310,
      isJoined: false,
      isFollowing: true
    }
  ]);

  // Computed signals for filtering
  groups = computed(() => this.itemsSignal().filter(i => i.type === 'group'));
  pages = computed(() => this.itemsSignal().filter(i => i.type === 'page'));

  myGroups = computed(() => this.itemsSignal().filter(i => i.type === 'group' && i.isJoined));
  myPages = computed(() => this.itemsSignal().filter(i => i.type === 'page' && i.isFollowing));

  joinGroup(id: number): void {
    this.itemsSignal.update(items =>
      items.map(i => i.id === id ? { ...i, isJoined: true, memberCount: i.memberCount + 1 } : i)
    );
  }

  leaveGroup(id: number): void {
    this.itemsSignal.update(items =>
      items.map(i => i.id === id ? { ...i, isJoined: false, memberCount: i.memberCount - 1 } : i)
    );
  }

  followPage(id: number): void {
    this.itemsSignal.update(items =>
      items.map(i => i.id === id ? { ...i, isFollowing: true, memberCount: i.memberCount + 1 } : i)
    );
  }

  unfollowPage(id: number): void {
    this.itemsSignal.update(items =>
      items.map(i => i.id === id ? { ...i, isFollowing: false, memberCount: i.memberCount - 1 } : i)
    );
  }

  createItem(name: string, description: string, type: 'group' | 'page', category: string): void {
    const newItem: CommunityItem = {
      id: Date.now(),
      name,
      description,
      type,
      category,
      avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${name}`,
      coverBg: 'linear-gradient(135deg, #0a66c2 0%, #00c9ff 100%)', // Default
      memberCount: 1,
      isJoined: type === 'group',
      isFollowing: type === 'page'
    };
    this.itemsSignal.update(items => [newItem, ...items]);
  }
}
