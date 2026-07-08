"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { IconBookmark, IconHistory, IconHome, IconSettings, IconTag, IconTrendingUp } from "@tabler/icons-react"
import Link from "next/link";
import Logo from "../common/Logo";
import { usePathname } from "next/navigation";

export function AppSidebar() {
    const pathname = usePathname();

    const NavItemsTop = [
        {
            title: "Home",
            icon: IconHome,
            href: "/feed",
        },
        {
            title: "Trending",
            icon: IconTrendingUp,
            href: "/trending",
        },
        {
            title: "Bookmarks",
            icon: IconBookmark,
            href: "/bookmarks",
        },
        {
            title: "Topics",
            icon: IconTag,
            href: "/topics",
        },
    ];

    const NavItemsBottom = [
        {
            title: "Reading History",
            icon: IconHistory,
            href: "/history",
        },
        {
            title: "Settings",
            icon: IconSettings,
            href: "/settings",
        },
    ];



    return (
        <Sidebar>
            {/* header links */}
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem className="px-3 py-4">
                        <Logo href="/feed" />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            {/* main nav links  */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {NavItemsTop.map((link) => {
                            const IconComponent = link.icon;
                            return (<SidebarMenuItem key={link.title} className="px-2 py-1">
                                <SidebarMenuButton asChild className="[&>svg]:size-5 text-[15px] py-4 h-10 rounded-lg" isActive={pathname.startsWith(link.href)} >
                                    <Link href={link.href}>
                                        <IconComponent className="size-5" />
                                        <span>{link.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            {/* footer links  */}
            <SidebarFooter>
                <SidebarMenu>
                    {NavItemsBottom.map((link) => {
                        const IconComponent = link.icon;
                        return (<SidebarMenuItem key={link.title} className="px-2 py-1">
                            <SidebarMenuButton asChild className="[&>svg]:size-5 text-[15px] py-4 h-10 rounded-lg"
                                isActive={pathname.startsWith(link.href)}>
                                <Link href={link.href}>
                                    <IconComponent className="size-5" />
                                    <span>{link.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>)
                    })}
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}