"use server";

import prisma from "@/lib/db";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Pages, Routes } from "@/constants/enums";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { TProfileFormSchema } from "@/zod-schemas/settings/accountSettingsSchema";

export async function createUser(data: User) {
  try {
    const user = await prisma.user.create({ data });

    revalidatePath(Routes.ADMIN);
    revalidatePath(Routes.SETTINGS);
    revalidatePath(Routes.CUSTOMERS);
    revalidatePath(Routes.LISTVEHICLES);
    revalidatePath(Pages.MYBOOKINGS);
    revalidatePath(Routes.ROOT);

    return { user };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    };
  }
}

export async function UpdateUser(clerkUserId: string, data: Partial<User>) {
  try {
    if (!clerkUserId) {
      return { error: "Missing user ID" };
    }

    if (!data || Object.keys(data).length === 0) {
      return { error: "No data provided to update." };
    }

    const user = await prisma.user.update({
      where: { clerkUserId },
      data,
    });

    revalidatePath(Routes.ADMIN);
    revalidatePath(Routes.SETTINGS);
    revalidatePath(Routes.CUSTOMERS);
    revalidatePath(Routes.LISTVEHICLES);
    revalidatePath(Pages.MYBOOKINGS);
    revalidatePath(Routes.ROOT);

    return { user };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    };
  }
}

export async function deleteUserFromDB(userId: string) {
  try {
    await prisma.user.delete({
      where: {
        clerkUserId: userId,
      },
    });

    revalidatePath(Routes.ADMIN);
    revalidatePath(Routes.SETTINGS);
    revalidatePath(Routes.CUSTOMERS);
    revalidatePath(Routes.LISTVEHICLES);
    revalidatePath(Pages.MYBOOKINGS);
    revalidatePath(Routes.ROOT);

    return {
      success: true,
      status: 200,
      message: "User deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    };
  }
}

export async function updateProfile(data: TProfileFormSchema) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!existingUser) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const parts = data.fullName.trim().split(/\s+/);

    const firstName = parts[0] ?? "";
    const lastName = parts.slice(1).join(" ");

    await clerkClient.users.updateUser(userId, {
      firstName,
      lastName,
    });

    const user = await prisma.user.update({
      where: {
        clerkUserId: userId,
      },
      data: {
        name: data.fullName,
        phone: data.phone,
        bio: data.bio,
        timezone: data.timezone,
      },
    });

    revalidatePath(Routes.ADMIN);
    revalidatePath(Routes.SETTINGS);
    revalidatePath(Routes.CUSTOMERS);
    revalidatePath(Routes.LISTVEHICLES);
    revalidatePath(Pages.MYBOOKINGS);
    revalidatePath(Routes.ROOT);

    return {
      success: true,
      user,
      message: "Profile updated successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    };
  }
}

export async function updateFavoriteUser(vehicleId: string, userId: string) {
  try {
    const user = await clerkClient.users.getUser(userId);

    let favorites = (user.privateMetadata?.favorites as string[]) ?? [];

    if (!Array.isArray(favorites)) {
      favorites = [];
    }

    // Toggle logic
    if (!favorites.includes(vehicleId)) {
      favorites.push(vehicleId);
    } else {
      favorites = favorites.filter((id) => id !== vehicleId);
    }

    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        ...user.privateMetadata,
        favorites,
      },
    });

    revalidatePath(Routes.ROOT);
    revalidatePath(Pages.BROWSE);
    revalidatePath(Pages.FAVORITE);

    return {
      status: 200,
      message: "Favorite vehicles updated",
      favorites,
    };
  } catch (error) {
    return {
      status: 500,
      message: error instanceof Error ? error.message : "internal server error",
    };
  }
}
