import { Column } from "@/components/AdminTable";
import { User } from "@prisma/client";
import {
  Calendar,
  Globe,
  Mail,
  Phone,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import Image from "next/image";
import { EditUserButton } from "./EditUserButton";
import { deleteUserInDBAndClerk } from "@/server/actions/user";
import { DeleteButton } from "@/components/DeleteButton";

export const userColumns: Column<User>[] = [
  {
    header: "No",
    headerClassName: "text-center w-12",
    cellClassName: "text-center font-bold text-slate-600 text-xs",
    cell: (_, index) => index,
  },
  {
    header: "User",
    headerClassName: "text-center w-48",
    cell: (user) => (
      <div className="flex items-center gap-3">
        {user.image ? (
          <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden border border-white shadow-sm relative">
            <Image
              alt={user.name || "User"}
              src={user.image}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-10 h-10 shrink-0 rounded-full bg-rose-100 text-primary flex items-center justify-center font-black text-xs border border-white shadow-sm">
            {user.name
              ?.split(" ")
              .map((n) => n[0])
              .join("") || "U"}
          </div>
        )}

        <div>
          <p className="text-sm font-black text-slate-900 capitalize">
            {user.name || "Unnamed User"}
          </p>
          <p className="text-[10px] font-bold text-slate-400">
            ID: {user.id.slice(0, 8)}...
          </p>
        </div>
      </div>
    ),
  },
  {
    header: "Contact Info",
    cell: (user) => (
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{user.phone || "No phone added"}</span>
        </div>
      </div>
    ),
  },
  {
    header: "Bio & Timezone",
    headerClassName: "hidden xl:table-cell text-left",
    cellClassName: "hidden xl:table-cell max-w-xs",
    cell: (user) => (
      <div className="space-y-1">
        <p
          className="text-xs text-slate-600 font-medium truncate"
          title={user.bio || ""}
        >
          {user.bio || "No bio available"}
        </p>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
          <Globe className="w-3.5 h-3.5 shrink-0 text-slate-400" />
          <span>{user.timezone || "UTC"}</span>
        </div>
      </div>
    ),
  },
  {
    header: "Role",
    headerClassName: "text-center px-3",
    cellClassName: "text-center px-3",
    cell: (user) => {
      const isAdmin = user.role === "ADMIN";
      return (
        <span
          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${
            isAdmin
              ? "bg-purple-50 text-purple-600 border-purple-200"
              : "bg-emerald-50 text-emerald-600 border-emerald-200"
          }`}
        >
          {isAdmin ? (
            <ShieldCheck className="w-3 h-3" />
          ) : (
            <UserCheck className="w-3 h-3" />
          )}
          {user.role}
        </span>
      );
    },
  },
  {
    header: "Joined Date",
    headerClassName: "text-center",
    cellClassName: "text-center",
    cell: (user) => (
      <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium justify-center">
        <Calendar className="w-3.5 h-3.5 text-slate-400" />
        {new Date(user.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </div>
    ),
  },
  {
    header: "Actions",
    headerClassName: "text-center px-8",
    cellClassName: "text-center px-8",
    cell: (user, _, totalCurrentItems) => {
      const isAdmin = user.role === "ADMIN";
      return (
        <div className="flex items-center justify-center gap-2">
          <EditUserButton user={user} />

          <DeleteButton
            id={user.clerkUserId}
            onDelete={deleteUserInDBAndClerk}
            disabled={isAdmin}
            title="Delete User?"
            description="Are you sure you want to delete this user?"
            currentItemsCount={totalCurrentItems}
          />
        </div>
      );
    },
  },
];
