import Link from "next/link";
import { Car, Sparkles, Bell, Search } from "lucide-react";
import { Routes } from "@/constants/enums";
import { UserButton } from "@clerk/nextjs";

const AdminNavbar = () => {
  return (
    <header className="sticky top-0 z-45 h-18 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-[0_4px_12px_rgba(244,63,94,0.05)] flex items-center">
      <div className="flex justify-between items-center w-full px-4 lg:px-8 py-3">
        {/*  Logo */}
        <div className="flex items-center gap-4 lg:gap-6">
          <Link href={Routes.ROOT} className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-xl bg-rose-500 flex items-center justify-center text-white shadow-2xl shadow-rose-500/20 group-hover:rotate-6 transition-transform">
              <Car size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tighter text-slate-900 capitalize italic leading-none">
                Blush Drive
              </span>
              <div className="flex items-center gap-1 mt-1">
                <Sparkles size={7} className="text-rose-500" />
                <span className="text-[8px] font-bold text-slate-400 capitalize tracking-[0.3em] leading-none">
                  Fleet Manager
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <div className="relative group hidden md:block mr-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors w-4 h-4" />
            <input
              className="pl-12 pr-6 py-2 bg-rose-50/50 border-none rounded-full w-48 xl:w-64 focus:ring-2 focus:ring-rose-500/20 text-sm transition-all outline-none"
              placeholder="Quick search..."
              type="text"
            />
          </div>

          <button className="p-2.5 text-slate-500 hover:bg-rose-50 rounded-full transition-all relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>

          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "!size-10 border-2 border-white shadow-md",
                userButtonTrigger:
                  "!size-10 active:scale-95 transition-all outline-none",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
