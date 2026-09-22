import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),

  email: z.email("Please enter a valid email address"),

  serviceType: z.string().min(1, "Please select a service"),

  interestFleet: z.string().min(1, "Please select a fleet"),

  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type TContactFormSchema = z.infer<typeof contactFormSchema>;
