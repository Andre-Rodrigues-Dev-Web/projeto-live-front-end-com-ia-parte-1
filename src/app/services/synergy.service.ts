import { Injectable, inject, computed } from '@angular/core';
import { PostService } from './post.service';

export interface SynergyMatch {
  id: string;
  topic: string;
  sourcePostId: number;
  targetPostId: number;
  helperName: string;
  seekerName: string;
  helperAvatar: string;
  seekerAvatar: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class SynergyService {
  private postService = inject(PostService);

  // Computa Sinergias ativas batendo 'ajuda' contra 'colaborar'/'divulgacao'
  activeSynergies = computed<SynergyMatch[]>(() => {
    const posts = this.postService.getPosts()(); // Puxa posts atuais do feed
    const matches: SynergyMatch[] = [];

    const helpPosts = posts.filter(p => p.intent === 'ajuda');
    const collaboratePosts = posts.filter(p => p.intent === 'colaborar' || p.intent === 'divulgacao');

    helpPosts.forEach(help => {
      collaboratePosts.forEach(collab => {
        // Simple heuristic: match overlapping single keywords length > 3
        const helpWords = help.content.toLowerCase().split(/\s+/).filter(w => w.length > 3);
        const collabWords = collab.content.toLowerCase().split(/\s+/).filter(w => w.length > 3);

        const overlap = helpWords.filter(w => collabWords.includes(w));

        if (overlap.length > 0 && help.author !== collab.author) {
          const topic = overlap[0].toUpperCase(); // Primeiro match vira o Tópico
          matches.push({
            id: `${help.id}-${collab.id}`,
            topic: topic,
            sourcePostId: help.id,
            targetPostId: collab.id,
            helperName: collab.author,
            seekerName: help.author,
            helperAvatar: collab.avatar || 'https://i.pravatar.cc/150?img=11',
            seekerAvatar: help.avatar || 'https://i.pravatar.cc/150?img=12',
            description: `Match de objetivos em **${topic}**! ${help.author} precisa de ajuda e ${collab.author} quer colaborar.`
          });
        }
      });
    });

    return matches;
  });
}
