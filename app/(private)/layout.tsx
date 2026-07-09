import { QueryProvider } from "@/components/provider/query-provider";
import AppHeader from "@/components/sidebar/app-header";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

async function AppPage({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "16rem",
            "--sidebar-width-mobile": "16rem",
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <main className="flex-1 w-full h-full overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </QueryProvider>
  )
}

export default AppPage;
