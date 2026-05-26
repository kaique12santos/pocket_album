import supabase from '../config/database.js';

export const getTouristSpots = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('tourist_spots')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao buscar pontos turísticos:', error.message);
    res.status(500).json({ error: 'Erro ao carregar mapa' });
  }
};