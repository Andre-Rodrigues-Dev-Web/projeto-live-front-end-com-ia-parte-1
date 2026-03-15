import { TestBed } from '@angular/core/testing';
import { ProfanityFilterService } from './profanity-filter.service';

describe('ProfanityFilterService', () => {
  let service: ProfanityFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfanityFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('normalizeText', () => {
    it('should lower case and remove accents', () => {
      expect(service.normalizeText('PÔRRA')).toBe('pora');
    });

    it('should convert leet speak numbers', () => {
      expect(service.normalizeText('p0rr4')).toBe('pora');
      expect(service.normalizeText('v$f')).toBe('vsf');
    });

    it('should reduce duplicate letters', () => {
      expect(service.normalizeText('pooooorrrraaaa')).toBe('pora');
    });

    it('should ignore embedded punctuation triggers', () => {
      expect(service.normalizeText('p.o.r.r.a')).toBe('pora');
    });
  });

  describe('containsProfanity', () => {
    it('should detect direct swear word', () => {
      expect(service.containsProfanity('Isso é uma porra')).toBe(true);
    });

    it('should detect abbreviations', () => {
      expect(service.containsProfanity('Para de ser fdp')).toBe(true);
    });

    it('should NOT detect whitelist words (false positives)', () => {
      expect(service.containsProfanity('Liguei meu computador hoje')).toBe(false);
      expect(service.containsProfanity('Houve uma disputa acirrada')).toBe(false);
    });

    it('should detect bad word inside string bound checking', () => {
      expect(service.containsProfanity('Seu arrombado')).toBe(true);
    });
  });

  describe('maskProfanity', () => {
    it('should mask accurate sizes with asterisks', () => {
      expect(service.maskProfanity('Caralho mano')).toBe('******* mano');
    });

    it('should preserve original spacing', () => {
      expect(service.maskProfanity('vai se   foder')).toBe('vai se   *****');
    });
  });

  describe('Severity Scoring', () => {
    it('should score high for swear words', () => {
      expect(service.getSeverityLevel('Caralho')).toBe('high');
    });

    it('should score medium for mild insults', () => {
      expect(service.getSeverityLevel('Seu babaca')).toBe('medium');
    });

    it('should score clean for safe text', () => {
      expect(service.getSeverityLevel('Bom dia amigo')).toBe('clean');
    });
  });
});
