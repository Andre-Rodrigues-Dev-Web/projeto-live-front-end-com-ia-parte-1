import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface UserStats {
  followers: number;
  following: number;
  posts: number;
  revenue: number;
}

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfile {
  private userService = inject(UserService);

  user = this.userService.user;

  stats = signal<UserStats>({
    followers: 1250,
    following: 342,
    posts: 87,
    revenue: 2450.50
  });

  isFollowing = signal(false);

  toggleFollow(): void {
    this.isFollowing.update(value => !value);
  }

  togglePrivacy(): void {
    this.userService.togglePrivacy();
  }

  editProfile(): void {
    console.log('Editar perfil');
  }

  shareProfile(): void {
    console.log('Compartilhar perfil');
  }
}
