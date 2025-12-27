import { Button } from "@/components/ui/button";
import { selectTheme, setTheme } from "@/store/slices/themeSlice";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const THEMES = [
  { name: "system", icon: <MonitorIcon /> },
  { name: "dark", icon: <MoonIcon /> },
  { name: "light", icon: <SunIcon /> },
];

function ThemeChangeButton() {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);

  return (
    <div className="flex justify-between rounded-full border p-0.5">
      {THEMES.map((theme) => (
        <div key={theme.name}>
          <Button
            onClick={() => dispatch(setTheme(theme.name))}
            variant="secondery"
            className={`w-20 rounded-full border-none shadow-none ${currentTheme === theme.name && "text-background bg-[#00b35ccd] ring"}`}
          >
            {theme.icon}
          </Button>
        </div>
      ))}
    </div>
  );
}
export default ThemeChangeButton;
