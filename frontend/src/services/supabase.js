// import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yybmqwzposqlwuomnzgc.supabase.co';
const supabaseAnonKey = 'sb_publishable_bYMITI3xmPH8H9s14WG3SQ_pFRzAlDD';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);