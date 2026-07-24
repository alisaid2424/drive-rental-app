"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { getImageUrl } from "./getImageUrl";
import { Pages, Routes } from "@/constants/enums";
import {
  CreateVehicleSchema,
  CreateVehicleType,
  UpdateVehicleSchema,
  UpdateVehicleType,
} from "@/zod-schemas/car/vehicle";

export const vehicleAction = async (
  data: CreateVehicleType | UpdateVehicleType,
  mode: "create" | "update",
) => {
  const { userId } = await auth();

  if (!userId) {
    return {
      status: 401,
      message: "Unauthorized",
    };
  }

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    return {
      status: 401,
      message: "User not found",
    };
  }

  const result =
    mode === "create"
      ? CreateVehicleSchema.safeParse(data)
      : UpdateVehicleSchema.safeParse(data);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0]?.toString() || "form";
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    });

    return {
      status: 400,
      message: "Validation failed",
      error: fieldErrors,
    };
  }

  const formData = result.data;

  try {
    const imageUrls: string[] = [];

    await Promise.all(
      formData.images.map(async (image, index) => {
        if (typeof image === "string") {
          imageUrls[index] = image;
        }

        if (image instanceof File && image.size > 0) {
          const res = await getImageUrl({
            imageFile: image,
            publicId: image.name,
            pathName: "Image_vehicles_drive_rental",
          });

          if (res) imageUrls[index] = res;
        }
      }),
    );

    const formattedFeatures =
      typeof formData.features === "string"
        ? formData.features
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item.length > 0)
        : formData.features || [];

    if (mode === "create") {
      await prisma.vehicle.create({
        data: {
          brand: formData.brand,
          name: formData.name,
          type: formData.type,
          pricePerDay: formData.pricePerDay,
          description: formData.description,
          seats: formData.seats,
          transmission: formData.transmission,
          fuel: formData.fuel,
          power: formData.power,
          topSpeed: formData.topSpeed,
          features: formattedFeatures,
          images: imageUrls,
        },
      });

      revalidatePath(Routes.ROOT);
      revalidatePath(Pages.BROWSE);
      revalidatePath(Routes.ADMIN);
      revalidatePath(Routes.LISTVEHICLES);

      return {
        status: 201,
        message: "Vehicle created successfully",
      };
    } else {
      const updateData = formData as UpdateVehicleType;

      const existingVehicle = await prisma.vehicle.findUnique({
        where: { id: updateData.id },
      });

      if (!existingVehicle) {
        return {
          status: 404,
          message: "Vehicle not found",
        };
      }

      const finalImages =
        imageUrls.length > 0 ? imageUrls : existingVehicle.images;

      const updatedVehicle = await prisma.vehicle.update({
        where: { id: updateData.id },
        data: {
          brand: updateData.brand,
          name: updateData.name,
          type: updateData.type,
          pricePerDay: updateData.pricePerDay,
          description: updateData.description,
          seats: updateData.seats,
          transmission: updateData.transmission,
          fuel: updateData.fuel,
          power: updateData.power,
          topSpeed: updateData.topSpeed,
          features: formattedFeatures,
          images: finalImages,
        },
      });

      revalidatePath(Routes.ROOT);
      revalidatePath(Pages.BROWSE);
      revalidatePath(Pages.FAVORITE);
      revalidatePath(Pages.MYBOOKINGS);
      revalidatePath(Routes.ADMIN);
      revalidatePath(Routes.LISTVEHICLES);
      revalidatePath(`${Routes.LISTVEHICLES}/${updatedVehicle.id}/edit`);

      return {
        status: 200,
        message: "Vehicle updated successfully",
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: error instanceof Error ? error.message : "Internal server error",
    };
  }
};

export const deleteVehicle = async (id: string) => {
  try {
    await prisma.vehicle.delete({
      where: { id },
    });

    revalidatePath(Routes.ROOT);
    revalidatePath(Pages.BROWSE);
    revalidatePath(Pages.FAVORITE);
    revalidatePath(Pages.MYBOOKINGS);
    revalidatePath(Routes.ADMIN);
    revalidatePath(Routes.LISTVEHICLES);

    return {
      success: true,
      message: "Vehicle deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    };
  }
};
