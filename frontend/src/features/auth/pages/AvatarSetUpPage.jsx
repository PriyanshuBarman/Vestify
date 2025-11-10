import { useGetUser } from "@/hooks/useGetUser";
import { Navigate } from "react-router";

function AvatarSetUpPage() {
  const { data } = useGetUser();

  if (!data) return <Navigate to="/login" />;

  return <div>AvatarSetUpPage</div>;
}
export default AvatarSetUpPage;
