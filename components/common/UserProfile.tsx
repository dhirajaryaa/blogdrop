"use client";

import { authClient } from "@/lib/auth/auth-client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { IconArrowRight, IconLogout, IconSettings, IconUser } from "@tabler/icons-react";
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
    <div>
      {
        isPending ? null : session ?
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
              <DropdownMenuContent align="end" >
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <IconUser />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconSettings />
                    Settings
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

    </div>
  )
}

export default UserProfile;
