import { supabase } from "../../../lib/supabase";

export const getStudents = async () => {
  const { data, error } = await supabase.from("students").select("id, full_name, email, program, year_level, section");
  if (error) {
    throw error;
  }
  return data ?? [];
};
