import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { IconArrowNarrowRight, IconArrowUpRight } from '@tabler/icons-react';
import Image from "next/image";
import { cn } from "@/lib/utils";

function Navbar() {
    return (
        <nav className="flex items-center justify-between py-4">
            <Link href={"/"} className="text-lg sm:text-xl font-medium flex items-center gap-2">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={32}
                    height={32}
                    className="rounded-lg"
                />
                <span className="text-foreground ">Blogdrop</span>
            </Link>

            <div className="flex items-center gap-2">
                <Link href={"/login"} className={cn(buttonVariants({ size: "lg", variant: "ghost", className: "font-normal gap-1 rounded-xl" }),"hidden md:flex")}>
                    Login <IconArrowUpRight stroke={2} />
                </Link>
                <div className="bg-neutral-300 h-7 w-px hidden md:block " />
                <Link href={"/feed"} className={buttonVariants({ size: "lg", className: "font-normal gap-1 rounded-xl" })}>
                    Go to Feed <IconArrowNarrowRight stroke={2} />
                </Link>
            </div>
        </nav>
    )
}

export default Navbar