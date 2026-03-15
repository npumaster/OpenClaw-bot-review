"use client";

import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}>({
  theme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "light" || current === "dark") {
      setThemeState(current);
      return;
    }
    const saved = localStorage.getItem("agentcloud-theme");
    const nextTheme: Theme = saved === "light" ? "light" : "dark";
    setThemeState(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  }, []);

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("agentcloud-theme", nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        onClick={toggleTheme}
        className="ac-action-btn text-sm cursor-pointer"
        title="切换主题"
      >
        🌓
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="ac-action-btn text-sm cursor-pointer"
      title={theme === "dark" ? "切换到浅色模式" : "切换到深色模式"}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
