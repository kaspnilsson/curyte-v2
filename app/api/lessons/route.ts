import { supabase } from "@/lib/supabase";

export async function GET() {
  return supabase
    .from("generated")
    .select()
    .order("created_at", { ascending: false });
}
