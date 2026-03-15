import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { StoryService } from '../../../services/story.service';
import { ProfanityFilterService } from '../../../services/moderation/profanity-filter.service';
import { profanityValidator } from '../../../services/moderation/profanity-validator';

const GRADIENTS = [
  'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)',
  'linear-gradient(135deg, #4776e6 0%, #8e54e9 100%)',
  'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
  'linear-gradient(135deg, #0a66c2 0%, #00c9ff 100%)',
  'linear-gradient(135deg, #e52d27 0%, #b31217 100%)',
];

const INSTAGRAM_FILTERS = [
  { name: 'Normal', value: 'none' },
  { name: 'Sepia', value: 'sepia(0.8)' },
  { name: 'P&B', value: 'grayscale(1)' },
  { name: 'Vintage', value: 'contrast(1.1) sepia(0.3) saturate(1.3)' },
  { name: 'Neon', value: 'hue-rotate(180deg) saturate(1.5)' }
];

@Component({
  selector: 'app-story-creator',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule
  ],
  templateUrl: './story-creator.component.html',
  styleUrl: './story-creator.component.scss'
})
export class StoryCreatorComponent {
  private fb = inject(FormBuilder);
  storyService = inject(StoryService);
  filterService = inject(ProfanityFilterService);

  selectedBg = GRADIENTS[0];
  gradients = GRADIENTS;
  filters = INSTAGRAM_FILTERS;

  attachedMedia = signal<string | null>(null);
  mediaType = signal<'text' | 'image' | 'video'>('text');
  selectedFilter = signal<string>('none');
  
  overlayX = signal(50);
  overlayY = signal(50);
  private isDragging = false;

  storyForm = this.fb.group({
    content: ['', [
      Validators.minLength(3), 
      Validators.maxLength(120),
      profanityValidator(this.filterService)
    ]]
  });

  get contentCtrl() { return this.storyForm.get('content')!; }
  get charCount() { return this.contentCtrl.value?.length || 0; }
  get previewText() { return this.contentCtrl.value; }

  onDragStart(event: MouseEvent | TouchEvent): void {
    this.isDragging = true;
  }

  onDragMove(event: MouseEvent | TouchEvent, previewBox: HTMLElement): void {
    if (!this.isDragging) return;
    const rect = previewBox.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0].clientX : (event as MouseEvent).clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : (event as MouseEvent).clientY;

    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    this.overlayX.set(Math.min(Math.max(x, 5), 94));
    this.overlayY.set(Math.min(Math.max(y, 5), 94));
  }

  onDragEnd(): void {
    this.isDragging = false;
  }

  onFileSelected(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      const type = file.type.startsWith('video/') ? 'video' : 'image';
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.attachedMedia.set(e.target.result);
        this.mediaType.set(type);
      };
      reader.readAsDataURL(file);
    }
  }

  selectFilter(filterValue: string): void {
    this.selectedFilter.set(filterValue);
  }

  removeMedia(): void {
    this.attachedMedia.set(null);
    this.mediaType.set('text');
    this.selectedFilter.set('none');
  }

  selectBg(bg: string) { this.selectedBg = bg; }

  closeAddModal() {
    this.storyService.closeAddModal();
    this.storyForm.reset();
    this.selectedBg = GRADIENTS[0];
    this.removeMedia();
  }

  publishStory() {
    if (this.storyForm.invalid) {
      this.storyForm.markAllAsTouched();
      return;
    }

    const content = this.contentCtrl.value?.trim() || '';
    const isMedia = this.mediaType() !== 'text';

    if (isMedia || (content.length >= 3)) {
      const slideContent = isMedia ? this.attachedMedia()! : content;
      const overlays: any[] = isMedia && content ? [{ 
        type: 'text', 
        content,
        x: this.overlayX(),
        y: this.overlayY()
      }] : [];

      this.storyService.addStory(slideContent, this.selectedBg, this.mediaType(), this.selectedFilter(), overlays);
      this.storyForm.reset();
      this.selectedBg = GRADIENTS[0];
      this.removeMedia();
    } else {
      this.storyForm.markAllAsTouched();
    }
  }
}
