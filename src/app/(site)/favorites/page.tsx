import { Heading } from "@/components/Heading";
import LottieHandler from "@/components/LottieHandler";
import VehicleCard from "@/components/VehicleCard";
import { Pages } from "@/constants/enums";
import { getUserFavoriteIds } from "@/server/db/favorite";
import { getFavoritesUser } from "@/server/db/user";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Your Favorites",
  description:
    "View and manage your saved favorite luxury vehicles for quick booking.",
};

const FavoritesPage = async () => {
  const { userId } = await auth();
  if (!userId) redirect(Pages.LOGIN);
  const favorites = await getFavoritesUser(userId);
  const userFavoriteIds = await getUserFavoriteIds();

  return (
    <div className="container-custom flex flex-col items-start pt-20">
      <div className="space-y-2 py-6">
        <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          Your Collection
        </span>

        <Heading
          title="Favorite Vehicles"
          subtitle="Your saved collection of luxury vehicles, ready whenever you are."
          align="left"
          className="items-start"
          classNameSubTitle="text-start"
        />
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full pb-10">
          {favorites.map((car, index) => (
            <VehicleCard
              key={car.id}
              car={car}
              index={index}
              isFavorite={userFavoriteIds.includes(car.id)}
            />
          ))}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center py-20">
          <LottieHandler type="empty" message="No Favorite Available" />
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
