import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "";

/** Browser/server helper — only instantiate when env is present. */
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createSupabaseClient(supabaseUrl, supabaseAnonKey)
    : (null as unknown as ReturnType<typeof createSupabaseClient>);
