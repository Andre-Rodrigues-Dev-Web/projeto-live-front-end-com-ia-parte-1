import { Component, effect, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ChatService, ChatMessage } from '../../services/chat.service';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatMenuModule],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent {
  private chatService = inject(ChatService);
  
  activeUser = this.chatService.activeChatUser;
  messages = this.chatService.currentChatMessages;
  newMessage = '';

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  constructor() {
    effect(() => {
      // Reagir a novas mensagens para fazer o autoscroll
      const messageCount = this.messages().length;
      if (messageCount > 0) {
        setTimeout(() => this.scrollToBottom(), 50);
      }
    });
  }

  closeChat() {
    this.chatService.closeChat();
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.chatService.sendMessage(this.newMessage);
      this.newMessage = '';
    }
  }

  /* 2025 Layout Additions */
  startCall(type: 'audio' | 'video'): void {
    alert(`Iniciando chamada de ${type} com ${this.activeUser()?.name}...`);
  }

  onFileSelected(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      const type = file.type.startsWith('image/') ? 'image' : 
                   file.type.startsWith('audio/') ? 'audio' : 'file';
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.chatService.sendMessage('Anexo', type, e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  recordAudio(): void {
    this.chatService.sendMessage('Gravando áudio... 🎙️', 'audio', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
  }

  addEmoji(emoji: string): void {
    this.newMessage += emoji;
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Stop default newline inside textarea
      this.sendMessage();
    }
  }

  private scrollToBottom() {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch(err) { }
  }
}
