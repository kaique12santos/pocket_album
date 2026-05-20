# Pocket Album - Estrutura de Pastas

## Projeto
- **Backend** (`/backend`): Servidor Node.js com Express e Supabase
- **Frontend** (`/frontend`): Aplicativo React Native com Expo

## Backend (`/backend`)

### Estrutura
```
backend/
├── src/
│   ├── config/          # Configurações (Supabase, variáveis de ambiente)
│   ├── controllers/     # Lida com Request/Response
│   ├── services/        # Regras de negócio e comunicação com APIs
│   ├── routes/          # Definição dos endpoints
│   ├── middlewares/     # Autenticação (JWT), tratamento de erros
│   ├── scripts/         # Scripts de ingestão da API-Football
│   └── utils/           # Funções auxiliares e formatadores
├── app.js               # Entry point
├── package.json         # Dependências
└── .env.example         # Variáveis de ambiente (exemplo)
```

### Dependências principais
- Express
- Supabase (@supabase/supabase-js)
- Axios (requisições HTTP)
- JWT (autenticação)

---

## Frontend (`/frontend`)

### Estrutura
```
frontend/
├── src/
│   ├── components/
│   │   ├── Album/       # Componentes do álbum (Sticker, Slot)
│   │   ├── Minigames/   # Componentes dos minigames (QuizCard, Silhouette)
│   │   └── common/      # Componentes reutilizáveis (Button, Card, Header)
│   ├── screens/         # "Páginas" (Home, Album, Quiz, Map, Login)
│   ├── hooks/           # Custom hooks (useAuth, useStickers, useRanking)
│   ├── services/        # Chamadas à API (Axios, configuração)
│   ├── navigation/      # Navegação (React Navigation)
│   ├── store/           # Gerenciamento de estado (Zustand)
│   ├── theme/           # Temas, cores (FIFA), tipografia
│   └── utils/           # Máscaras, validadores, constantes
├── assets/              # Imagens, fontes, sons
├── App.js               # Entry point
└── package.json         # Dependências
```

### Dependências principais
- React Native
- Expo
- React Navigation
- Zustand (state management)
- Axios (requisições HTTP)

---

## Como usar

### 1. Backend - Instalação
```bash
cd backend
npm install
cp .env.example .env
# Editar .env com suas credenciais
npm run dev
```

### 2. Frontend - Instalação
```bash
cd frontend
npm install
npm start
```

---

**Criado em:** May 20, 2026
