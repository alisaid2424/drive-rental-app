"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, Bell, Search, Menu, X, TicketPlus, Heart } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Pages, Routes } from "@/constants/enums";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const navLinks = [
  { name: "Home", href: Routes.ROOT },
  { name: "Locations", href: Pages.LOCATIONS },
  { name: "About Us", href: Pages.ABOUT },
  { name: "Contact Us", href: Pages.CONTACT },
  { name: "Admin", href: Routes.ADMIN },
];

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href;

  if (pathname.startsWith(Routes.ADMIN)) return null;

  return (
    <header className="fixed top-0 z-50 h-20 w-full border-b border-rose-100/20 bg-white/60 shadow-sm shadow-rose-500/5 backdrop-blur-xl flex items-center">
      <div className="container-custom flex w-full items-center justify-between lg:gap-10">
        {/* logo */}
        <Link
          href={Routes.ROOT}
          className="text-2xl font-black italic uppercase tracking-tighter text-rose-500 max-lg:flex-1"
        >
          LuxeDrive
        </Link>

        <div
          className={cn(
            "flex items-center lg:me-auto gap-8 overflow-hidden transition-[width] duration-300",

            "max-lg:absolute max-lg:top-0 max-lg:left-0 max-lg:z-50 max-lg:h-screen max-lg:flex-col max-lg:justify-center max-lg:bg-white/95 max-lg:backdrop-blur-2xl",

            isOpen ? "max-lg:w-full max-lg:px-8" : "max-lg:w-0 max-lg:px-0",

            "lg:flex lg:flex-row lg:w-auto",
          )}
        >
          {/* mobile close button */}
          <Button
            size="icon-lg"
            onClick={() => setIsOpen(false)}
            className="group lg:hidden absolute top-8 right-8 h-10 w-10 cursor-pointer text-slate-600 bg-slate-50 hover:bg-slate-100 hover:text-rose-500 rounded-xl transition-all duration-300"
          >
            <X className="size-5 group-hover:rotate-180 transition duration-300" />
          </Button>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => {
                scrollTo(0, 0);
                setIsOpen(false);
              }}
              className={cn(
                "transition-all duration-300 text-sm tracking-tighter",
                "max-lg:w-full max-lg:text-base max-lg:font-bold max-lg:hover:ps-2",
                isActive(link.href)
                  ? "text-rose-500 lg:border-b-2 lg:border-rose-500 lg:pb-1 lg:font-semibold"
                  : "text-slate-600 hover:text-rose-400",
              )}
            >
              {link.name}
            </Link>
          ))}

          <div className="mt-4 h-px w-full bg-rose-100 lg:hidden" />
          {/* Mobile Only Call-to-Action */}
          <Link
            href="/browse"
            onClick={() => setIsOpen(false)}
            className="rounded-2xl bg-rose-500 p-5 text-center text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-rose-500/20 lg:hidden w-full"
          >
            Explore Elite Fleet
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* search input */}
          <div className="relative mr-2 hidden group md:block">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-rose-500" />
            <Input
              className="w-48 rounded-full border-none bg-white/70 py-2 pr-6 pl-12 text-sm shadow-xs outline-none transition-all placeholder:text-slate-300 focus:ring-2 focus:ring-rose-500/20 xl:w-56 dark:bg-slate-800"
              placeholder="Search fleet..."
              type="text"
            />
          </div>

          {/* notifications */}
          <button className="icon-btn-header">
            <Bell size={18} />
          </button>

          {/* Auth Controls */}
          {user ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Booking"
                  labelIcon={<TicketPlus className="w-4 h-4 text-gray-600" />}
                  onClick={() => router.push(Pages.MYBOOKINGS)}
                />

                <UserButton.Action
                  label="My Favorite"
                  labelIcon={<Heart className="w-4 h-4 text-gray-600" />}
                  onClick={() => router.push(Pages.FAVORITE)}
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button onClick={() => openSignIn()} className="icon-btn-header">
              <User size={18} />
            </button>
          )}

          {/* Mobile Menu Button */}
          <Button
            size="icon"
            variant="link"
            className=" cursor-pointer p-2 text-slate-600 dark:text-slate-400 lg:hidden max-md:ms-2"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="size-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
