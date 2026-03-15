import { Injectable, signal, computed } from '@angular/core';

export interface ChatUser {
  id: number;
  name: string;
  avatar: string;
  isOnline: boolean;
}

export interface ChatMessage {
  id: number;
  senderId: number;
  receiverId: number;
  text: string;
  type?: 'text' | 'image' | 'audio' | 'file';
  fileUrl?: string; // Simulated attachment URL
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // Estado local com Signals
  private onlineUsersSignal = signal<ChatUser[]>([
    { id: 101, name: 'Ana Silva', avatar: 'https://i.pravatar.cc/150?img=11', isOnline: true },
    { id: 102, name: 'Carlos Santos', avatar: 'https://i.pravatar.cc/150?img=12', isOnline: true },
    { id: 103, name: 'Beatriz Costa', avatar: 'https://i.pravatar.cc/150?img=13', isOnline: true },
    { id: 104, name: 'Diego Oliveira', avatar: 'https://i.pravatar.cc/150?img=14', isOnline: true },
    { id: 105, name: 'Fernanda Lima', avatar: 'https://i.pravatar.cc/150?img=15', isOnline: true }
  ]);

  private activeChatUserSignal = signal<ChatUser | null>(null);
  private messagesSignal = signal<ChatMessage[]>([]);
  private currentUserIdentifier = 0; // ID do usuário logado (simulado)

  // Computed properties
  onlineUsers = computed(() => this.onlineUsersSignal());
  activeChatUser = computed(() => this.activeChatUserSignal());
  
  // Computed que filtra as mensagens para a conversa atual
  currentChatMessages = computed(() => {
    const activeUser = this.activeChatUserSignal();
    if (!activeUser) return [];

    return this.messagesSignal().filter(m => 
      (m.senderId === this.currentUserIdentifier && m.receiverId === activeUser.id) ||
      (m.senderId === activeUser.id && m.receiverId === this.currentUserIdentifier)
    ).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  });

  constructor() {
    this.mockInitialMessages();
  }

  // Abre janela de chat
  openChat(userId: number): void {
    const user = this.onlineUsersSignal().find(u => u.id === userId);
    if (user) {
      this.activeChatUserSignal.set(user);
    }
  }

  // Fecha janela de chat
  closeChat(): void {
    this.activeChatUserSignal.set(null);
  }

  // Envia mensagem do usuário logado para o usuário ativo no chat
  sendMessage(text: string, type: ChatMessage['type'] = 'text', fileUrl?: string): void {
    const activeUser = this.activeChatUserSignal();
    if (!activeUser || (!text.trim() && !fileUrl)) return;

    const newMessage: ChatMessage = {
      id: Date.now(),
      senderId: this.currentUserIdentifier,
      receiverId: activeUser.id,
      text: text.trim(),
      type,
      fileUrl,
      timestamp: new Date()
    };

    this.messagesSignal.update(messages => [...messages, newMessage]);

    // Simula uma resposta do outro usuário após 1-3 segundos
    setTimeout(() => {
      this.simulateReply(activeUser);
    }, 1000 + Math.random() * 2000);
  }

  // Resposta mock do usuário do chat
  private simulateReply(activeUser: ChatUser) {
    // Só responde se o chat do usuário continuar aberto
    if (this.activeChatUserSignal()?.id === activeUser.id) {
      const replies = [
        "Legal!", "Entendi.", "Vou dar uma olhada nisso.", 
        "Haha, muito bom!", "Podemos conversar depois?", "Sim, concordo."
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      
      const replyMessage: ChatMessage = {
        id: Date.now(),
        senderId: activeUser.id,
        receiverId: this.currentUserIdentifier,
        text: randomReply,
        timestamp: new Date()
      };

      this.messagesSignal.update(messages => [...messages, replyMessage]);
    }
  }

  // Popula algumas mensagens iniciais para dar contexto
  private mockInitialMessages() {
    const initialMessages: ChatMessage[] = [
      { id: 1, senderId: 101, receiverId: 0, text: 'Oi! Vi seu último post.', timestamp: new Date(Date.now() - 3600000) },
      { id: 2, senderId: 0, receiverId: 101, text: 'Olá Ana! Obrigado, que bom que gostou.', timestamp: new Date(Date.now() - 3500000) },
      { id: 3, senderId: 102, receiverId: 0, text: 'Você vai no evento de Angular amanhã?', timestamp: new Date(Date.now() - 86400000) }
    ];
    this.messagesSignal.set(initialMessages);
  }
}
