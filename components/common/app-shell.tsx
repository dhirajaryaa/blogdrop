"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import { Topbar } from "./topbar";
import MobileNav from "./mobile-nav";
import { authClient } from "@/features/auth/auth-client";

function AppShell({ children }: { children: React.ReactNode }) {
  const [collapse, setCollapse] = useState<boolean>(false);
  const { data: session } = authClient.useSession();

  return (
    <div className="flex min-h-screen">
      {/* sidebar  */}
      <Sidebar collapsed={collapse} onToggle={() => setCollapse(!collapse)} />
      <div className="flex min-h-screen w-full flex-1 flex-col">
        <Topbar user={session?.user} />
        <main className="mx-auto w-full max-w-5xl flex-1 pb-28 sm:px-10 lg:pb-16">
          {children}
        </main>
        <MobileNav />
      </div>
    </div>
  )
}

export default AppShell;