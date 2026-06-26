import { supabase } from "../../../lib/supabase";

export async function loginUser(email: string, password: string) {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signupUser(
  email: string,
  password: string,
  fullName: string,
  studentId: string
) {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        student_id: studentId,
        role: "student",
      },
    },
  });
}

export async function logoutUser() {
  return await supabase.auth.signOut();
}