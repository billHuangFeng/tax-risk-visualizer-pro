import { createClient } from '@supabase/supabase-js';

// Default to empty strings if env variables are undefined
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase environment variables are properly configured
export const isSupabaseConfigured = () => {
  return supabaseUrl !== '' && supabaseAnonKey !== '';
};

// Create a singleton Supabase client only if properly configured,
// otherwise create a mock client that warns about missing configuration
let supabaseClient;

if (isSupabaseConfigured()) {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Create a mock client that warns about missing configuration
  const warnAboutConfig = () => {
    console.warn(
      "Supabase is not properly configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables."
    );
    return Promise.resolve({ 
      error: new Error("Supabase is not configured properly"),
      data: null 
    });
  };

  supabaseClient = {
    auth: {
      signUp: warnAboutConfig,
      signIn: warnAboutConfig,
      signOut: warnAboutConfig,
      getUser: () => warnAboutConfig(),
    },
    from: () => ({
      select: warnAboutConfig,
      insert: warnAboutConfig,
      update: warnAboutConfig,
      upsert: warnAboutConfig,
      delete: warnAboutConfig,
    }),
  };
}

export const supabase = supabaseClient;
