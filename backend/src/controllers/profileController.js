import supabase from '../config/database.js';

// 1. Busca os top 50 para montar a tela de Ranking
export const getGlobalRanking = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('username, score')
      .order('score', { ascending: false })
      .limit(50);

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar ranking global' });
  }
};

// 2. Atualiza a pontuação quando o usuário acerta um quiz ou destrava figurinha
export const addPoints = async (req, res) => {
  try {
    const { points } = req.body;
    const userId = req.user.id; // Veio seguro do JWT via authMiddleware

    if (!points || typeof points !== 'number') {
      return res.status(400).json({ error: 'Quantidade de pontos inválida.' });
    }

    // Busca o perfil atual
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('score, coins')
      .eq('id', userId)
      .single();

    if (fetchError) throw fetchError;

    // Incrementa os valores
    const newScore = profile.score + points;
    const newCoins = profile.coins + points;

    // Atualiza no banco
    const { data, error } = await supabase
      .from('profiles')
      .update({ score: newScore, coins: newCoins })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    res.status(200).json({ message: 'Pontuação atualizada', profile: data });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar pontuação' });
  }
};