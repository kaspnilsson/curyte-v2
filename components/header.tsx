import Link from "next/link";

import { siteConfig } from "@/config/site";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";

import { Icons } from "./icons";

export function Header() {
  return (
    <header className="z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 md:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="h-5 w-5" />
            <span className="inline-block font-bold leading-tight tracking-tighter">
              {siteConfig.name}
            </span>
          </Link>
          <span className="ml-8 mr-3 text-muted-foreground">/</span>
          <MainNav items={siteConfig.mainNav} />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden items-center space-x-1 md:flex">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
