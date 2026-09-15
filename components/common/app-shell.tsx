"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import { Topbar } from "./topbar";

function AppShell({ children }: { children: React.ReactNode }) {
  const [collapse, setCollapse] = useState<boolean>(false);
  return (
    <div className="flex h-screen">
      {/* sidebar  */}
      <Sidebar collapsed={collapse} onToggle={() => setCollapse(!collapse)} />
      <div className="flex min-h-screen w-full flex-1 flex-col">
        <Topbar />
        <main className="flex">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppShell;