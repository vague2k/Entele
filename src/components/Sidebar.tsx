import { useState, useMemo } from "react"
import type { IconType } from "react-icons"
import { 
    BiArrowFromRight,
    BiDotsVerticalRounded, 
    BiUserCircle,
    BiCategoryAlt,
    BiHelpCircle,
    BiCog,
    BiPackage,
    BiArrowFromLeft,
} from "react-icons/bi"
import { twMerge } from "tailwind-merge"
import { SidebarContext, useSidebarContext } from "../hooks/SidebarContext"
import "../globals.css"

interface SidebarItemProps {
    Icon: IconType
    label: string
    active: boolean
    href: string
}

export default function Sidebar() {
    
    const [expanded, setExpanded] = useState(true)
    
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
            label: "orders",
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
    ], [])

    return (
        <aside className="flex h-screen">
            <nav className="h-full flex flex-col border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <h1 className={`overflow-hidden transition-all ${
                            expanded ? "flex w-52 text-2xl font-bold" : "w-0"
                        }`}
                    >
                        Entele
                    </h1>
                    <button type="button" onClick={() => setExpanded(current => !current)} className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 hover-duration-300">
                        {expanded ? <BiArrowFromRight size={25}/> : <BiArrowFromLeft size={25}/>}
                    </button>
                </div>

                <SidebarContext.Provider value={ expanded }>
                    <ul className="flex-1 px-4">
                        {routes.map((item) => (
                            <SidebarItem
                                key={item.label}
                                {...item}
                            />
                        ))}
                    </ul>
                </SidebarContext.Provider>

                <div className="border-t flex p-3">
                    <div className="w-10 h-10 rounded-lg bg-red-500"/>
                    <div className={`flex justify-between items-center overflow-hidden transition-all ${
                            expanded ? "w-52 ml-2" : "w-0"
                        }`}
                    >
                        <div className="leading-4">
                            <h1 className="font-semibold">Name Here</h1>
                            <span className="text-xs text-gray-600">email@here.com</span>
                        </div>
                        <button type="button" className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 hover-duration-300">
                            <BiDotsVerticalRounded size={25}/>
                        </button>
                    </div>
                </div>
            </nav> 
        </aside>
    )
}

export function SidebarItem({ Icon, label, active, href }: SidebarItemProps) {

    const {expanded} = useSidebarContext() 
    // TODO: find out why overflow hidden is making text hidden on expand?
    return (
        <li className={twMerge('flex items-center p-2 rounded-md my-1 text-neutral-500', active && 'text-blue-600 bg-blue-100')}>
            <a href={href} className="flex">
                <Icon size={25}/>
                <span 
                    className={twMerge('overflow-hidden transition-all', expanded ? 'w-52' : 'w-0')}
                >
                    {label}
                </span>
            </a> 
        </li>
    )
}
