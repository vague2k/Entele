import { useState, useEffect, useMemo } from "react"
import { twMerge } from "tailwind-merge"
import type { IconType } from "react-icons"
import { BiArrowFromRight, BiArrowFromLeft, } from "react-icons/bi"
import { SidebarContext, useSidebarContext } from "../hooks/SidebarContext"
import "../globals.css"
import SidebarRoutes from "../data/SidebarRoutes"

interface SidebarProps {
    children: React.ReactNode
}

interface Subpage {
    label: string
    href: string
    active: boolean
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

    const routes = useMemo(() => SidebarRoutes, [])

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
                <div className="p-4 pb-4 flex justify-center items-center">
                    <h1 className={twMerge('flex text-2xl font-bold overflow-hidden transition-all',
                            collapsedSidebar ? "w-44" : "w-0"
                        )}
                    >
                        Entele
                    </h1>
                    <button
                        type="button"
                        onClick={() => setCollapsedSidebar(!collapsedSidebar)}
                        className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 hover-duration-300">

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
                        <div className="leading-4 mr-4">
                            <h1 className="font-semibold">Albert</h1>
                            <span className="text-xs text-gray-600 truncate">albe.hern24@gmail.com</span>
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

    const expanded = useSidebarContext()
    const [isHovered, setIsHovered] = useState(false)

    let timer = 0

    const handleMouseEnter = () => {
        setIsHovered(true)
        clearTimeout(timer)
    }

    const handleMouseLeave = () => {
        timer = setTimeout(() => {
            setIsHovered(false)
        }, 50)
    }

    return (
        <a
            href={href}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={twMerge(`relative flex items-center p-2 rounded-md my-1 text-neutral-500`,
                active
                    ? 'text-blue-600 bg-blue-100 hover:bg-blue-200 duration-300'
                    : 'hover:bg-neutral-200 duration-300'
            )}
        >
            <Icon size={25}/>
            <span 
                className={twMerge('overflow-hidden transition-all',
                    expanded
                        ? 'w-44 ml-3'
                        : 'w-0'
                )}
            >
                {label}
            </span>

            {isHovered && subpages.length > 0 && (
                <div
                    className={twMerge(
                        `absolute flex flex-col whitespace-nowrap left-full rounded-md w-fit p-2 ml-3 
                        text-neutral-500 gap-y-1 bg-white text-sm shadow-xl transition-all`,
                        isHovered
                            ? "visible opacity-100 translate-x-3 duration-300 ease-in"
                            : "invisible opacity-0 -translate-x-3 duration-300 ease-in"
                    )}
                >
                    <span className="font-semibold text-lg">{label}</span>
                    {subpages.map((subpage) => (
                        <SubpageButtonLink
                            key={subpage.href}
                            {...subpage}
                        />
                    ))}
                </div>
            )}
        </a>

    )
}

export function SubpageButtonLink({ label, active, href }: Subpage ) {
    return (
        <a
            className={twMerge("p-2 rounded-md hover:bg-neutral-200 duration-300",
                active
                    ? 'text-blue-600 bg-blue-100 hover:bg-blue-200 duration-300'
                    : 'hover:bg-neutral-200 duration-300'
            )}
            href={href}
        >
            {label}
        </a>
    )
}
