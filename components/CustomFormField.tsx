"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { formFieldType } from "./forms/PatientForm";
import Image from "next/image";

interface customFormProps {
  control: Control<any>;
  fieldType: string;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: string;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({
  field,
  props,
}: {
  field: any;
  props: customFormProps;
}) => {
  const { fieldType, placeholder, iconAlt, iconSrc, name } = props;
  switch (props.fieldType) {
    case formFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400 px-1 py-0">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              height={14}
              width={14}
              className="mx-2"
            ></Image>
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            ></Input>
          </FormControl>
        </div>
      );
      break;
    case formFieldType.PHONE_INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400 px-1 py-1 w-full">
          <FormControl>
            <PhoneInput
              value={field.value}
              onChange={() => field.onChange}
              international
              countryCallingCodeEditable={false}
              defaultCountry="IN"
              className="w-full"
            />
          </FormControl>
        </div>
      );

      break;

    default:
      break;
  }
};

const CustomFormField = (props: customFormProps) => {
  const { fieldType, control, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== formFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
