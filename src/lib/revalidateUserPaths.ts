import { Pages, Routes } from "@/constants/enums";
import { revalidatePath } from "next/cache";

export const revalidateUserPaths = () => {
  revalidatePath(Routes.ADMIN);
  revalidatePath(Routes.SETTINGS);
  revalidatePath(Routes.USERS);
  revalidatePath(Routes.LISTVEHICLES);
  revalidatePath(Routes.LISTBOOKINGS);
  revalidatePath(Pages.MYBOOKINGS);
  revalidatePath(Routes.ROOT);
};
