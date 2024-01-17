import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import { BiMoon, BiSun } from "react-icons/bi";
import { $settingsStore, toggleTheme } from "../stores/settings";
import Button from "./ui/Button";

export function ThemeToggleButton() {
  const $settings = useStore($settingsStore);

  useEffect(() => {
    const htmlTag = document.documentElement;
    if ($settings.theme === "dark") {
      htmlTag.classList.add("dark");
      htmlTag.classList.remove("light");
    } else {
      htmlTag.classList.add("light");
      htmlTag.classList.remove("dark");
    }
  }, [$settings]);

  return (
    <Button
      type="button"
      onClick={() => {
        toggleTheme();
      }}
    >
      {$settings.theme === "dark" ? (
        <BiMoon size={19} className="text-base-900" />
      ) : (
        <BiSun size={19} className="text-base-900" />
      )}
    </Button>
  );
}
