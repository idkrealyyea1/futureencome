// =====================================================================
// UniVault — frontend config (single place to edit)
// For PRODUCTION, set the real values here.
// scripts/dev.sh overwrites this file with local values for local testing.
// =====================================================================

const UNIVAULT_CONFIG = {
  SUPABASE_URL: 'https://xxxx.supabase.co',
  SUPABASE_ANON_KEY: 'xxxx',
  API_URL: 'https://univault-api.onrender.com',
  VAPID_PUBLIC_KEY: 'xxxxx' // same value as the Render env var; safe to expose
};

// Base path of the site, computed at runtime.
// Empty when served from the domain root (custom domain / localhost).
// On GitHub Pages project sites this becomes '/<repo>/' automatically.
const SITE_BASE = (() => {
  const cut = location.pathname.lastIndexOf('/');
  let dir = cut === -1 ? '' : location.pathname.slice(0, cut);
  if (dir.endsWith('/admin')) dir = dir.slice(0, -6);
  return dir;
})();
