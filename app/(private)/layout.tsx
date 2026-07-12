import { QueryProvider } from "@/components/provider/query-provider";
import AppHeader from "@/components/common/app-header";
import Footer from "@/components/common/Footer";

function AppPage({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <div className="min-h-screen relative w-full">
        <AppHeader />
        <main className="min-h-full w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative mt-16 pb-6 md:pt-6">
          {children}
        </main>
        <Footer />
      </div>
    </QueryProvider>
  )
}

export default AppPage;
