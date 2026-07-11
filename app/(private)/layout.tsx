import { QueryProvider } from "@/components/provider/query-provider";
import AppHeader from "@/components/common/app-header";

function AppPage({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <div className="min-h-screen flex flex-col relative w-full">
        <AppHeader />
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          {children}
        </main>
      </div>
    </QueryProvider>
  )
}

export default AppPage;
