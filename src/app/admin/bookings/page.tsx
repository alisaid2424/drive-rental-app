import { Heading } from "@/components/Heading";
import SearchInput from "../_components/SearchInput";
import { getBookings } from "@/server/db/booking";
import { AdminTable } from "@/components/AdminTable";
import { bookingColumns } from "../_components/BookingColumns";
import { BOOKINGS_PER_PAGE } from "@/constants/enums";

interface BookingsPageProps {
  searchParams: Promise<{
    searchText?: string;
    pageNumber?: string;
  }>;
}

const BookingsPage = async ({ searchParams }: BookingsPageProps) => {
  const { searchText = "", pageNumber = "1" } = await searchParams;

  const data = await getBookings({
    searchText,
    pageNumber: Number(pageNumber),
  });

  return (
    <div className="space-y-12 pb-10">
      <Heading
        title="Booking Reservations"
        subtitle="Manage and track all vehicle reservations across your fleet, including real-time availability and logistic timelines."
        align="left"
      />

      <SearchInput
        key={searchText}
        placeholder="Search by name user or vehicle..."
      />

      <AdminTable
        data={data.bookings}
        columns={bookingColumns}
        totalPages={data.totalPages}
        totalCount={data.totalCount}
        currentPage={Number(pageNumber)}
        itemsPerPage={BOOKINGS_PER_PAGE}
        tableType="Bookings"
      />
    </div>
  );
};

export default BookingsPage;
