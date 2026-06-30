"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  CalendarDays,
  Users,
  Settings,
  CircleHelp,
  LogOut,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Routes } from "@/constants/enums";

const adminItems = [
  {
    name: "Analytics",
    href: Routes.ADMIN,
    icon: LayoutDashboard,
  },
  {
    name: "Vehicles",
    href: Routes.LISTVEHICLES,
    icon: Car,
  },
  {
    name: "Bookings",
    href: Routes.LISTBOOKINGS,
    icon: CalendarDays,
  },
  {
    name: "Customers",
    href: Routes.CUSTOMERS,
    icon: Users,
  },
  {
    name: "Settings",
    href: Routes.SETTINGS,
    icon: Settings,
  },
];

const AdminSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActiveTab = (href: string) => {
    const hrefArray = href.split("/");
    return hrefArray.length > 2 ? pathname.startsWith(href) : pathname === href;
  };

  return (
    <aside className="fixed left-0 top-18 h-[calc(100vh-72px)] w-16 lg:w-56 bg-white/40 backdrop-blur-2xl border-r border-white/20 shadow-2xl shadow-primary/5 flex flex-col z-40">
      <nav className="flex-1 pt-2">
        {adminItems.map(({ name, href, icon: Icon }) => {
          const isActive = isActiveTab(href);

          return (
            <Link key={name} href={href}>
              <div
                className={`flex items-center gap-3 py-4 px-4 lg:px-6 transition-all ${
                  isActive
                    ? "border-r-4 border-primary bg-primary/10 text-primary"
                    : "text-secondary hover:bg-primary/10 hover:text-primary"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />

                <span className="hidden lg:block text-[15px] whitespace-nowrap">
                  {name}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Add Vehicle Button */}
      <div className="p-2 lg:p-4 element-center">
        <Button
          onClick={() => router.push(`${Routes.LISTVEHICLES}/add-vehicle`)}
          className="w-full py-5"
        >
          <Plus className="size-5" />

          <span className="hidden lg:inline whitespace-nowrap">
            Add New Car
          </span>
        </Button>
      </div>

      {/* Bottom Section */}
      <div className="pt-2 pb-10">
        <Link href="#">
          <div className="flex items-center gap-3 py-4 px-4 lg:px-6 text-secondary hover:text-primary transition-all">
            <CircleHelp className="w-5 h-5" />

            <span className="hidden lg:block text-sm">Help Center</span>
          </div>
        </Link>

        <Link
          href="#"
          className="w-full flex items-center gap-3 py-4 px-4 lg:px-6 text-secondary hover:text-primary transition-all"
        >
          <LogOut className="w-5 h-5" />

          <span className="hidden lg:block text-sm">Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
