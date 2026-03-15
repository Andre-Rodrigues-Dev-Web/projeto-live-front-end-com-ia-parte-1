import { Injectable, signal } from '@angular/core';

export interface UserProfileData {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  coverImage: string;
  isPrivate: boolean; // Privacy switch
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user = signal<UserProfileData>({
    name: 'Você',
    username: '@seu_usuario',
    bio: 'Desenvolvedor web apaixonado por Angular e inovação 💻',
    avatar: 'https://i.pravatar.cc/150?img=0',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=300&fit=crop',
    isPrivate: false // Default public
  });

  togglePrivacy(): void {
    this.user.update(u => ({ ...u, isPrivate: !u.isPrivate }));
  }
}
