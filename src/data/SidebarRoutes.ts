import {
    BiUserCircle,
    BiCategoryAlt,
    BiHelpCircle,
    BiCog,
    BiPackage,
    BiLogOut,
} from "react-icons/bi"

export default [
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
            active: window.location.pathname.includes("/clients"),
            href: '/clients/view',
            subpages: [
                {
                    label: "View Client",
                    href: "/clients/view",
                    active: window.location.pathname === "/clients/view",
                },
                {
                    label: "Create Client",
                    href: "/clients/create",
                    active: window.location.pathname === "/clients/create",
                },
            ]
        },
        {
            Icon: BiPackage,
            label: "Orders",
            active: window.location.pathname.includes("/orders"),
            href: '/orders/view',
            subpages: [
                {
                    label: "View Orders",
                    href: "/orders/view",
                    active: window.location.pathname === "/orders/view",
                },
                {
                    label: "Create order",
                    href: "/orders/create",
                    active: window.location.pathname === "/orders/create",
                },
                {
                    label: "See Details",
                    href: "/orders/details",
                    active: window.location.pathname === "/orders/details",
                },
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
]
