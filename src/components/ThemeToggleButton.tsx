import { useEffect, useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

interface ThemeToggleButtonProps {
  collapsedSidebar: boolean;
}

export function ThemeToggleButton({
  collapsedSidebar,
}: ThemeToggleButtonProps) {
  const [isDark, setIsDark] = useState<boolean>(
    localStorage.getItem("theme") === "true",
  );

  useEffect(() => {
    const htmlTag = document.documentElement;
    htmlTag.classList.toggle("dark", isDark);
    htmlTag.classList.toggle("light", !isDark);
    localStorage.setItem("theme", isDark.toString());
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <button
      type="button"
      onClick={() => {
        toggleTheme();
      }}
      className={twMerge(
        "p-2 mr-1 rounded-lg bg-fill-100 hover:bg-fill-200 transition-all duration-300",
        collapsedSidebar ? "block" : "hidden",
      )}
    >
      {isDark ? (
        <BiMoon size={21} className="text-base-950" />
      ) : (
        <BiSun size={21} className="text-base-950" />
      )}
    </button>
  );
}
