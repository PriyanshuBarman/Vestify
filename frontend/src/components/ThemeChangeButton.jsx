import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

const THEMES = [
  { name: "system", icon: <MonitorIcon /> },
  { name: "dark", icon: <MoonIcon /> },
  { name: "light", icon: <SunIcon /> },
];

function ThemeChangeButton() {
  const { theme: currentTheme, setTheme } = useTheme();

  return (
    <div className="flex justify-between rounded-full border p-0.5">
      {THEMES.map((theme) => (
        <div key={theme.name}>
          <Button
            onClick={() => setTheme(theme.name)}
            variant="secondery"
            className={`w-20 rounded-full border-none shadow-none ${currentTheme === theme.name && "text-background bg-landing ring"}`}
          >
            {theme.icon}
          </Button>
        </div>
      ))}
    </div>
  );
}
export default ThemeChangeButton;
