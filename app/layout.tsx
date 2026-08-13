import "./globals.css";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalytics } from '@next/third-parties/google';


const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

import { constructMetadata } from "@/lib/utils";
import Script from "next/script";

export const metadata = constructMetadata();

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
        "font-sans",
        dmSans.variable,
        jetbrainsMono.variable
      )}
      suppressHydrationWarning
    >
      {/* clarity */}
      <Script
        id="clarity"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "xtalxxfvcl");`,
        }}
      />
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="top-center" />
        </ThemeProvider>
        {/* google analytics */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTIC_ID!} debugMode={true} />
      </body>
    </html>
  );
}
