/**
 * --------------------------------------------------------
 * Supabase Configuration
 * --------------------------------------------------------
 * Creates a single reusable Supabase client.
 * --------------------------------------------------------
 */

const { createClient } = require("@supabase/supabase-js");

/**
 * Environment Variables
 */
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Validate Environment Configuration
 */
if (!SUPABASE_URL) {
  throw new Error(
    "SUPABASE_URL is missing from the environment configuration."
  );
}

if (!SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    "SUPABASE_SERVICE_ROLE_KEY is missing from the environment configuration."
  );
}

/**
 * Create Supabase Client
 */
const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

module.exports = supabase;