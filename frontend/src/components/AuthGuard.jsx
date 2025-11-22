import { useGetUser } from "@/hooks/useGetUser";
import { Navigate } from "react-router";

function AuthGuard({ children, mode = "protected" }) {
  const { data: user } = useGetUser();

  // ----- Protected Mode -----
  if (mode === "protected") {
    if (!user) return <Navigate to="/" replace />;
    if (!user.hasPin) return <Navigate to="/auth/pin-setup" replace />;
    return children;
  }

  // ----- Private Mode -----
  if (mode === "private") {
    if (user && user?.hasPin)
      return <Navigate to="/mutual-funds#explore" replace />;
    return children;
  }

  return children;
}

export default AuthGuard;
