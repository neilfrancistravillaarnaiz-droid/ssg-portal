import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";

type Props = {
  children: ReactNode;
  requiredRole?: string;
};

export default function ProtectedRoute({ children, requiredRole }: Props) {
  const [status, setStatus] = useState<"loading" | "unauthenticated" | "forbidden" | "authenticated">("loading");
  const location = useLocation();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        setStatus("unauthenticated");
        return;
      }

      const role = user.user_metadata?.role || user.user_metadata?.user_role || "";

      if (requiredRole && role !== requiredRole) {
        setStatus("forbidden");
        return;
      }

      setStatus("authenticated");
    };

    void checkUser();
  }, [requiredRole]);

  if (status === "loading") {
    return <div className="loader">Checking access...</div>;
  }

  if (status === "unauthenticated" || status === "forbidden") {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
