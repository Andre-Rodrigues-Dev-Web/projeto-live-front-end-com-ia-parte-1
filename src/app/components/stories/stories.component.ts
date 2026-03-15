import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryService } from '../../services/story.service';
import { StoryCreatorComponent } from './story-creator/story-creator.component';

@Component({
  selector: 'app-stories',
  standalone: true,
  imports: [
    CommonModule,
    StoryCreatorComponent
  ],
  templateUrl: './stories.component.html',
  styleUrl: './stories.component.scss'
})
export class StoriesComponent {
  storyService = inject(StoryService);

  stories = this.storyService.stories;
  isAddModalOpen = this.storyService.isAddModalOpen;

  openAddModal() { this.storyService.openAddModal(); }
  openStory(id: number) { this.storyService.openStory(id); }
}
