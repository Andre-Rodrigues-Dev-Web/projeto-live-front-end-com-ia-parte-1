import { Component, inject, signal, effect, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryService } from '../../services/story.service';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-story-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './story-viewer.component.html',
  styleUrl: './story-viewer.component.scss'
})
export class StoryViewerComponent implements OnDestroy {
  storyService = inject(StoryService);

  activeStory = this.storyService.activeStory;
  progress = signal(0);

  private intervalRef: ReturnType<typeof setInterval> | null = null;

  constructor() {
    effect(() => {
      const story = this.activeStory();
      if (story) {
        this.startProgress();
      } else {
        this.stopProgress();
      }
    });
  }

  private startProgress() {
    this.stopProgress();
    this.progress.set(0);
    const duration = 5000; // 5 seconds
    const step = 100 / (duration / 50);
    this.intervalRef = setInterval(() => {
      if (this.isEditing()) return; // Pause while editing
      
      this.progress.update(p => {
        if (p >= 100) {
          this.next();
          return 0;
        }
        return p + step;
      });
    }, 50);
  }

  private stopProgress() {
    if (this.intervalRef) {
      clearInterval(this.intervalRef);
      this.intervalRef = null;
    }
    this.progress.set(0);
  }

  isEditing = signal(false);
  editContent = signal('');

  enableEdit() {
    const story = this.activeStory();
    if (!story) return;
    const slide = story.slides[0];
    this.isEditing.set(true);
    this.editContent.set(slide.type === 'text' ? slide.content : slide.overlays?.[0]?.content || '');
  }

  cancelEdit() {
    this.isEditing.set(false);
    this.editContent.set('');
  }

  saveEdit() {
    const story = this.activeStory();
    if (story && this.editContent().trim()) {
      this.storyService.editStorySlide(story.id, this.editContent().trim());
      this.cancelEdit();
    }
  }

  close() {
    this.storyService.closeStory();
  }

  next() {
    this.storyService.navigateStory('next');
  }

  prev() {
    this.storyService.navigateStory('prev');
  }

  ngOnDestroy() {
    this.stopProgress();
  }
}
