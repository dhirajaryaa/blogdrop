import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

function Logo({ className }: { className?: string }) {
    return (
        <Link href="/">
        <Image
            src="/logo.png"
            alt="BlogDrop"
            width={40}
            height={40}
            loading="lazy"
            className={cn("rounded-lg",className)}
            />
            </Link>
    )
}

export default Logo;