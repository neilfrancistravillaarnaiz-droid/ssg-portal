import { supabase } from "../lib/supabase";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export type PrintColorMode =
  | "black-and-white"
  | "colored-minimal"
  | "colored-half"
  | "colored-full";

const PRINT_PRICING: Record<PrintColorMode, number> = {
  "black-and-white": 2,
  "colored-minimal": 3,
  "colored-half": 5,
  "colored-full": 7,
};

const URGENT_FEE_PER_COPY = 10;

export const getPrintUnitPrice = (
  mode: PrintColorMode,
  ownPaper: boolean,
  urgent = false
) => {
  const price = PRINT_PRICING[mode];
  const basePrice = ownPaper ? Math.max(0, price - 1) : price;
  return urgent ? basePrice + URGENT_FEE_PER_COPY : basePrice;
};

export const calculatePrintTotal = (
  quantity: number,
  mode: PrintColorMode,
  ownPaper: boolean,
  urgent = false
) => quantity * getPrintUnitPrice(mode, ownPaper, urgent);

export const submitPrintRequest = async ({
  file,
  quantity,
  colorMode,
  ownPaper,
  urgent,
  note,
}: {
  file: File;
  quantity: number;
  colorMode: PrintColorMode;
  ownPaper: boolean;
  urgent: boolean;
  note: string;
}) => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user?.user_metadata?.student_id) {
    throw new Error(
      "Unable to retrieve your student account. Please sign in again."
    );
  }

  const studentId = user.user_metadata.student_id as string;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("student_id", studentId);
  formData.append("quantity", String(quantity));
  formData.append("color_mode", colorMode);
  formData.append("own_paper", String(ownPaper));
  formData.append("urgent", String(urgent));
  formData.append("note", note);

  const response = await fetch(`${API_URL}/printer/request`, {
    method: "POST",
    body: formData,
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.detail || result?.message || "Unable to submit your print request."
    );
  }

  return result;
};

export const fetchPrintRequests = async () => {
  const response = await fetch(`${API_URL}/printer/requests`);
  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(result?.detail || result?.message || "Unable to fetch print requests.");
  }

  return result;
};
