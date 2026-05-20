import app from './src/app.js';
import { checkConnection } from './src/config/database.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    console.log('⏳ Verificando credenciais do Supabase...');
    
    await checkConnection();
    console.log('✅ Supabase conectado e respondendo!');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Falha Crítica: Não foi possível conectar ao Supabase.');
    console.error('Detalhe:', error.message);
    process.exit(1); // Fecha a aplicação com erro
  }
};

startServer();