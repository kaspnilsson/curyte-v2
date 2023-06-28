import "@/styles/globals.css";
import { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <ClerkProvider>
        <html lang="en" suppressHydrationWarning>
          <head>
            <link
              rel="icon"
              href="/logo_dark.svg"
              media="(prefers-color-scheme:no-preference)"
            />
            <link
              rel="icon"
              href="/logo_light.svg"
              media="(prefers-color-scheme:dark)"
            />
            <link
              rel="icon"
              href="/logo_dark.svg"
              media="(prefers-color-scheme:light)"
            />
          </head>
          <body
            className={cn(
              "min-h-screen bg-background font-sans antialiased ",
              fontSans.className
            )}
          >
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="relative flex min-h-screen flex-col">
                <Header />
                <div className="flex-1">{children}</div>
              </div>
            </ThemeProvider>
            <Toaster />
          </body>
        </html>
      </ClerkProvider>
    </>
  );
}
