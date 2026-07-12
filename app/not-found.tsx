import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { IconError404 } from "@tabler/icons-react";
import { EmptyState } from "@/components/static/EmptyState";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <EmptyState
          icon={<IconError404 className="w-16 h-16 text-muted-foreground" />}
          title="Page Not Found"
          description="We couldn't find the page you were looking for. It might have been moved or doesn't exist."
        />
        <div className="mt-8 flex gap-4">
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
