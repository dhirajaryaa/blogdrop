"use client";

import { authClient } from "@/lib/auth/auth-client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { IconArrowRight, IconHistory, IconLogout, IconSettings, IconUser } from "@tabler/icons-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

function UserProfile() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
        },
      },
    });
  };


  return (
    <>
      {
        isPending ?
          <Skeleton className="w-9 h-9 rounded-full" />
          : session ?
            (
              <DropdownMenu >
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarImage src={session.user.image ?? ""} alt={session.user.name} />
                      <AvatarFallback>{session.user.name[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-full" >
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href={"/profile"}>
                        <IconUser />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                  
                    <DropdownMenuItem asChild>
                      <Link href={"/history"}>
                        <IconHistory />
                        Reading History
                      </Link>
                    </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                      <Link href={"/settings"}>
                        <IconSettings />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Button onClick={handleLogout} variant={"destructive"} className="w-full">
                      <IconLogout />
                      Sign Out
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) :
            <Link href={"/login"} className={buttonVariants({ size: "lg", className: "rounded-xl" })}>
              Get Started
              <IconArrowRight className="size-4 ml-2" />
            </Link>
      }

    </>
  )
}

export default UserProfile;
