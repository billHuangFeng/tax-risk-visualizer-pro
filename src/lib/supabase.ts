
import { createClient } from '@supabase/supabase-js';

// Default to empty strings if env variables are undefined
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a singleton Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Provide a helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return supabaseUrl !== '' && supabaseAnonKey !== '';
};
