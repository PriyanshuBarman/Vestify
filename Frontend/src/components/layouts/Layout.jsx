import ReusableDialog from "@/components/ResueableDialog";
import { useClaimDailyReward } from "@/hooks/useClaimDailyReward";
import { useSSEConnection } from "@/hooks/useSSEConnection";
import { isToday } from "date-fns";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import BottomNavbar from "./BottomNavbar";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";

function Layout() {
  useSSEConnection();
  const navigate = useNavigate();
  const { mutate, data, isSuccess, error } = useClaimDailyReward();
  const [dialogOpen, setDialogOpen] = useState(false);

  // Prevent api call if already claim daily reward today
  useEffect(() => {
    const lastRewardedAt = localStorage.getItem("lastRewardedAt");
    if (!isToday(new Date(lastRewardedAt))) {
      mutate();
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setDialogOpen(true);
    }
  }, [isSuccess]);

  return (
    <>
      <Navbar />
      <Outlet />
      <ScrollToTop />
      <BottomNavbar />
      <ReusableDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="1000 Added!"
        description="Your daily reward of 1000 has been credited!
        Visit every day to earn 1000 daily."
        icon={<img src="/Piggy bank-amico.svg" className="size-50" />}
        onConfirm={() => {
          navigate("/wallet");
          setDialogOpen(false);
        }}
        confirmButtonText="Check Balance"
      />
    </>
  );
}

export default Layout;
