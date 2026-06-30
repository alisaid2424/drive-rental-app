import { Heading } from "@/components/Heading";
import LottieHandler from "@/components/LottieHandler";
import VehicleCard from "@/components/VehicleCard";
import { carsall } from "@/constants/data";

const FavoritesPage = async () => {
  /* const { userId } = await auth();
  if (!userId) redirect(Pages.LOGIN);
  const showfavorite = await getUserFavorites(userId); */

  return carsall.length ? (
    <div className="container-custom flex flex-col items-start pt-20">
      <div className="space-y-2 py-6">
        <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          Your Collection
        </span>

        <Heading
          title="Favorite Vehicles"
          subtitle="Your saved collection of luxury vehicles, ready whenever you are."
          align="left"
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-6 w-full pb-10">
        {carsall.map((car, index) => (
          <VehicleCard key={index} car={car} />
        ))}
      </div>
    </div>
  ) : (
    <div className="element-center text-center min-h-[calc(100vh-60px)]">
      <LottieHandler type="empty" message="No Favorite Available" />
    </div>
  );
};

export default FavoritesPage;
