"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFromValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";

export enum formFieldType {
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

  const form = useForm<z.infer<typeof UserFromValidation>>({
    resolver: zodResolver(UserFromValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFromValidation>) {
    try {
      setIsLoading(true);
      const userData = { name, email, phone };
      // const user = await createUser(userData);
      // router.push(`/patients/${user.$id}/register`);
      console.log(userData);
    } catch (error) {
      console.log(error);
    }
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
          fieldType={formFieldType.INPUT}
          name={"name"}
          iconSrc="/assets/icons/user.svg"
          placeholder="John Doe"
          label="Full Name"
        />
        <CustomFormField
          control={form.control}
          fieldType={formFieldType.INPUT}
          name={"email"}
          iconSrc="/assets/icons/email.svg"
          placeholder="johndoe@gmail.com"
          label="Email"
        />
        <CustomFormField
          control={form.control}
          fieldType={formFieldType.PHONE_INPUT}
          name={"phone"}
          iconSrc="/assets/icons/phone.svg"
          placeholder="0000000000"
          label="Phone"
        />
        <SubmitButton isLoading={isLoading}> Get Started</SubmitButton>
      </form>
    </Form>
  );
}
export default PatientForm;
