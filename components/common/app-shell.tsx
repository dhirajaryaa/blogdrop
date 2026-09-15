"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import { Topbar } from "./topbar";
import MobileNav from "./mobile-nav";

type AppShellProps = {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  children: React.ReactNode;
};

function AppShell({ user, children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />

      <div className="flex min-h-screen w-full flex-1 flex-col">
        <Topbar user={user} />
        <main className="mx-auto w-full max-w-5xl flex-1 px-6 pb-28 sm:px-10 lg:pb-16">
          {children}
        </main>
        <MobileNav />
      </div>
    </div>
  );
}

export default AppShell;