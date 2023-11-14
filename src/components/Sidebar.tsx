import { useState, useMemo, useEffect, useRef } from "react"
import type { IconType } from "react-icons"
import { 
    BiArrowFromRight,
    BiUserCircle,
    BiCategoryAlt,
    BiHelpCircle,
    BiCog,
    BiPackage,
    BiArrowFromLeft,
    BiLogOut,
} from "react-icons/bi"
import { twMerge } from "tailwind-merge"
import { SidebarContext, useSidebarContext } from "../hooks/SidebarContext"
import "../globals.css"

interface SidebarProps {
    children: React.ReactNode
}

interface Subpage {
    label: string
    href: string
}
interface SidebarItemProps {
    Icon: IconType
    label: string
    active: boolean
    href: string
    subpages: Subpage[] 
}

export default function Sidebar({ children }: SidebarProps) {
    
    const [collapsedSidebar, setCollapsedSidebar] = useState(true)
    
    const routes = useMemo(() => [
        {
            Icon: BiCategoryAlt,
            label: "Dashboard",
            active: window.location.pathname === "/",
            href: '/',
            subpages: []
        },
        {
            Icon: BiUserCircle,
            label: "Clients",
            active: window.location.pathname === "/clients",
            href: '/clients',
            subpages: [
                {label: "Create Client", href: "/clients/create"},
                {label: "View Clients", href: "/clients/view"},
            ]
        },
        {
            Icon: BiPackage,
            label: "Orders",
            active: window.location.pathname === "/orders",
            href: '/orders',
            subpages: [
                {label: "Create Order", href: "/orders/create"},
                {label: "View Orders", href: "/orders/view"},
                {label: "See Details", href: "/orders/details"},
            ]
        },
{
            Icon: BiCog,
            label: "Settings",
            active: window.location.pathname === "/settings",
            href: '/settings',
            subpages: []
        },
        {
            Icon: BiHelpCircle,
            label: "Help",
            active: window.location.pathname === "/help",
            href: '/help',
            subpages: []
        },
        {
            Icon: BiLogOut,
            label: "Logout",
            active: window.location.pathname === "/logout",
            href: '/logout',
            subpages: []
        },
    ], [])

    useEffect(() => {
        const storeCollapsedSidebar = window.localStorage.getItem('collapsedSidebar')
        setCollapsedSidebar(storeCollapsedSidebar !== null ? JSON.parse(storeCollapsedSidebar) : false)
    }, []);

    useEffect(() => {
        window.localStorage.setItem('collapsedSidebar', JSON.stringify(collapsedSidebar))
    }, [collapsedSidebar]);

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

export function SidebarItem({ Icon, label, active, href, subpages }: SidebarItemProps) {

    let timer = 0

    const expanded = useSidebarContext()
    const [isHovered, setIsHovered] = useState(false)
    const dropdownRef = useRef(null);

    const handleMouseEnter = () => {
        setIsHovered(true)
        clearTimeout(timer)
    }

    const handleMouseLeave = () => {
        timer = setTimeout(() => {
            setIsHovered(false)
        }, 50)
    }


    useEffect(() => {
        if (dropdownRef.current) {
            dropdownRef.current.style.maxHeight = isHovered ? `${dropdownRef.current.scrollHeight}px` : '0px';
        }
    }, [isHovered]);

    return (
        <>
            <a
                href={href}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={twMerge('relative flex items-center p-2 rounded-md my-1 text-neutral-500 group', active ? 'text-blue-600 bg-blue-100 hover:bg-blue-200 duration-300' : 'hover:bg-neutral-200 duration-300')}
            >
                <Icon size={25}/>
                <span className={twMerge('overflow-hidden transition-all', expanded ? 'w-44 ml-3' : 'w-0')}>
                    {label}
                </span>

                {!expanded && (
                    // This logic only executes if the Sidebar is minimized
                    <>
                        {
                            // If subpages array is populated, show those url routes
                            subpages.length > 0 ? (
                                <div
                                    className={twMerge(
                                        `absolute flex flex-col whitespace-nowrap left-full rounded-md w-fit
                                         p-2 ml-3 text-neutral-500 bg-white text-sm border border-neutral-200`,
                                        isHovered
                                            ? "visible opacity-100 translate-x-3 transition-all duration-300"
                                            : "invisible opacity-0 -translate-x-3 transition-all duration-300"
                                    )}
                                >
                                    <span className="font-semibold text-lg">{label}</span>
                                    {subpages.map((subpage) => (
                                        <a
                                            className="p-2 rounded-md hover:bg-neutral-200 duration-300"
                                            key={subpage.href}
                                            href={subpage.href}
                                        >
                                            {subpage.label}
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                    // If subpages array is empty, just show the name/label of the page
                                    <span
                                        className={twMerge("absolute left-full rounded-md p-2 ml-3 text-blue-700 bg-blue-200 text-sm",
                                            isHovered
                                                ? "visible opacity-100 translate-x-3 transition-all duration-300"
                                                : "invisible opacity-0 -translate-x-3 transition-all duration-300"
                                        )}
                                    >
                                        {label}
                                    </span>
                            )
                        }
                    </>
                )}
            </a>

                {isHovered && expanded && subpages.length > 0 && (
                    <div 
                        className="w-full px-4"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <ul
                            ref={dropdownRef}
                            className="flex flex-col"
                            style={{ maxHeight: '0', overflow: 'hidden', transition: 'max-height 0.3s ease-in-out' }}
                        >
                            {subpages.map((subpage) => (
                                <a
                                    className="p-2 w-full rounded-md hover:bg-neutral-200 duration-300"
                                    key={subpage.href}
                                    href={subpage.href}>
                                    {subpage.label}
                                </a>
                            ))}
                        </ul>
                    </div>
                )}
        </>
    )
}
