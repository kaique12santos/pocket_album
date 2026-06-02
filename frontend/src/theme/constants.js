// Configuração de constantes gerais do app
// Cores tema FIFA, mensagens, etc

export const THEME = {
  colors: {
    primary: '#1a1a1a',
    secondary: '#FFD700',
    accent: '#00A3E0',
    success: '#28a745',
    error: '#dc3545',
    background: '#121212',
    surface: '#1e1e1e',
  },
  typography: {
    heading: 'Anybody_900Black',
    highlight: 'Anybody_800ExtraBold',
    body: 'ArchivoNarrow_400Regular',
    label: 'ArchivoNarrow_700Bold',
    fontSize: {
      small: 12,
      medium: 14,
      large: 16,
      xlarge: 20,
    },
  },
};

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
