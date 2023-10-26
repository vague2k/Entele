import { createContext, useContext } from "react";

export const SidebarContext = createContext<boolean | undefined>(undefined)

export function useSidebarContext() {
    const sidebar = useContext(SidebarContext)

    if (sidebar === undefined) {
        throw new Error("useSidebarContext can only be used within a SidebarContext")
    }

    return sidebar
}
