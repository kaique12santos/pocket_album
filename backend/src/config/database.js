import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variáveis de ambiente SUPABASE_URL ou SUPABASE_KEY não estão definidas!');
  process.exit(1); // Encerra o processo com erro
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Função para testar a comunicação com o Supabase
export const checkConnection = async () => {
  // select simples para testar conexao
  const { error } = await supabase.from('stickers').select('id').limit(1);
  if (error) throw error;
  return true;
};

export default supabase;
