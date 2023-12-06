import { useEffect, useMemo, useState } from "react";
import type { IconType } from "react-icons";
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import SidebarRoutes from "../data/SidebarRoutes";
import "../globals.css";
import { SidebarContext, useSidebarContext } from "../hooks/SidebarContext";
import { ThemeToggleButton } from "./ThemeToggleButton";

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
  const [collapsedSidebar, setCollapsedSidebar] = useState(true);

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
          <ThemeToggleButton collapsedSidebar={collapsedSidebar} />
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

export function SidebarItem({ Icon, label, active, href }: SidebarItemProps) {
  const expanded = useSidebarContext();

  return (
    <a
      href={href}
      className={twMerge(
        "relative flex items-center p-2 rounded-md my-1 text-base-500",
        active
          ? "text-primary-500 bg-primary-100 hover:shadow-[0_0px_30px_rgba(0,0,0,0.25)] hover:shadow-primary-100 hover:scale-105 hover:-translate-y-0.5 duration-300"
          : "hover:bg-fill-100 duration-300 hover:-translate-y-1",
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
    </a>
  );
}
