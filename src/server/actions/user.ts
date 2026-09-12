"use server";

import prisma from "@/lib/db";
import { User, UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Pages, Routes } from "@/constants/enums";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { UpdateUserType } from "@/zod-schemas/user";
import { revalidateUserPaths } from "@/lib/revalidateUserPaths";

export async function createUserInDB(data: User) {
  try {
    const user = await prisma.user.create({ data });

    revalidateUserPaths();

    return { user };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    };
  }
}

export async function UpdateUserInDB(clerkUserId: string, data: Partial<User>) {
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

    revalidateUserPaths();

    return { user };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    };
  }
}

export async function deleteUserInDB(userId: string) {
  try {
    await prisma.user.delete({
      where: {
        clerkUserId: userId,
      },
    });

    revalidateUserPaths();

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

export async function deleteUserInDBAndClerk(clerkUserId: string) {
  try {
    //Delete from Clerk
    try {
      await clerkClient.users.deleteUser(clerkUserId);
    } catch (clerkError) {
      return {
        success: false,
        message:
          clerkError instanceof Error
            ? clerkError.message
            : `Clerk deletion failed with unknown error:${clerkError}`,
      };
    }

    // Delete from DB
    const existingUser = await prisma.user.findUnique({
      where: { clerkUserId },
    });

    if (!existingUser) {
      return {
        success: false,
        message: "User already deleted from DB.",
      };
    }

    await prisma.user.delete({
      where: { clerkUserId },
    });

    revalidateUserPaths();

    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    };
  }
}

export async function updateUserInDBAndClerk({
  targetUserId,
  data,
}: {
  targetUserId: string;
  data: UpdateUserType;
}) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!currentUser) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const isAdmin = currentUser.role === UserRole.ADMIN;
    const isSelf = currentUser.clerkUserId === targetUserId;

    if (!isAdmin && !isSelf) {
      return {
        success: false,
        message: "Forbidden",
      };
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkUserId: targetUserId,
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

    const newRole = isAdmin ? data.role : existingUser.role;

    await clerkClient.users.updateUser(targetUserId, {
      firstName,
      lastName,
    });

    await clerkClient.users.updateUserMetadata(targetUserId, {
      publicMetadata: {
        role: newRole,
      },
    });

    const user = await prisma.user.update({
      where: {
        clerkUserId: targetUserId,
      },
      data: {
        name: data.fullName,
        phone: data.phone,
        bio: data.bio,
        timezone: data.timezone,
        role: newRole,
      },
    });

    revalidateUserPaths();

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
