import { QueryProvider } from "@/components/provider/query-provider";
import AppHeader from "@/components/common/app-header";

function AppPage({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <div className="min-h-screen relative w-full">
        <AppHeader />
        <main className="min-h-full w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative mt-16">
          {children}
        </main>
      </div>
    </QueryProvider>
  )
}

export default AppPage;
