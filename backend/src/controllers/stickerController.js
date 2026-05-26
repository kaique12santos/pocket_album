import supabase from '../config/database.js';

export const getAllStickers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('stickers')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao buscar figurinhas:', error.message);
    res.status(500).json({ error: 'Erro interno ao buscar figurinhas' });
  }
};

export const getStickerById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('stickers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar figurinha' });
  }
};