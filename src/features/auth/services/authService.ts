import { supabase } from "../../../lib/supabase";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const loginUser = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

const parseResponse = async (response: Response, defaultMessage: string) => {
  let result: any = null;

  try {
    result = await response.json();
  } catch {
    // ignore parse errors; we still want to throw a usable message
  }

  if (!response.ok) {
    throw new Error(result?.detail || result?.message || defaultMessage);
  }

  return result;
};

export const verifyStudent = async (studentId: string) => {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/auth/verify-student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: studentId,
      }),
    });
  } catch (error) {
    throw new Error(
      "Unable to contact the student verification service. Please make sure the backend is running and accessible."
    );
  }

  return await parseResponse(response, "Failed to verify student.");
};

export const signupUser = async (
  studentId: string,
  email: string,
  password: string
) => {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: studentId,
        email,
        password,
      }),
    });
  } catch (error) {
    throw new Error(
      "Unable to contact the registration service. Please make sure the backend is running and accessible."
    );
  }

  return await parseResponse(response, "Failed to create account.");
};

export const signupAdmin = async (email: string, password: string) => {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/auth/register-admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  } catch (error) {
    throw new Error(
      "Unable to contact the admin registration service. Please make sure the backend is running and accessible."
    );
  }

  return await parseResponse(response, "Failed to create admin account.");
};

export const generateAdminOtp = async (email: string, password: string) => {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/auth/generate-admin-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  } catch (error) {
    throw new Error(
      "Unable to contact the OTP generation service. Please make sure the backend is running and accessible."
    );
  }

  return await parseResponse(response, "Failed to generate OTP.");
};

export const resendAdminOtp = async (email: string, password: string) => {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/auth/resend-admin-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  } catch (error) {
    throw new Error(
      "Unable to contact the OTP resend service. Please make sure the backend is running and accessible."
    );
  }

  return await parseResponse(response, "Failed to resend OTP.");
};

export const verifyAdminOtp = async (email: string, otp: string) => {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/auth/verify-admin-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        otp,
      }),
    });
  } catch (error) {
    throw new Error(
      "Unable to contact the OTP verification service. Please make sure the backend is running and accessible."
    );
  }

  return await parseResponse(response, "Failed to verify OTP.");
};

export const logoutUser = async () => {
  return await supabase.auth.signOut();
};