export const SUPABASE_URL = "https://cqsxqjakdnvgcpkqyadj.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxc3hxamFrZG52Z2Nwa3F5YWRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4MzQyMzQsImV4cCI6MjA5MTQxMDIzNH0.2SEW2fSfDzY9SDcwJtn1VLagAmbObjXpKlKNIsw633Q";

export const db = window.supabase
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;
