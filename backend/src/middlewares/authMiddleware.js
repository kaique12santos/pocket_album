import supabase from '../config/database.js';

export const requireAuth = async (req, res, next) => {
  try {
    
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    }

    const token = authHeader.split(' ')[1];

    // Valida o JWT de forma segura com o Supabase Auth
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Token inválido ou expirado.' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Erro interno na validação de identidade.' });
  }
};