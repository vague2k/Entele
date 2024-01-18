import { useStore } from "@nanostores/react";
import { useMemo } from "react";
import type { IconType } from "react-icons";
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import SidebarRoutes from "../data/SidebarRoutes";
import "../globals.css";
import { $settingsStore, toggleSidebar } from "../stores/settings";
import { ThemeToggleButton } from "./ThemeToggleButton";
import Button from "./ui/Button";

interface SidebarProps {
  children: React.ReactNode;
}

interface SidebarItemProps {
  Icon: IconType;
  label: string;
  active: boolean;
  href: string;
}

export default function Sidebar({ children }: SidebarProps) {
  // const [collapsedSidebar, setCollapsedSidebar] = useState(true);

  const routes = useMemo(() => SidebarRoutes, []);

  const $settings = useStore($settingsStore);

  return (
    <aside className="flex h-screen">
      <nav className="h-full flex flex-col border-r border-fill-100 shadow-sm">
        <div className="p-4 pb-4 flex justify-center items-center">
          <h1
            className={twMerge(
              "flex text-2xl text-primary-500 font-bold overflow-hidden transition-all",
              $settings.sidebar === "expanded"
                ? "w-36"
                : "w-0 text-transparent",
            )}
          >
            Entele
            <div
              className={twMerge(
                "flex transition-all mr-1 justify-end",
                $settings.sidebar === "expanded" ? "w-36" : "w-0",
              )}
            >
              <ThemeToggleButton />
            </div>
          </h1>
          <Button
            type="button"
            onClick={() => {
              toggleSidebar();
            }}
          >
            {$settings.sidebar === "expanded" ? (
              <BiArrowFromRight size={22} className="text-base-950" />
            ) : (
              <BiArrowFromLeft size={22} className="text-base-950" />
            )}
          </Button>
        </div>

        <ul className="flex-1 px-4">
          {routes.map((item) => (
            <SidebarItem key={item.label} {...item} />
          ))}
        </ul>

        <div className="border-t border-fill-100 flex p-3 justify-center items-center">
          <div
            className={twMerge(
              "flex justify-start text-left overflow-hidden transition-all",
              $settings.sidebar === "expanded"
                ? "w-36 ml-2"
                : "w-0 ml-0 text-transparent",
            )}
          >
            <div className="leading-4 mr-4">
              <h1 className="font-medium text-base-900">Albert</h1>
              <span className="block text-xs text-base-400 truncate w-[130px]">
                albe.hern24@gmail.com
              </span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary-500" />
        </div>
      </nav>
      <main className="flex-1 h-screen">{children}</main>
    </aside>
  );
}

export function SidebarItem({ Icon, label, active, href }: SidebarItemProps) {
  const $settings = useStore($settingsStore);
  return (
    <a href={href}>
      <Button
        className={twMerge(
          "relative mb-0.5 flex text-base-500 bg-transparent text-left hover:bg-fill-100",
          active
            ? "text-primary-500 bg-primary-100 hover:bg-primary-100 hover:shadow-[0_0px_30px_rgba(0,0,0,0.25)] hover:shadow-primary-100 hover:scale-105"
            : "",
        )}
      >
        <Icon size={22} />
        <span
          className={twMerge(
            "overflow-hidden transition-all justify-center",
            $settings.sidebar === "expanded"
              ? "w-36 ml-2"
              : "w-0 -ml-1 text-transparent",
          )}
        >
          {label}
        </span>
      </Button>
    </a>
  );
}
