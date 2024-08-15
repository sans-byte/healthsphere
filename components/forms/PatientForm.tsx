"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "../ui/form";
import { toast } from "@/components/ui/use-toast";
import CustomFormField from "../CustomFormField";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

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
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
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

        <Button type="submit" className="bg-dark-400">Submit</Button>
      </form>
    </Form>
  );
}
export default PatientForm;
