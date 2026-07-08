import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

async function AppPage({ children }: { children: React.ReactNode }) {
  return (
    <>
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
          <main>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}

export default AppPage;
