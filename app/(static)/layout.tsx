import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function StaticLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 md:py-12 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
