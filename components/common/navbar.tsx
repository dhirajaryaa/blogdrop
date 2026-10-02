import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { IconArrowNarrowRight, IconArrowUpRight } from "@tabler/icons-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

function Navbar() {
  return (
    <nav className="flex items-center justify-between py-4">
      <Link href={"/"} className="flex items-center gap-2 text-lg sm:text-xl">
        <Image
          src="/logo.png"
          alt="Logo"
          width={32}
          height={32}
          className="rounded-lg"
        />
        <span className="text-foreground font-medium">Blogdrop</span>
      </Link>

      <div className="flex items-center gap-2">
        <Link
          href={"/auth/login"}
          className={cn(
            buttonVariants({
              size: "lg",
              variant: "ghost",
              className: "gap-1 rounded-xl font-normal",
            }),
            "hidden text-sm sm:flex",
          )}
        >
          Login <IconArrowUpRight stroke={2} />
        </Link>
        <div className="hidden h-7 w-px bg-neutral-300 sm:block" />
        <Link
          href={"/feed"}
          className={buttonVariants({
            size: "lg",
            className: "gap-1 rounded-xl text-sm font-normal",
          })}
        >
          Go to Feed <IconArrowNarrowRight stroke={2} />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
