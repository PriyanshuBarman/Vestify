import { useEffect } from "react";
import { useLogout } from "../hooks/useLogout";

function LogoutPage() {
  const { mutate: logout } = useLogout();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className="fixed inset-0 grid place-items-center">Logging out...</div>
  );
}

export default LogoutPage;
