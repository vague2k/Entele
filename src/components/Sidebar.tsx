import { useState, useMemo, } from "react"
import type { IconType } from "react-icons"
import { 
    BiArrowFromRight,
    BiUserCircle,
    BiCategoryAlt,
    BiHelpCircle,
    BiCog,
    BiPackage,
    BiArrowFromLeft,
    BiLogOut
} from "react-icons/bi"
import { twMerge } from "tailwind-merge"
import { SidebarContext, useSidebarContext } from "../hooks/SidebarContext"
import "../globals.css"

interface SidebarProps {
    children: React.ReactNode
}

interface SidebarItemProps {
    Icon: IconType
    label: string
    active: boolean
    href: string
}

export default function Sidebar({ children }: SidebarProps) {
    
    const [collapsedSidebar, setCollapsedSidebar] = useState(true)
    
    const routes = useMemo(() => [
        {
            Icon: BiCategoryAlt,
            label: "Dashboard",
            active: window.location.pathname === "/",
            href: '/'
        },
        {
            Icon: BiUserCircle,
            label: "Clients",
            active: window.location.pathname === "/clients",
            href: '/clients'
        },
        {
            Icon: BiPackage,
            label: "Orders",
            active: window.location.pathname === "/orders",
            href: '/orders'
        },
{
            Icon: BiCog,
            label: "Settings",
            active: window.location.pathname === "/settings",
            href: '/settings'
        },
        {
            Icon: BiHelpCircle,
            label: "Help",
            active: window.location.pathname === "/help",
            href: '/help'
        },
        {
            Icon: BiLogOut,
            label: "Logout",
            active: window.location.pathname === "/logout",
            href: '/logout'
        },
    ], [])

    return (
        <aside className="flex h-screen">
            <nav className="h-full flex flex-col border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-center items-center">
                    <h1 className={twMerge('flex text-2xl font-bold overflow-hidden transition-all',
                            collapsedSidebar ? "w-44" : "w-0"
                    )}
                    >
                        Entele
                    </h1>
                    <button type="button" onClick={() => setCollapsedSidebar(!collapsedSidebar)} className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 hover-duration-300">
                        {collapsedSidebar ? <BiArrowFromRight size={25}/> : <BiArrowFromLeft size={25}/>}
                    </button>
                </div>

                <SidebarContext.Provider value={ collapsedSidebar }>
                    <ul className="flex-1 px-4">
                        {routes.map((item) => (
                            <SidebarItem
                                key={item.label}
                                {...item}
                            />
                        ))}
                    </ul>
                </SidebarContext.Provider>

                <div className="border-t flex p-3 justify-center items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-500"/>
                    <div className={twMerge('flex justify-end text-right overflow-hidden transition-all',
                            collapsedSidebar ? "w-44 ml-2" : "w-0"
                    )}
                    >
                        <div className="leading-4 mr-6">
                            <h1 className="font-semibold">Name Here</h1>
                            <span className="text-xs text-gray-600">email@here.com</span>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="flex-1 h-screen">
                {children}
            </main>
        </aside>
    )
}

export function SidebarItem({ Icon, label, active, href }: SidebarItemProps) {

    const expanded = useSidebarContext() 

    return (
        <a href={href} className={twMerge('relative flex items-center p-2 rounded-md my-1 text-neutral-500 group', active ? 'text-blue-600 bg-blue-100 hover:bg-blue-200 duration-300' : 'hover:bg-neutral-200 duration-300')}>
            <Icon size={25}/>
            <span className={twMerge('overflow-hidden transition-all', expanded ? 'w-44 ml-3' : 'w-0')}>{label}</span>

            {!expanded && (
                <div className="
                    absolute left-full rounded-md px-2 py-1 ml-6 bg-blue-100 text-blue-600 
                    text-sm invisible opacity-20 -translate-x-3 transition-all 
                    group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
                >
                    {label}
                </div>
            )}

        </a>
    )
}
