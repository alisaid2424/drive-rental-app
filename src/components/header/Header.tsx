"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Bell, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import NavLink from "./_components/NavLink";
import { Pages, Routes } from "@/constants/enums";

const navLinks = [
  { name: "Home", href: Routes.ROOT },
  { name: "Locations", href: Pages.LOCATIONS },
  { name: "About Us", href: Pages.ABOUT },
  { name: "Contact Us", href: Pages.CONTACT },
  { name: "Favorites", href: Pages.FAVORITE },
  { name: "My Bookings", href: Pages.MYBOOKINGS },
  { name: "Dashboard", href: Routes.ADMIN },
];

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    !pathname.startsWith("/admin") && (
      <header className="container-custom fixed top-0 z-50 flex h-20 w-full items-center justify-between border-b border-rose-100/20 bg-white/60 shadow-sm shadow-rose-500/5 backdrop-blur-xl dark:bg-slate-900/60">
        {/* Left */}
        <div className="flex items-center gap-12">
          <Link
            href={Routes.ROOT}
            className="text-2xl font-black italic uppercase tracking-tighter text-rose-500"
          >
            LuxeDrive
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 xl:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                active={isActive(link.href)}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative group hidden md:block mr-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors w-4 h-4" />
            <input
              className="pl-12 pr-6 py-2 bg-white/70 border-none shadow-xs rounded-full w-48 xl:w-56 focus:ring-2 focus:ring-rose-500/20 text-sm transition-all outline-none placeholder:text-slate-300"
              placeholder="Search fleet..."
              type="text"
            />
          </div>

          {/* Actions */}
          <button className="icon-btn-header">
            <Bell size={18} />
          </button>

          <button className="icon-btn-header">
            <User size={18} />
          </button>

          {/* Mobile Toggle */}
          <button
            className="p-2 text-slate-600 xl:hidden cursor-pointer"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute left-0 top-full w-full overflow-hidden border-b border-rose-100 bg-white shadow-2xl dark:bg-slate-900 xl:hidden"
            >
              <div className="flex flex-col space-y-4 p-8">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    mobile
                    active={isActive(link.href)}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                ))}

                <div className="mt-4 h-px w-full bg-rose-50" />

                <Link
                  href="/browse"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-2xl bg-rose-500 p-5 text-center text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-rose-500/20"
                >
                  Explore Elite Fleet
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    )
  );
};

export default Header;
