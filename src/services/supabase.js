import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://hslifazwknhzaqgradmx.supabase.co";

// This is safe to expose as long as you have the appropriate
// permissions on RLS - row level security
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzbGlmYXp3a25oemFxZ3JhZG14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4OTkzODgsImV4cCI6MjA1MjQ3NTM4OH0.EAFhaNW136uc4RtN_kkBT7W5TtaqleFKXto7cKcTVbE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
