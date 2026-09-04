import { IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export const Navbar = () => {
    // For You | Explore | Trending | Saved
    const navLinks = [
        { name: "Explore", href: "/explore" },
        { name: "Latest", href: "/latest" },
        { name: "Saved", href: "/saved" },
    ];
    return (
        <nav className={"flex items-center justify-between py-4 px-4"}>
            <Link href={"/"} className={"flex items-center gap-2"}>
                <Image
                    draggable={false}
                    loading={"lazy"}
                    src={"/logo.png"}
                    alt={"Logo"}
                    width={50}
                    height={50}
                    className={"w-8 h-8 rounded-lg"}
                />
                <div className="text-lg font-semibold tracking-wide">Blogdrop</div>
            </Link>

            <div className="items-center gap-8 sm:flex hidden">
                {navLinks.map((link, index) => (
                    <Link
                        href={link.href}
                        className="text-sm font-normal tracking-normal text-muted-foreground hover:text-foreground transition-colors duration-200"
                        key={index}>
                        {link.name}
                    </Link>
                ))}

            </div>
                <Link href={"/feed"} className={"flex items-center gap-1.5 px-4 py-1.5 text-white bg-[#2579F4] rounded-lg shadow-lg text-shadow-md font-medium text-sm tracking-wide"} >
                Go To Feed  <IconArrowRight size={16} />
                </Link>
        </nav>
    )
};