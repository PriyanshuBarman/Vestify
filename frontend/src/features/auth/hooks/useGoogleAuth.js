import { api } from "@/lib/axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";

export function useGoogleAuth() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isPending, setIsPending] = useState(false);
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("referralCode");

  const fnc = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        setIsPending(true);
        const { data } = await api.post("/auth/google", { code, referralCode });
        if (data.success) {
          queryClient.setQueryData(["user"], data.user);
          navigate("/", { replace: true });
        }
      } catch (err) {
        toast.error("Something went wrong.");
      } finally {
        setIsPending(false);
      }
    },
    onError: (errorResponse) => {
      console.error("Login error:", errorResponse);
      toast.error("Something went wrong.");
    },
    flow: "auth-code",
  });

  return { googleLogin: fnc, isPending };
}
