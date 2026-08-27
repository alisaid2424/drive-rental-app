import CheckoutSummary from "./_components/CheckoutSummary";
import CheckoutForm from "./_components/CheckoutForm";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/db";
import { Pages } from "@/constants/enums";

interface SearchParams {
  bookingId?: string;
}

const CheckoutPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const { bookingId } = await searchParams;
  if (!bookingId) notFound();

  const { userId } = await auth();
  if (!userId) redirect(Pages.LOGIN);

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) redirect(Pages.LOGIN);

  const bookingExists = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      userId: user.id,
    },
  });

  if (!bookingExists) notFound();

  return (
    <div className="container-custom pt-28 pb-20 flex flex-col lg:flex-row gap-8">
      <CheckoutForm
        user={user}
        amount={bookingExists.totalAmount}
        bookingId={bookingId}
      />
      <CheckoutSummary bookingId={bookingId} />
    </div>
  );
};

export default CheckoutPage;
