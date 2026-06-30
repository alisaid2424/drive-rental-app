import { z } from "zod";

export const profileFormSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters.")
    .max(50, "Full name must not exceed 50 characters."),

  email: z.string().trim().email("Please enter a valid email address."),

  bio: z
    .string()
    .min(20, "Bio must be at least 20 characters.")
    .max(500, "Bio must not exceed 500 characters."),

  phone: z.string().optional().or(z.literal("")),

  timezone: z.string(),
});

export type TProfileFormSchema = z.infer<typeof profileFormSchema>;
