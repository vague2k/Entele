import {
    BiCategoryAlt,
    BiCog,
    BiHelpCircle,
    BiLogOut,
    BiPackage,
    BiUserCircle,
} from "react-icons/bi"

export default [
    {
        Icon: BiCategoryAlt,
        label: "Dashboard",
        active: window.location.pathname === "/",
        href: '/',
    },
    {
        Icon: BiUserCircle,
        label: "Clients",
        active: window.location.pathname.includes("/clients"),
        href: '/clients/view',
    },
    {
        Icon: BiPackage,
        label: "Orders",
        active: window.location.pathname.includes("/orders"),
        href: '/orders/view',
    },
    {
        Icon: BiCog,
        label: "Settings",
        active: window.location.pathname === "/settings",
        href: '/settings',
    },
    {
        Icon: BiHelpCircle,
        label: "Help",
        active: window.location.pathname === "/help",
        href: '/help',
    },
    {
        Icon: BiLogOut,
        label: "Logout",
        active: window.location.pathname === "/logout",
        href: '/logout',
    },
]
