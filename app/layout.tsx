import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BlogDrop — Every Engineering Blog. One Feed.",
  description:
    "AI-powered engineering blog aggregator. Follow Netflix, Stripe, Uber, Cloudflare and hundreds of engineering blogs in a single personalized feed.",
  keywords: [
    "engineering blogs",
    "developer blog aggregator",
    "AI summaries",
    "tech blogs",
    "Netflix tech blog",
    "Stripe engineering",
  ],
  openGraph: {
    title: "BlogDrop — Every Engineering Blog. One Feed.",
    description:
      "AI-powered engineering blog aggregator. Follow hundreds of engineering blogs in a single personalized feed.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlogDrop — Every Engineering Blog. One Feed.",
    description:
      "AI-powered engineering blog aggregator. Follow hundreds of engineering blogs in a single personalized feed.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        dmSans.variable
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
        >
          {children}
          <Toaster richColors closeButton position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
