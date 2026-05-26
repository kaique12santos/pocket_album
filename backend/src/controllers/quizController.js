import supabase from '../config/database.js';

export const getAllQuizzes = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar quizzes' });
  }
};