
import { createClient } from '@supabase/supabase-js';

// Supabase 项目配置
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gnegjrljpxdqkqkxrjpf.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduZWdqcmxqcHhkcWtxa3hyanBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MzYwNjAsImV4cCI6MjA2MDMxMjA2MH0.Hlk1fJaqywV24QlBdmxkEgL0AfZDInIpt7PNmHgYinM';

// Check if Supabase environment variables are properly configured
export const isSupabaseConfigured = () => {
  return supabaseUrl !== '' && supabaseAnonKey !== '';
};

// Create a singleton Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
