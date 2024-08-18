"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { createUser } from "@/lib/actions/patients.actions";
import { UserFormValidation } from "@/lib/validation";

import "react-phone-number-input/style.css";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  PHONE_INPUT = "phoneInput",
  SELECT = "select",
  DATE_PICKER = "datePicker",
  SKELETON = "skeleton",
}

export function PatientForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    try {
      setIsLoading(true);
      const userData = { name, email, phone };
      const user = await createUser(userData);
      router.push(`/patients/${user?.$id}/register`);
      console.log(userData);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-2 flex-1"
      >
        <section className="mb-8 space-y-2">
          <h1 className="sub-header">Hi There</h1>
          <p className="text-gray-500"> Schedule your first appointment</p>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name={"name"}
          iconSrc="/assets/icons/user.svg"
          placeholder="John Doe"
          label="Full Name"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name={"email"}
          iconSrc="/assets/icons/email.svg"
          placeholder="johndoe@gmail.com"
          label="Email"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PHONE_INPUT}
          name={"phone"}
          label="Phone"
        />
        {/* <button type="submit">submit the form</button> */}
        <SubmitButton isLoading={isLoading}> Get Started </SubmitButton>
      </form>
    </Form>
  );
}
