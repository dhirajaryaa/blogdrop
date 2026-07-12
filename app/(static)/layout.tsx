import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { buttonVariants } from "@/components/ui/button";

export default function StaticLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 md:py-10 lg:px-8">
        <Link href={"/"} className={buttonVariants({ variant: "outline",className:"mb-6 shadow-xs bg-card hover:bg-accent" })}>
          <IconArrowLeft /> Back
        </Link>
        {children}
      </main>
      <Footer />
    </div>
  );
}
