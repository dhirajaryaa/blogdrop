import Footer from "@/components/common/Footer";
import { IconError404 } from "@tabler/icons-react";
import { EmptyState } from "@/components/static/EmptyState";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AppHeader from "@/components/common/app-header";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground relative">
      <AppHeader />
      <main className="w-full space-y-8 max-w-xl mx-auto mt-30 px-12 pb-16">
        <EmptyState
          icon={<IconError404 className="w-16 h-16 text-muted-foreground" />}
          title="Page Not Found"
          description="We couldn't find the page you were looking for. It might have been moved or doesn't exist."
        />
        <div className="flex gap-4 items-center justify-center mx-auto">
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/feed">Browse Articles</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
