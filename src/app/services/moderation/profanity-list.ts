export const LEET_MAP: { [key: string]: string } = {
  '@': 'a', '4': 'a', '1': 'i', '3': 'e', '0': 'o', 
  '$': 's', '!': 'i', '5': 's', '7': 't', '8': 'b'
};

export const HIGH_SEVERITY: string[] = [
  'caralho', 'porra', 'puta', 'viado', 'fdp', 'vsf', 'pqp', 'filho da puta',
  'arrombado', 'cuzao', 'vai se foder', 'tomanoku', 'cacete', 'buceta', 'piroca', 'foder'
];

export const MEDIUM_SEVERITY: string[] = [
  'babaca', 'idiota', 'merda', 'bosta', 'trouxa', 'panaca', 'retardado'
];

export const LOW_SEVERITY: string[] = [
  'chato', 'feio', 'bobo'
];

// Words containing profanity substrings that are actually safe
export const WHITELIST: string[] = [
  'computador', 'computadores', 'deputada', 'putativa', 'disputa', 'disputar',
  'escaravelho', 'escaravelhos'
];
