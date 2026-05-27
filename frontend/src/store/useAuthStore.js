import { create } from 'zustand';
import { supabase } from '../services/supabase';

export const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: false,
  error: null,

  // Função para ouvir mudanças (ex: quando o token expira ou o utilizador faz logout)
  initAuthListener: () => {
    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session, user: session?.user || null });
    });
  },

  // Cadastro: Repara que passamos o username para a trigger do backend apanhar!
  signUp: async (email, password, username) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }, 
      },
    });
    
    if (error) set({ error: error.message });
    set({ loading: false });
    return { data, error };
  },

  signIn: async (email, password) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) set({ error: error.message });
    set({ loading: false });
    return { data, error };
  },

  signOut: async () => {
    set({ loading: true });
    await supabase.auth.signOut();
    set({ user: null, session: null, loading: false });
  },
}));