import { useEffect, useMemo, useState } from "react";
import type { IconType } from "react-icons";
import {
  BiArrowFromLeft,
  BiArrowFromRight,
  BiMoon,
  BiSun,
} from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import SidebarRoutes from "../data/SidebarRoutes";
import "../globals.css";
import { SidebarContext, useSidebarContext } from "../hooks/SidebarContext";
import { appliedTheme, toggleTheme } from "../utils/toggleTheme";

interface SidebarProps {
  children: React.ReactNode;
}

interface Subpage {
  label: string;
  href: string;
  active: boolean;
}

interface SidebarItemProps {
  Icon: IconType;
  label: string;
  active: boolean;
  href: string;
  subpages: Subpage[];
}

export default function Sidebar({ children }: SidebarProps) {
  const [collapsedSidebar, setCollapsedSidebar] = useState(true);
  const [isDark, setIsDark] = useState(false);

  const routes = useMemo(() => SidebarRoutes, []);

  useEffect(() => {
    const storeCollapsedSidebar =
      window.localStorage.getItem("collapsedSidebar");
    setCollapsedSidebar(
      storeCollapsedSidebar !== null
        ? JSON.parse(storeCollapsedSidebar)
        : false,
    );
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "collapsedSidebar",
      JSON.stringify(collapsedSidebar),
    );
  }, [collapsedSidebar]);

  useEffect(() => {
    appliedTheme();
  }, []);

  return (
    <aside className="flex h-screen">
      <nav className="h-full flex flex-col border-r border-fill-100 shadow-sm">
        <div className="p-4 pb-4 flex justify-center items-center">
          <h1
            className={twMerge(
              "flex text-2xl text-primary-500 font-bold overflow-hidden transition-all",
              collapsedSidebar ? "w-36" : "w-0",
            )}
          >
            Entele
          </h1>
          <button
            type="button"
            onClick={() => {
              toggleTheme();
              // TODO: Fix icon not respecting theme on refresh
              setIsDark(!isDark);
            }}
            className={twMerge(
              "p-1.5 mr-1 rounded-lg bg-fill-100 hover:bg-fill-200 transition duration-300",
              collapsedSidebar ? "block" : "hidden",
            )}
          >
            {isDark ? (
              <BiMoon size={25} className="text-base-950" />
            ) : (
              <BiSun size={25} className="text-base-950" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setCollapsedSidebar(!collapsedSidebar)}
            className={twMerge(
              "p-1.5 rounded-lg bg-fill-100 hover:bg-fill-200 transition duration-300",
            )}
          >
            {collapsedSidebar ? (
              <BiArrowFromRight size={25} className="text-base-950" />
            ) : (
              <BiArrowFromLeft size={25} className="text-base-950" />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={collapsedSidebar}>
          <ul className="flex-1 px-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </ul>
        </SidebarContext.Provider>

        <div className="border-t border-fill-100 flex p-3 justify-center items-center">
          <div className="w-10 h-10 rounded-full bg-blue-500" />
          <div
            className={twMerge(
              "flex justify-end text-right overflow-hidden transition-all",
              collapsedSidebar ? "w-44 ml-2" : "w-0",
            )}
          >
            <div className="leading-4 mr-4">
              <h1 className="font-semibold text-base-950">Albert</h1>
              <span className="text-xs text-base-400 truncate">
                albe.hern24@gmail.com
              </span>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-1 h-screen">{children}</main>
    </aside>
  );
}

export function SidebarItem({
  Icon,
  label,
  active,
  href,
  subpages,
}: SidebarItemProps) {
  const expanded = useSidebarContext();
  const [isHovered, setIsHovered] = useState(false);

  let timer = 0;

  const handleMouseEnter = () => {
    setIsHovered(true);
    clearTimeout(timer);
  };

  const handleMouseLeave = () => {
    timer = setTimeout(() => {
      setIsHovered(false);
    }, 50);
  };

  return (
    <a
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={twMerge(
        `relative flex items-center p-2 rounded-md my-1 text-base-500`,
        active
          ? "text-primary-500 bg-primary-50 hover:bg-primary-100 duration-300"
          : "hover:bg-fill-100 duration-300",
      )}
    >
      <Icon size={25} />
      <span
        className={twMerge(
          "overflow-hidden transition-all",
          expanded ? "w-44 ml-3" : "w-0",
        )}
      >
        {label}
      </span>

      {isHovered && subpages.length > 0 && (
        <div
          className={twMerge(
            `absolute flex flex-col whitespace-nowrap left-full rounded-md w-fit p-2 ml-3 
                        text-base-400 gap-y-1 bg-fill-0 text-sm shadow-xl transition-all`,
            isHovered
              ? "visible opacity-100 translate-x-3 duration-300 ease-in"
              : "invisible opacity-0 -translate-x-3 duration-300 ease-in",
          )}
        >
          <span className="font-semibold text-lg">{label}</span>
          {subpages.map((subpage) => (
            <SubpageButtonLink key={subpage.href} {...subpage} />
          ))}
        </div>
      )}
    </a>
  );
}

export function SubpageButtonLink({ label, active, href }: Subpage) {
  return (
    <a
      className={twMerge(
        "p-2 rounded-md hover:bg-neutral-200 duration-300",
        active
          ? "text-primary-500 bg-primary-50 hover:bg-primary-100 duration-300"
          : "hover:bg-fill-100 duration-300",
      )}
      href={href}
    >
      {label}
    </a>
  );
}
