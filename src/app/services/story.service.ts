import { Injectable, signal, computed } from '@angular/core';

export interface StoryOverlay {
  type: 'text' | 'emoji' | 'link';
  content: string;
  x?: number; // fallback position %
  y?: number; // fallback position %
}

export interface StorySlide {
  type: 'text' | 'image' | 'video';
  content: string; // Text OR Media Base64/Url
  bg?: string;
  filter?: string; // CSS Filter e.g., 'sepia(0.5)'
  overlays?: StoryOverlay[];
}

export interface Story {
  id: number;
  user: string;
  avatar: string;
  previewBg: string;
  previewEmoji: string;
  seen: boolean;
  slides: StorySlide[];
}

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private readonly ME_ID = 0;

  private storiesSignal = signal<Story[]>([
    {
      id: 1, user: 'Ana Silva', avatar: '👩', previewBg: '#f953c6',
      previewEmoji: '🌸', seen: false,
      slides: [{ type: 'text', content: 'Que domingo lindo! ☀️', bg: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)' }]
    },
    {
      id: 2, user: 'Carlos Santos', avatar: '👨', previewBg: '#4776e6',
      previewEmoji: '⚽', seen: false,
      slides: [{ type: 'text', content: 'Partiu jogar bola! ⚽🏆', bg: 'linear-gradient(135deg, #4776e6 0%, #8e54e9 100%)' }]
    },
    {
      id: 3, user: 'Beatriz Costa', avatar: '👩‍🦰', previewBg: '#11998e',
      previewEmoji: '🌴', seen: false,
      slides: [{ type: 'text', content: 'Cozinhando algo especial hoje 🍕', bg: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' }]
    },
    {
      id: 4, user: 'Diego Oliveira', avatar: '🧔', previewBg: '#f7971e',
      previewEmoji: '🎵', seen: true,
      slides: [{ type: 'text', content: 'Nova música saiu 🎵🎶', bg: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)' }]
    },
  ]);

  private activeStoryIdSignal = signal<number | null>(null);
  private addStoryModalOpenSignal = signal(false);

  stories = computed(() => this.storiesSignal());
  activeStoryId = computed(() => this.activeStoryIdSignal());
  activeStory = computed(() => {
    const id = this.activeStoryIdSignal();
    if (id === null) return null;
    return this.storiesSignal().find(s => s.id === id) ?? null;
  });
  isAddModalOpen = computed(() => this.addStoryModalOpenSignal());

  openStory(id: number): void {
    // Mark as seen
    this.storiesSignal.update(stories =>
      stories.map(s => s.id === id ? { ...s, seen: true } : s)
    );
    this.activeStoryIdSignal.set(id);
  }

  closeStory(): void {
    this.activeStoryIdSignal.set(null);
  }

  navigateStory(direction: 'next' | 'prev'): void {
    const current = this.activeStoryIdSignal();
    if (current === null) return;
    const stories = this.storiesSignal();
    const idx = stories.findIndex(s => s.id === current);
    const newIdx = direction === 'next' ? idx + 1 : idx - 1;
    if (newIdx >= 0 && newIdx < stories.length) {
      this.openStory(stories[newIdx].id);
    } else {
      this.closeStory();
    }
  }

  openAddModal(): void {
    this.addStoryModalOpenSignal.set(true);
  }

  closeAddModal(): void {
    this.addStoryModalOpenSignal.set(false);
  }

  addStory(content: string, bg?: string, type: StorySlide['type'] = 'text', filter: string = 'none', overlays: StoryOverlay[] = []): void {
    const newStory: Story = {
      id: Date.now(),
      user: 'Você',
      avatar: 'https://i.pravatar.cc/150?img=11', // Dummy picture
      previewBg: bg || '#000',
      previewEmoji: type === 'video' ? '🎥' : type === 'image' ? '📸' : '✨',
      seen: false,
      slides: [{ type, content, bg, filter, overlays }]
    };
    this.storiesSignal.update(s => [newStory, ...s]);
    this.closeAddModal();
  }

  editStorySlide(storyId: number, newContent: string): void {
    this.storiesSignal.update(stories =>
      stories.map(s => {
        if (s.id === storyId) {
          const slide = s.slides[0];
          if (slide.type === 'text') {
            return { ...s, slides: [{ ...slide, content: newContent }] };
          } else {
            const upOverlays: StoryOverlay[] = slide.overlays && slide.overlays.length > 0
              ? [{ ...slide.overlays[0], content: newContent }]
              : [{ type: 'text' as const, content: newContent }];
            return { ...s, slides: [{ ...slide, overlays: upOverlays }] };
          }
        }
        return s;
      })
    );
  }
}
