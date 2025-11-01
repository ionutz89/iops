"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
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
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 dark:bg-[#0B0C10]/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 shadow-sm"
          : "bg-white/80 dark:bg-transparent backdrop-blur-xl border-b border-gray-200 dark:border-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 max-w-6xl mx-auto">
        <Link href="/" className="flex flex-col items-start">
          <span className="text-2xl font-bold gradient-text">IOPS</span>
          <span className="text-xs text-gray-800 dark:text-gray-400">Intelligent Operations</span>
        </Link>

        {/* Desktop Navigation - Enhanced light mode contrast */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm transition-colors duration-300 relative font-medium",
                pathname === item.href
                  ? "text-[#7B61FF] dark:text-[#00E5FF]"
                  : "text-gray-800 dark:text-gray-300 hover:text-[#7B61FF] dark:hover:text-[#00E5FF]"
              )}
            >
              {item.label}
              {pathname === item.href && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#7B61FF] dark:bg-[#00E5FF]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
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
            <SheetContent side="right" className="w-full sm:max-w-sm bg-white dark:bg-[#121417]">
              <SheetHeader>
                <SheetTitle className="text-left text-gray-900 dark:text-white">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
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
                ))}
                <Button
                  asChild
                  className="w-full mt-6 bg-[#7B61FF] dark:bg-[#8B5CF6] text-white hover:bg-[#6C55E0] dark:hover:bg-[#7B4CF6] shadow-sm hover:shadow-md"
                >
                  <Link href="/contact">
                    Book Free Assessment
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}

