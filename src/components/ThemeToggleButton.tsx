import { useEffect, useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";
import Button from "./ui/Button";

export function ThemeToggleButton() {
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
    <Button
      type="button"
      onClick={() => {
        toggleTheme();
      }}
    >
      {isDark ? (
        <BiMoon size={19} className="text-base-900" />
      ) : (
        <BiSun size={19} className="text-base-900" />
      )}
    </Button>
  );
}
