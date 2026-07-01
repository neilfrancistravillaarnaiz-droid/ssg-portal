import { supabase } from "../../../lib/supabase";

export const getAnnouncements = async () => {
  return await supabase
    .from("announcements")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });
};