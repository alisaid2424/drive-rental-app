import { OrderSummary } from "./_components/OrderSummary";
import CheckoutForm from "./_components/CheckoutForm";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/db";
import { Pages } from "@/constants/enums";

const CheckoutPage = async () => {
  const { userId } = await auth();

  if (!userId) notFound();

  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) redirect(Pages.LOGIN);

  return (
    <div className="container-custom pt-28 pb-20 flex flex-col lg:flex-row gap-8">
      <CheckoutForm user={user} />

      <OrderSummary />
    </div>
  );
};

export default CheckoutPage;
