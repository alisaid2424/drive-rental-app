"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Send, LoaderCircle } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/inputs/InputWithLabel";
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel";
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel";
import {
  contactFormSchema,
  TContactFormSchema,
} from "@/zod-schemas/contact/contactForm";
import { fleets, services } from "./dataContact";

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<TContactFormSchema>({
    resolver: zodResolver(contactFormSchema),

    defaultValues: {
      fullName: "",
      email: "",
      serviceType: "",
      interestFleet: "",
      message: "",
    },
  });

  const onSubmit = (data: TContactFormSchema) => {
    startTransition(async () => {
      console.log(data);

      // API Request
      // await sendContactMessage(data);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputWithLabel<TContactFormSchema>
            fieldTitle="Full Name"
            nameInSchema="fullName"
            placeholder="Johnathan Doe"
            className="mt-2"
          />

          <InputWithLabel<TContactFormSchema>
            fieldTitle="Email Address"
            nameInSchema="email"
            type="email"
            placeholder="john@example.com"
            autoComplete="off"
            className="mt-2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectWithLabel<TContactFormSchema>
            fieldTitle="Service Type"
            nameInSchema="serviceType"
            data={services}
            className="w-full mt-2"
          />

          <SelectWithLabel<TContactFormSchema>
            fieldTitle="Interest Fleet"
            nameInSchema="interestFleet"
            data={fleets}
            className="w-full mt-2"
          />
        </div>

        <TextAreaWithLabel<TContactFormSchema>
          fieldTitle="Your Message"
          nameInSchema="message"
          placeholder="Tell us about your requirements..."
          rows={5}
          className="mt-2 "
        />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? (
            <>
              <LoaderCircle className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Request
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
