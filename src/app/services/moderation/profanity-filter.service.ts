import { Injectable } from '@angular/core';
import { HIGH_SEVERITY, MEDIUM_SEVERITY, LOW_SEVERITY, LEET_MAP, WHITELIST } from './profanity-list';

@Injectable({
  providedIn: 'root'
})
export class ProfanityFilterService {

  /**
   * Remove acentos, converte Leet Speak, reduz letras repetidas e pontuações
   */
  normalizeText(text: string): string {
    if (!text) return '';
    
    let normalized = text.toLowerCase();
    
    // 1. Remover Acentos
    normalized = normalized.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
    // 2. Substituir Leet Speak (@ -> a, 4 -> a, 1 -> i, etc)
    for (const [key, val] of Object.entries(LEET_MAP)) {
      const escapedKey = isNaN(Number(key)) ? `\\${key}` : key;
      normalized = normalized.replace(new RegExp(escapedKey, 'g'), val);
    }
    
    // 3. Remover pontuações coladas que tentam burlar (ex: p.o.r.r.a)
    normalized = normalized.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');

    // 4. Reduzir letras repetidas (ex: fffuuuddeeerrr -> fuder)
    normalized = normalized.replace(/([a-z])\1+/g, '$1');

    return normalized;
  }

  /**
   * Checa se a palavra normalizada está na lista de profanidades, 
   * respeitando a Whitelist de falsos positivos.
   */
  private checkIfProfane(word: string): boolean {
    const normWhitelist = WHITELIST.map(w => this.normalizeText(w));
    if (normWhitelist.includes(word)) return false;

    const allBlwords = [...HIGH_SEVERITY, ...MEDIUM_SEVERITY, ...LOW_SEVERITY];
    return allBlwords.some(bad => {
      const normBad = this.normalizeText(bad);
      return normBad === word || (word.includes(normBad) && !normWhitelist.includes(word));
    });
  }

  /**
   * Checa se o texto contém qualquer linguagem inadequada
   */
  containsProfanity(text: string): boolean {
    if (!text) return false;
    
    const words = text.split(/\s+/);
    return words.some(w => this.checkIfProfane(this.normalizeText(w)));
  }

  /**
   * Máscara automática de palavras tóxicas (ex: porra -> *****)
   */
  maskProfanity(text: string): string {
    if (!text) return '';

    const words = text.split(/(\s+)/); // Preserva os espaços originais
    const masked = words.map(w => {
      if (w.trim().length === 0) return w; // ignora espaços
      
      const normalized = this.normalizeText(w);
      if (this.checkIfProfane(normalized)) {
        return '*'.repeat(w.length);
      }
      return w;
    });

    return masked.join('');
  }

  /**
   * Coleta todos os termos proibidos detectados em word forms
   */
  getDetectedTerms(text: string): string[] {
    if (!text) return [];

    const words = text.split(/\s+/);
    return words
      .map(w => ({ original: w, norm: this.normalizeText(w) }))
      .filter(wObj => this.checkIfProfane(wObj.norm))
      .map(wObj => wObj.original);
  }

  /**
   * Pontuação de Severidade baseado nos termos encontrados
   */
  getSeverityLevel(text: string): 'high' | 'medium' | 'low' | 'clean' {
    const terms = this.getDetectedTerms(text).map(t => this.normalizeText(t));
    if (terms.length === 0) return 'clean';

    if (terms.some(t => HIGH_SEVERITY.includes(t))) return 'high';
    if (terms.some(t => MEDIUM_SEVERITY.includes(t))) return 'medium';
    return 'low';
  }
}
