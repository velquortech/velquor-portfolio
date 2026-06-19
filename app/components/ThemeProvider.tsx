"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "dark",
  toggle: () => {},
});

// The current theme lives outside React: the inline <head> script applies the
// `light` class to <html> before paint, and we persist the choice to
// localStorage. useSyncExternalStore reads from that external source so we
// never have to setState inside an effect (and avoid a flash on load).
function subscribe(callback: () => void) {
  window.addEventListener("theme-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("theme-change", callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next: Theme =
      document.documentElement.classList.contains("light") ? "dark" : "light";
    localStorage.setItem("velquor-theme", next);
    document.documentElement.classList.toggle("light", next === "light");
    window.dispatchEvent(new Event("theme-change"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
