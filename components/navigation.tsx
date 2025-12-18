"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 transition-all duration-300",
        scrolled
          ? "bg-white/95 dark:bg-[#0B0C10]/95 border-b border-gray-200 dark:border-white/10 shadow-sm"
          : "bg-white/95 dark:bg-[#0B0C10]/80 border-b border-gray-200 dark:border-transparent"
      )}
      style={{
        /* Safari fix - explicit position and z-index, NO backdrop-filter */
        position: "fixed" as const,
        zIndex: 9999,
        pointerEvents: "auto",
        /* Removed backdrop-blur to fix Safari click issues */
      }}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 max-w-6xl mx-auto relative">
        <Link href="/" className="flex flex-col items-start">
          <span className="text-2xl font-bold gradient-text">IOPS</span>
          <span className="text-xs text-gray-800 dark:text-gray-400">
            Intelligent Operations
          </span>
        </Link>

        {/* Desktop Navigation - Native anchors for Safari compatibility */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm transition-colors duration-300 font-medium py-1 border-b-2",
                pathname === item.href
                  ? "text-[#7B61FF] dark:text-[#00E5FF] border-[#7B61FF] dark:border-[#00E5FF]"
                  : "text-gray-800 dark:text-gray-300 hover:text-[#7B61FF] dark:hover:text-[#00E5FF] border-transparent"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button
            asChild
            className="hidden md:flex rounded-2xl bg-[#7B61FF] dark:bg-[#8B5CF6] text-white hover:bg-[#6C55E0] dark:hover:bg-[#7B4CF6] shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
          >
            <Link href="/contact">Book Free Assessment</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="md:hidden text-gray-900 dark:text-gray-200"
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:max-w-sm bg-white dark:bg-[#121417]"
            >
              <SheetHeader>
                <SheetTitle className="text-left text-gray-900 dark:text-white">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 space-y-4">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block w-full text-left text-base py-2 transition-colors duration-300",
                        pathname === item.href
                          ? "text-[#7B61FF] dark:text-[#00E5FF] font-medium"
                          : "text-gray-800 dark:text-gray-300 hover:text-[#7B61FF] dark:hover:text-[#00E5FF]"
                      )}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button
                    asChild
                    className="w-full mt-6 bg-[#7B61FF] dark:bg-[#8B5CF6] text-white hover:bg-[#6C55E0] dark:hover:bg-[#7B4CF6] shadow-sm hover:shadow-md"
                  >
                    <Link href="/contact">Book Free Assessment</Link>
                  </Button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
