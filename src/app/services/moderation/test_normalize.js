const LEET_MAP = {
  '@': 'a', '4': 'a', '1': 'i', '3': 'e', '0': 'o', 
  '$': 's', '!': 'i', '5': 's', '7': 't', '8': 'b'
};

function normalizeText(text) {
  if (!text) return '';
  let normalized = text.toLowerCase();
  
  // 1. Remover Acentos
  normalized = normalized.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  // 2. Substituir Leet Speak
  for (const [key, val] of Object.entries(LEET_MAP)) {
    normalized = normalized.replace(new RegExp(`\\${key}`, 'g'), val);
  }
  
  // 3. Remover pontuações
  normalized = normalized.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');

  // 4. Reduzir letras repetidas
  normalized = normalized.replace(/([a-z])\1+/g, '$1');

  return normalized;
}

console.log("p0rr4 -> ", normalizeText("p0rr4"));
console.log("v$f -> ", normalizeText("v$f"));
console.log("LEET_MAP list: ", Object.keys(LEET_MAP));
