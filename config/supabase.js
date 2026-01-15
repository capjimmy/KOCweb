// Supabase Configuration
const SUPABASE_CONFIG = {
  url: 'https://rurnsbtzdglmjpftwzfi.supabase.co',
  anonKey: 'sb_publishable_OxjmpMoJbRAJouMG6aIwjw_FFFcfOjZ'
};

// Initialize Supabase Client
function initSupabase() {
  if (typeof supabase !== 'undefined') {
    return supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
  }
  console.error('Supabase library not loaded');
  return null;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SUPABASE_CONFIG, initSupabase };
}
