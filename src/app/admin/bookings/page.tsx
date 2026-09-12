import { Heading } from "@/components/Heading";
import TableBookings from "../_components/TableBookings";
import SearchInput from "../_components/SearchInput";
import { getBookings } from "@/server/db/booking";

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

      <SearchInput placeholder="Search by name user or vehicle..." />

      <TableBookings {...data} />
    </div>
  );
};

export default BookingsPage;
