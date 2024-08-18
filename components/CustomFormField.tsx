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
import { FormFieldType } from "./forms/PatientForm";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

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
  showTimeSelect?: boolean;
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
  const {
    fieldType,
    placeholder,
    iconAlt,
    iconSrc,
    name,
    showTimeSelect,
    dateFormat,
    renderSkeleton,
  } = props;
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400 py-0">
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
    case FormFieldType.TEXTAREA:
      return (
        <Textarea
          {...field}
          placeholder={placeholder}
          disabled={props.disabled}
          className="shad-textarea"
        ></Textarea>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400 w-full h-8 ps-2">
          <FormControl>
            <PhoneInput
              value={field.value}
              onChange={field.onChange}
              international
              countryCallingCodeEditable={false}
              defaultCountry="IN"
              className="w-full h-full"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400 h-8 ">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              height={16}
              width={16}
              className="mx-2"
            ></Image>
          )}
          <FormControl>
            <DatePicker
              className="pt-[2px]"
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              showDateSelect={showTimeSelect ?? false}
              dateFormat={dateFormat ?? "MM/dd/yyyy"}
              timeInputLabel="Time:"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="gap-4 flex items-center">
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <Label htmlFor={name} className="checkbox-label">
              {props.label}
            </Label>
          </div>
        </FormControl>
      );
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
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
