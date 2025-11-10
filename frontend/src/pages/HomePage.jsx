import { Link, Navigate } from "react-router";
import { useGetUserData } from "@/hooks/useGetUserData";

function Home() {
  const { data } = useGetUserData();

  if (data) {
    return <Navigate to="/mutual-funds/#explore" />;
  }

  return (
    <div className="bg-background flex h-screen flex-col items-center justify-center">
      <ul className="flex flex-col gap-4 font-medium sm:text-xl">
        <Link to="/">Home</Link>
        <Link to="/auth/login">Login</Link>
        <Link to="/auth/logout">logout</Link>
        <Link to="/auth/signup">Signup</Link>
        <Link to="/stock">Stock</Link>
        <Link to="/mutual-funds#explore">Mutual Fund</Link>
      </ul>
    </div>
  );
}

export default Home;
