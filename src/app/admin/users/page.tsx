import { Heading } from "@/components/Heading";
import { getUsersBysearch } from "@/server/db/user";
import SearchInput from "../_components/SearchInput";
import { AdminTable } from "@/components/AdminTable";
import { userColumns } from "./_components/UserColumns";
import { USERS_PER_PAGE } from "@/constants/enums";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users Management",
  description:
    "View, manage, and monitor all registered system users, permissions, and roles.",
  robots: { index: false, follow: false },
};

interface UsersPageProps {
  searchParams: Promise<{
    searchText?: string;
    pageNumber?: string;
  }>;
}

const UsersPage = async ({ searchParams }: UsersPageProps) => {
  const { searchText = "", pageNumber = "1" } = await searchParams;

  const { users, totalCount, totalPages } = await getUsersBysearch({
    searchText,
    pageNumber: Number(pageNumber),
  });

  return (
    <div className="space-y-12 pb-10">
      <Heading
        title="Users Management"
        subtitle="Manage and track all registered system users, view roles, and monitor account status."
        align="left"
      />

      <SearchInput
        key={searchText}
        placeholder="Search by user name or email..."
      />

      <AdminTable
        data={users}
        columns={userColumns}
        totalPages={totalPages}
        totalCount={totalCount}
        currentPage={Number(pageNumber)}
        itemsPerPage={USERS_PER_PAGE}
        tableType="Users"
      />
    </div>
  );
};

export default UsersPage;
