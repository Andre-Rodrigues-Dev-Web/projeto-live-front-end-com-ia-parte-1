import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { PostService } from '../../services/post.service';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from '../../services/user.service';
import { ProfanityFilterService } from '../../services/moderation/profanity-filter.service';
import { profanityValidator } from '../../services/moderation/profanity-validator';

@Component({
  selector: 'app-post-creator',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule,
    MatMenuModule
  ],
  templateUrl: './post-creator.html',
  styleUrl: './post-creator.scss',
})
export class PostCreator {
  private postService = inject(PostService);
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private filterService = inject(ProfanityFilterService);

  postForm = this.fb.group({
    content: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(500),
      profanityValidator(this.filterService)
    ]],
    intent: ['geral'] // Web 4.0 Intent
  });

  currentUser = {
    name: 'Você',
    avatar: 'https://i.pravatar.cc/150?img=0'
  };

  attachedMedia = signal<string | null>(null);
  mediaType = signal<'image' | 'video' | null>(null);

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

  removeMedia(): void {
    this.attachedMedia.set(null);
    this.mediaType.set(null);
  }

  addEmoji(emoji: string): void {
    const currentText = this.contentCtrl.value || '';
    this.postForm.patchValue({ content: currentText + emoji });
  }

  get contentCtrl() {
    return this.postForm.get('content')!;
  }

  get charCount() {
    return this.contentCtrl.value?.length ?? 0;
  }

  createPost(): void {
    if (this.postForm.valid && this.contentCtrl.value?.trim()) {
      const intent = this.postForm.get('intent')?.value as any || 'geral';
      this.postService.addPost(
        this.currentUser.name,
        this.currentUser.avatar,
        this.contentCtrl.value.trim(),
        intent,
        this.attachedMedia() || undefined,
        this.userService.user().isPrivate,
        this.mediaType() || 'image'
      );
      this.postForm.reset({ content: '', intent: 'geral' });
      this.attachedMedia.set(null); // Reset attachment
      this.mediaType.set(null);
    } else {
      this.postForm.markAllAsTouched();
    }
  }
}
