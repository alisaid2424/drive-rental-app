import { Heading } from "@/components/Heading";
import { ShieldCheck, UserCheck, Mail, Phone, Calendar } from "lucide-react";
import Image from "next/image";
import { EditUserButton } from "./_components/EditUserButton";
import { getUsersBysearch } from "@/server/db/user";
import PaginationAdmin from "../_components/PaginationAdmin";
import SearchInput from "../_components/SearchInput";
import DeleteUserButton from "./_components/DeleteUserButton";

interface UsersPageProps {
  searchParams: Promise<{
    searchText?: string;
    pageNumber?: string;
  }>;
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const { searchText = "", pageNumber = "1" } = await searchParams;

  const { users, totalCount, totalPages } = await getUsersBysearch({
    searchText,
    pageNumber: Number(pageNumber),
  });

  return (
    <div className="space-y-12 pb-10">
      {/* Page Header */}
      <Heading
        title="Users Management"
        subtitle="Manage and track all registered system users, view roles, and monitor account status."
        align="left"
      />

      <SearchInput placeholder="Search by user name or email..." />

      {/* Users Table */}
      <section className="bg-white/60 backdrop-blur-3xl rounded-[2rem] overflow-hidden border border-white/60 shadow-xl shadow-rose-500/5">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-accent text-black">
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-left">
                  User
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-left">
                  Contact Info
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-left">
                  Role
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-center">
                  Joined Date
                </th>
                <th className="px-8 py-5 text-sm font-semibold text-center text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border/50">
              {users.map((user) => {
                const isAdmin = user.role === "ADMIN";

                return (
                  <tr
                    key={user.id}
                    className="hover:bg-accent/30 transition-colors"
                  >
                    {/* User */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        {user.image ? (
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-white shadow-sm relative">
                            <Image
                              alt={user.name || "User"}
                              src={user.image}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-rose-100 text-primary flex items-center justify-center font-black text-xs border border-white shadow-sm">
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
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-5">
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
                    </td>

                    {/* Role */}
                    <td className="px-6 py-5">
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
                    </td>

                    {/* Joined Date */}
                    <td className="px-6 py-5 text-center">
                      <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />

                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-8 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <EditUserButton user={user} />

                        <DeleteUserButton
                          isAdmin={isAdmin}
                          userId={user.clerkUserId}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <PaginationAdmin
          totalPages={totalPages}
          totalCount={totalCount}
          currentCount={users.length}
          itemName="Users"
        />
      </section>
    </div>
  );
}
