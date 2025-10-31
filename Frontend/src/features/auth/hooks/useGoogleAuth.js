import { useState } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { VITE_BACKEND_BASE_URL } from "@/config/env";
import { useQueryClient } from "@tanstack/react-query";

export function useGoogleAuth() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("referralCode");

  const fnc = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          `${VITE_BACKEND_BASE_URL}/auth/google`,
          { code, referralCode },
        );
        if (data.success) {
          queryClient.setQueryData(["user"], data.user);
          navigate("/", { replace: true });
        }
      } catch (err) {
        console.error("Login error:", err);
        toast.error("Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: (errorResponse) => {
      console.error("Login error:", errorResponse);
      toast.error("Something went wrong.");
    },
    flow: "auth-code",
  });

  return { googleLogin: fnc, isLoading };
}
