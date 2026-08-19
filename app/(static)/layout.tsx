import Footer from "@/components/common/Footer";
import AppHeader from "@/components/common/app-header";

export default function StaticLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 pt-22 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
