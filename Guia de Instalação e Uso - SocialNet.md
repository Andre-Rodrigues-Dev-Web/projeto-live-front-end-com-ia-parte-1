# Guia de Instalação e Uso - SocialNet

## 📋 Pré-requisitos

- **Node.js** 18+ (recomendado 22+)
- **npm** 10+
- **Angular CLI** 19+

## 🔧 Instalação Passo a Passo

### 1. Clonar ou Extrair o Projeto

```bash
cd social-network
```

### 2. Instalar Dependências

```bash
npm install
```

Isso instalará todas as dependências necessárias incluindo:
- Angular 19
- TypeScript
- Angular CLI
- E outras dependências

### 3. Iniciar o Servidor de Desenvolvimento

```bash
npm start
```

Ou alternativamente:

```bash
ng serve
```

O servidor será iniciado em `http://localhost:4200`

Se a porta 4200 estiver em uso, o Angular CLI pedirá para usar uma porta diferente.

## 🎯 Acessar a Aplicação

Após iniciar o servidor, abra seu navegador e acesse:

```
http://localhost:4200
```

Você verá a página inicial da SocialNet com:
- Navbar com logo e navegação
- Post Creator para criar novos posts
- Ad Banner com anúncios patrocinados
- Feed com posts existentes

## 🎮 Como Usar

### Criar um Post

1. Clique na textarea "O que você está pensando?"
2. Digite seu conteúdo
3. Clique no botão "Publicar"
4. Seu post aparecerá no topo do feed

### Interagir com Posts

- **Curtir:** Clique no botão 👍 para curtir um post
- **Comentar:** Clique no botão 💬 (funcionalidade preparada)
- **Compartilhar:** Clique no botão ↗️ (funcionalidade preparada)
- **Deletar:** Clique no ✕ para remover um post

### Navegar Anúncios

- Use os botões ← e → para navegar entre anúncios
- Clique nos pontos indicadores para ir direto a um anúncio
- Clique em "Saiba Mais" para interagir com o anúncio

### Acessar Perfil

1. Clique no botão "👤 Perfil" na navbar
2. Veja suas estatísticas:
   - Posts publicados
   - Seguidores
   - Pessoas seguindo
   - Receita total de anúncios
3. Veja análise de anúncios:
   - Anúncios exibidos
   - Cliques em anúncios
   - Taxa de cliques (CTR)
4. Veja suas conquistas

## 🏗️ Build para Produção

Para criar uma versão otimizada para produção:

```bash
npm run build
```

Os arquivos compilados estarão em `dist/social-network/browser/`

### Servir Build Localmente

```bash
cd dist/social-network/browser
npx http-server -p 8080
```

Acesse em `http://localhost:8080`

## 📦 Estrutura de Pastas

```
social-network/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── feed/              # Feed de posts
│   │   │   ├── post-creator/      # Criador de posts
│   │   │   ├── ad-banner/         # Anúncios
│   │   │   └── user-profile/      # Perfil
│   │   ├── services/
│   │   │   └── post.ts            # Serviço de posts
│   │   ├── app.ts                 # Componente raiz
│   │   ├── app.html               # Template
│   │   └── app.css                # Estilos
│   ├── styles.css                 # Estilos globais
│   ├── main.ts                    # Entrada
│   └── index.html                 # HTML base
├── angular.json                   # Config Angular
├── tsconfig.json                  # Config TypeScript
├── package.json                   # Dependências
└── README_PT.md                   # Documentação
```

## 🔧 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm start` | Inicia servidor de desenvolvimento |
| `npm run build` | Build para produção |
| `npm run build -- --configuration development` | Build em modo desenvolvimento |
| `ng serve` | Alternativa para iniciar servidor |
| `ng generate component <name>` | Gera novo componente |
| `ng generate service <name>` | Gera novo serviço |

## 🐛 Troubleshooting

### Porta 4200 em Uso

Se a porta 4200 estiver em uso:

```bash
# Usar porta diferente
ng serve --port 4201
```

### Dependências Não Instaladas

```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Erros de Compilação

```bash
# Limpar cache Angular
rm -rf .angular/cache
npm start
```

## 📱 Responsividade

A aplicação é totalmente responsiva:

- **Desktop (1200px+):** Layout completo com sidebar
- **Tablet (768px-1199px):** Layout ajustado
- **Mobile (<768px):** Layout mobile otimizado

Teste redimensionando a janela do navegador ou usando DevTools (F12).

## 🎨 Personalização

### Mudar Cores

Edite os arquivos CSS:
- `src/styles.css` - Estilos globais
- `src/app/app.css` - Estilos da navbar
- `src/app/components/*/component.css` - Estilos específicos

Cores principais:
- Azul primário: `#0a66c2`
- Roxo gradiente: `#667eea` → `#764ba2`

### Adicionar Novos Componentes

```bash
ng generate component components/novo-componente
```

### Modificar Dados

Edite `src/app/services/post.ts` para adicionar/modificar posts e anúncios.

## 🚀 Deploy

### Netlify

```bash
npm run build
# Faça upload da pasta dist/social-network/browser
```

### Vercel

```bash
npm run build
# Conecte seu repositório no Vercel
```

### GitHub Pages

```bash
ng build --base-href="/social-network/"
# Faça upload da pasta dist
```

## 📚 Recursos Adicionais

- [Documentação Angular](https://angular.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [MDN Web Docs](https://developer.mozilla.org/)

## 💬 Suporte

Para dúvidas ou problemas:
1. Verifique a documentação em README_PT.md
2. Consulte a documentação oficial do Angular
3. Verifique o console do navegador (F12) para erros

## ✅ Checklist de Funcionalidades

- [x] Feed de posts
- [x] Criar novos posts
- [x] Curtir posts
- [x] Deletar posts
- [x] Sistema de anúncios
- [x] Navegação de anúncios
- [x] Perfil de usuário
- [x] Estatísticas de monetização
- [x] Design responsivo
- [x] Animações suaves

## 🎉 Pronto!

Agora você está pronto para usar a SocialNet! Divirta-se explorando a plataforma! 🚀
