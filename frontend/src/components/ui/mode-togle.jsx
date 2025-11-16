import { Button } from "@/components/ui/button";
import { selectTheme, setTheme } from "@/store/slices/themeSlice";
import { MoonStarIcon, SunIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

export function ModeToggle() {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    dispatch(setTheme(theme === "dark" ? "light" : "dark"));
  };

  return (
    <Button
      size="icon"
      variant="outline"
      aria-label="Toggle Theme"
      className="size-7.5 rounded-full sm:size-8"
      onClick={toggleTheme}
    >
      <MoonStarIcon className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <SunIcon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  );
}
