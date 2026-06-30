import { cn } from "@/lib/utils";
import Link from "next/link";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  mobile?: boolean;
  onClick?: () => void;
};

const NavLink = ({ href, children, active, mobile, onClick }: NavLinkProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "transition-all duration-300",
        mobile
          ? "w-full text-base font-bold tracking-tighter hover:ps-2"
          : "text-sm",
        active
          ? "border-rose-500 text-rose-500"
          : "text-slate-600 hover:text-rose-400 dark:text-slate-400",
        !mobile && active && "border-b-2 pb-1 font-semibold",
        mobile && "dark:text-white",
      )}
    >
      {children}
    </Link>
  );
};
export default NavLink;
