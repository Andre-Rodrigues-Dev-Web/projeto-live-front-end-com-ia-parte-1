import { Injectable, signal, effect } from '@angular/core';

export type FontSize = 'small' | 'medium' | 'large';

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {
  isDarkMode = signal<boolean>(false);
  fontSize = signal<FontSize>('medium');

  constructor() {
    // Carregar configurações do localStorage se existirem
    if (typeof localStorage !== 'undefined') {
      this.isDarkMode.set(localStorage.getItem('theme') === 'dark');
      this.fontSize.set((localStorage.getItem('fontSize') as FontSize) || 'medium');
    }

    // Efeito para aplicar Dark Mode no Body
    effect(() => {
      const dark = this.isDarkMode();
      if (typeof document !== 'undefined') {
        if (dark) {
          document.body.classList.add('dark-mode');
        } else {
          document.body.classList.remove('dark-mode');
        }
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('theme', dark ? 'dark' : 'light');
        }
      }
    });

    // Efeito para aplicar Tamanho de Fonte no Body
    effect(() => {
      const size = this.fontSize();
      if (typeof document !== 'undefined') {
        document.body.classList.remove('font-small', 'font-medium', 'font-large');
        document.body.classList.add(`font-${size}`);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('fontSize', size);
        }
      }
    });
  }

  toggleDarkMode() {
    this.isDarkMode.update(v => !v);
  }

  setFontSize(size: FontSize) {
    this.fontSize.set(size);
  }
}
