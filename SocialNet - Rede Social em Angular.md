# SocialNet - Rede Social em Angular

Uma plataforma de rede social moderna construída com **Angular**, oferecendo funcionalidades de compartilhamento de posts, sistema de monetização com anúncios e perfil de usuário com estatísticas de receita.

## 🚀 Funcionalidades Principais

### 📰 Feed de Posts
- Visualização de posts em tempo real
- Informações do autor (avatar, nome, timestamp)
- Estatísticas de engajamento (curtidas, comentários, compartilhamentos)
- Ações interativas (curtir, comentar, compartilhar)
- Opção de deletar posts

### ✍️ Criador de Posts
- Textarea intuitivo para criar novos posts
- Botões de ação (Foto, Vídeo, Emoji)
- Validação de conteúdo
- Publicação instantânea

### 💰 Sistema de Monetização
- **Banners de Anúncios:** Múltiplos anúncios patrocinados com navegação
- **Indicadores Visuais:** Pontos de navegação para anúncios
- **Controles:** Botões anterior/próximo para navegar entre anúncios
- **Estatísticas:** Informações de impressões e cliques

### 👤 Perfil de Usuário
- **Informações Pessoais:** Avatar, nome, username, bio
- **Estatísticas:** Posts, seguidores, seguindo
- **Monetização:** Dashboard com receita total
- **Análise de Anúncios:** 
  - Anúncios exibidos
  - Cliques em anúncios
  - Taxa de cliques (CTR)
- **Conquistas:** Badges de criador, influenciador, engajado e premium

### 🎨 Design Responsivo
- Interface moderna e limpa
- Cores profissionais (azul #0a66c2, roxo gradiente)
- Totalmente responsivo para mobile, tablet e desktop
- Animações suaves e transições

## 🛠️ Stack Tecnológico

- **Framework:** Angular 19+
- **Linguagem:** TypeScript
- **Estilo:** CSS3 com Flexbox e Grid
- **Gerenciamento de Estado:** Angular Signals
- **Roteamento:** Angular Router
- **Build:** Angular CLI

## 📁 Estrutura do Projeto

```
social-network/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── feed/              # Componente do feed de posts
│   │   │   ├── post-creator/      # Criador de posts
│   │   │   ├── ad-banner/         # Banner de anúncios
│   │   │   └── user-profile/      # Perfil do usuário
│   │   ├── services/
│   │   │   └── post.ts            # Serviço de gerenciamento de posts
│   │   ├── app.ts                 # Componente raiz
│   │   ├── app.html               # Template principal
│   │   └── app.css                # Estilos globais
│   ├── styles.css                 # Estilos globais
│   └── main.ts                    # Ponto de entrada
├── angular.json                   # Configuração Angular
├── tsconfig.json                  # Configuração TypeScript
└── package.json                   # Dependências
```

## 🚀 Como Executar

### Instalação
```bash
cd social-network
npm install
```

### Desenvolvimento
```bash
npm start
```
A aplicação estará disponível em `http://localhost:4200`

### Build para Produção
```bash
npm run build
```

## 📊 Componentes Principais

### Feed Component
Exibe a lista de posts com todas as informações e ações interativas.

**Props:**
- `posts`: Signal com array de posts

**Métodos:**
- `likePost(postId)`: Incrementa curtidas
- `deletePost(postId)`: Remove post
- `formatDate(date)`: Formata data relativa

### PostCreator Component
Permite criar novos posts na rede social.

**Métodos:**
- `createPost()`: Publica novo post
- `onContentChange(event)`: Atualiza conteúdo do post

### AdBanner Component
Exibe anúncios patrocinados com navegação.

**Métodos:**
- `nextAd()`: Próximo anúncio
- `previousAd()`: Anúncio anterior
- `goToAd(index)`: Vai para anúncio específico

### UserProfile Component
Mostra perfil do usuário com estatísticas e monetização.

**Dados:**
- Informações do usuário
- Estatísticas (posts, seguidores, receita)
- Análise de anúncios
- Conquistas

## 🎯 Dados de Exemplo

O projeto inclui dados simulados de:
- 5 posts iniciais com diferentes autores
- 3 anúncios patrocinados
- Estatísticas de monetização
- Informações de perfil

## 🔄 Fluxo de Dados

```
PostService (Signals)
    ↓
Feed Component ← Exibe posts
    ↓
PostCreator → Cria novo post
    ↓
PostService atualiza estado
    ↓
Feed atualiza automaticamente (Signals)
```

## 💡 Recursos Destacados

- **Signals Angular:** Gerenciamento reativo de estado
- **Componentes Standalone:** Sem necessidade de módulos
- **Type Safety:** TypeScript completo
- **Responsividade:** Mobile-first design
- **Performance:** Build otimizado

## 🎨 Paleta de Cores

- **Primária:** #0a66c2 (Azul LinkedIn)
- **Gradiente:** #667eea → #764ba2 (Roxo)
- **Texto:** #1a1a1a (Cinza escuro)
- **Fundo:** #f5f5f5 (Cinza claro)
- **Bordas:** #e0e0e0 (Cinza médio)

## 📱 Breakpoints Responsivos

- **Desktop:** 1200px+
- **Tablet:** 768px - 1199px
- **Mobile:** até 767px

## 🔐 Segurança

- Input sanitizado
- Validação de dados
- Sem exposição de dados sensíveis

## 🚀 Próximas Melhorias

- Autenticação e autorização
- Banco de dados real (Firebase/MongoDB)
- Sistema de comentários
- Notificações em tempo real
- Upload de imagens
- Sistema de seguir/deixar de seguir
- Busca de posts
- Filtros e categorias

## 📝 Licença

MIT

## 👨‍💻 Desenvolvido com Angular

Construído com ❤️ usando Angular 19+
