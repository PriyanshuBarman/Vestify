import { selectTheme } from "@/store/slices/themeSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function ThemeProvider({ children }) {
  const theme = useSelector(selectTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    // figure out the actual theme to apply
    let activeTheme = theme;
    if (theme === "system") {
      activeTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    root.classList.add(activeTheme);

    // update the <meta name="theme-color">
    const metaTheme = document.querySelector("meta[name=theme-color]");
    if (metaTheme) {
      metaTheme.setAttribute(
        "content",
        activeTheme === "dark" ? "#131313" : "#ffffff",
      );
    }
  }, [theme]);

  return children;
}

export default ThemeProvider;
